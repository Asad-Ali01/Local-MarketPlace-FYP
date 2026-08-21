import { IncomingMessage, Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { verifyAccessToken } from "../utils/verifyAccessToken";
import {
  AuthenticatedWebSocket,
  ClientMessage,
} from "../types/websocket.types";
import { Conversation } from "../models/conversation.model";
import { Message } from "../models/message.model";
import { addUser, getUserSockets, removeUser } from "./websocket.manager";

const getAccessTokenFromCookie = (request: IncomingMessage) => {
  const cookieHeader = request.headers.cookie;
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";");

  const accessTokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("accessToken="),
  );

  if (!accessTokenCookie) {
    return null;
  }

  return accessTokenCookie.split("=")[1];
};

export const initializeWebSocket = (server: Server) => {
  const wss = new WebSocketServer({
    server,
  });

  wss.on("connection", async (socket, request) => {
    console.log("=================================");
    console.log("CLIENT CONNECTED TO WEBSOCKET");
    console.log("=================================");
    try {
      const token = getAccessTokenFromCookie(request);
      console.log("Here is token: ", token);
      if (!token) {
        console.log("No token. Closing connection.");
        socket.close(1008, "Unauthorized");
        return;
      }

      const user = await verifyAccessToken(token);
      const authenticatedSocket = socket as AuthenticatedWebSocket;
      authenticatedSocket.user = user;
      addUser(user._id.toString(), authenticatedSocket);
      console.log("WebSocket authenticated: ", user._id.toString());
      console.log("Websocket client successfully");

      authenticatedSocket.on("message", async (data) => {
        const message: ClientMessage = JSON.parse(data.toString());
        const { conversationId } = message.payload;
        const senderId = authenticatedSocket.user._id;
        const conversation = await Conversation.findOne({
          _id: conversationId,
          members: senderId,
        });

        if (!conversation) {
          console.log("Conversation not found or user is not a member");
          return;
        }
        const receiverId = conversation.members.find(
          (member) => member.toString() !== senderId.toString(),
        );
        if (!receiverId) {
          return;
        }
        const receiverSockets = getUserSockets(receiverId.toString());

        switch (message.type) {
          case "TYPING":
            // if (receiverSocket &&  receiverSocket.readyState == WebSocket.OPEN) {
            receiverSockets?.forEach((receiverSocket) => {
              if (
                receiverSocket &&
                receiverSocket.readyState === WebSocket.OPEN
              ) {
                receiverSocket.send(
                  JSON.stringify({
                    type: "USER_TYPING",
                    payload: {
                      conversationId,
                    },
                  }),
                );
              }
            });
            // }
            break;
          // Stop TYping
          case "STOP_TYPING":
            receiverSockets?.forEach((receiverSocket) => {
              if (
                receiverSocket &&
                receiverSocket.readyState === WebSocket.OPEN
              ) {
                if (
                  receiverSocket &&
                  receiverSocket.readyState == WebSocket.OPEN
                ) {
                  receiverSocket.send(
                    JSON.stringify({
                      type: "USER_STOP_TYPING",
                      payload: {
                        conversationId,
                      },
                    }),
                  );
                }
              }
            });
            break;
          // Mark read messages
          case "MARK_MESSAGES_READ":
            // update isRead to true if current user read the messages
            console.log("MEssage read");
            const updatedRead = await Message.updateMany(
              {
                conversation: conversationId,
                receiver: senderId,
                isRead: false,
              },
              {
                $set: {
                  isRead: true,
                },
              },
            );
            if (updatedRead.modifiedCount > 0) {
              receiverSockets?.forEach((receiverSocket) => {
                if (
                  receiverSocket &&
                  receiverSocket.readyState === WebSocket.OPEN
                ) {
                  receiverSocket.send(
                    JSON.stringify({
                      type: "MESSAGES_READ",
                      payload: {
                        conversationId,
                      },
                    }),
                  );
                }
              });
            }
            break;
          // Send message
          case "SEND_MESSAGE":
            const { text } = message.payload;

            if (!conversationId || !text?.trim()) {
              return;
            }

            if (!conversation) {
              console.log("Conversation not found or user is not a member");
              return;
            }
            conversation.lastMessage = text;
            await conversation.save();

            const savedMessage = await Message.create({
              conversation: conversationId,
              sender: senderId,
              receiver: receiverId,
              content: text.trim(),
            });

            await savedMessage.populate("sender", "avatar name");
            receiverSockets?.forEach((receiverSocket) => {
              if (
                receiverSocket &&
                receiverSocket.readyState === WebSocket.OPEN
              ) {
                if (
                  receiverSocket &&
                  receiverSocket.readyState === WebSocket.OPEN
                ) {
                  receiverSocket.send(
                    JSON.stringify({
                      type: "NEW_MESSAGE",
                      payload: savedMessage,
                    }),
                  );
                }
              }
            });

            if (authenticatedSocket.readyState === WebSocket.OPEN) {
              authenticatedSocket.send(
                JSON.stringify({
                  type: "NEW_MESSAGE",
                  payload: savedMessage,
                }),
              );
            }
            break;
        }
      });

      authenticatedSocket.on("close", () => {
        
        console.log("Websocket client disconnected");
        removeUser(user._id.toString(),authenticatedSocket);
      });
    } catch (error) {
      console.log("WebSocket authentication failed");
      socket.close(1008, "Unauthorized");
    }
  });
  return wss;
};
