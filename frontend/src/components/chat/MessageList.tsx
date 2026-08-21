import { useGetAllMessagesByConversationIdQuery } from "@/features/chat/chatApi";

import MessageBubble from "./MessageBubble";

import { useEffect, useRef, useState } from "react";

import type { IMessage } from "@/types/chat.types";
import { subscribeToWebSocket } from "@/services/websocket/websocket";

interface MessageListProps {
  conversationId?: string;
  socketRef: {
    current: WebSocket | null;
  };
  receiverName?: string;
}

function MessageList({
  conversationId,
  socketRef,
  receiverName,
}: MessageListProps) {
  const { data } = useGetAllMessagesByConversationIdQuery(conversationId!, {
    skip: !conversationId,
  });
  const [visibilityState, setVisibilityState] = useState(
    document.visibilityState === "visible",
  );
  console.log("DOcumenet visble: ", visibilityState);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  // -----------------------------
  // Initial messages from HTTP
  // -----------------------------
  useEffect(() => {
    const handleVisibilityChange = () => {
      setVisibilityState(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      console.log("state: ", visibilityState);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  useEffect(() => {
    if (data?.data) {
      setMessages(data.data);
    }
  }, [data]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  console.log("ConversationID: ", conversationId);
  useEffect(() => {
   
    console.log("Use");
    const socket = socketRef.current;
    if (!socket) {
      return;
    }
    const unsubscribe = subscribeToWebSocket((incoming) => {
      switch (incoming.type) {
        case "USER_TYPING":
          setIsTyping(true);
          break;
        case "USER_STOP_TYPING":
          setIsTyping(false);
          break;
        case "MESSAGES_READ":
          if (incoming.payload.conversationId !== conversationId) {
            return;
          }
          setMessages((previousMessages) =>
            previousMessages.map((message) => ({
              ...message,
              isRead: true,
            })),
          );
          break;
        case "NEW_MESSAGE":
          const newMessage = incoming.payload;

          const messageConversationId = newMessage.conversation;

          if (messageConversationId !== conversationId) {
            return;
          }
          if (visibilityState && socket.readyState === WebSocket.OPEN) {
            console.log("It run");
            socket.send(
              JSON.stringify({
                type: "MARK_MESSAGES_READ",
                payload: {
                  conversationId,
                },
              }),
            );
          }

          setMessages((previousMessages) => [...previousMessages, newMessage]);
          break;
      }
    });
    return unsubscribe;
   
  }, [conversationId, visibilityState]);

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4 md:p-6">
      {messages.map((message) => (
        <div key={message._id}>
          <MessageBubble
            senderId={message.sender._id}
            type={message.isRead ? "received" : "sent"}
            content={message.content}
            time={new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            avatarUrl={message.sender?.avatar?.url}
            senderName={message.sender.name}
          />
        </div>
      ))}

      {isTyping && (
        <div className="text-sm text-gray-500">{receiverName} is typing...</div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}

export default MessageList;
