import { IncomingMessage, Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { verifyAccessToken } from "../utils/verifyAccessToken";
import {
  AuthenticatedWebSocket,
  ClientMessage,
} from "../types/websocket.types";
import { Conversation } from "../models/conversation.model";
import { Message } from "../models/message.model";
import { addUser, getUserSockets, notifyUserPresence, removeUser, sendInitialPresence } from "./websocket.manager";
const WS_CLOSE_CODES = {
  UNAUTHORIZED: 1008,
  TOKEN_EXPIRED: 4001,
} as const;
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
      if (!token) {
        console.log("No token. Closing connection.");
        socket.close(WS_CLOSE_CODES.UNAUTHORIZED, "Unauthorized");
        return;
      }

      const user = await verifyAccessToken(token);
      const authenticatedSocket = socket as AuthenticatedWebSocket;
      authenticatedSocket.user = user;
      const becameOnline = addUser(user._id.toString(), authenticatedSocket);
      // Send already connected userIds to user that is connected right now.
      await sendInitialPresence(user._id.toString(),authenticatedSocket);
      // Sending online status to frontend
      if (becameOnline) {
       notifyUserPresence(user._id.toString(),"USER_ONLINE")
      }
      console.log("WebSocket authenticated: ", user._id.toString());
      console.log("Websocket client successfully");

      authenticatedSocket.on("message", async (data) => {
        const message: ClientMessage = JSON.parse(data.toString());
        const { conversationId } = message.payload;
        const senderId = authenticatedSocket.user._id;
        const conversation = await Conversation.findOne({
          _id: conversationId,
          "members.user": senderId,
        });

        if (!conversation) {
          console.log("Conversation not found or user is not a member");
          return;
        }
        const receiverMember = conversation.members.find(
          (member) => member.user.toString() !== senderId.toString(),
        );
        const receiverId = receiverMember?.user;
        if (!receiverId) {
          return;
        }
        const receiverSockets = getUserSockets(receiverId.toString());
      //  notifyUserPresence(user._id.toString(),"USER_ONLINE")

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

      authenticatedSocket.on("close", async (code,reason) => {
        console.log("Websocket client disconnected");
        console.log("Reason: ",reason.toString());
        console.log("Code: ",code);
        const becomeOffline = removeUser(
          user._id.toString(),
          authenticatedSocket,
        );
        if (becomeOffline) {
       notifyUserPresence(user._id.toString(),"USER_OFFLINE")

        }
      });
    } catch (error) {
      console.log("WebSocket authentication failed",error);
      socket.close(1008, "Unauthorized");
    }
  });
  return wss;
};
