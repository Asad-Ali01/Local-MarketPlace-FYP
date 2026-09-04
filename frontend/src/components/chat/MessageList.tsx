import { useGetAllMessagesByConversationIdQuery } from "@/features/chat/chatApi";

import MessageBubble from "./MessageBubble";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import type { IMessage } from "@/types/chat.types";
import {
  sendWebSocketMessage,
  subscribeToWebSocket,
} from "@/services/websocket/websocket";
import { useAppDispatch } from "@/hooks/useAppDispatchSelector";
import { setOnlineUsers, userOffline, userOnline } from "@/features/chat/chatSlice";

interface MessageListProps {
  conversationId?: string;

  receiverName?: string;
}

function MessageList({ conversationId, receiverName }: MessageListProps) {
  const dispatch = useAppDispatch();
  const { data } = useGetAllMessagesByConversationIdQuery(conversationId!, {
    skip: !conversationId,
  });
  const [visibilityState, setVisibilityState] = useState(
    document.visibilityState === "visible",
  );
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

  useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "instant",
    });
  }, [messages]);

  useEffect(() => {
    const unsubscribe = subscribeToWebSocket((incoming) => {
      console.log("Incoming : ",incoming);
      switch (incoming.type) {
        // case "USER_ONLINE":
        //   const onlineUserId = incoming.payload.userId;
        //   dispatch(userOnline(onlineUserId))
        //   break;
      
        // case "USER_OFFLINE":
        //   const offlineUserId = incoming.payload.userId;
        //   dispatch(userOffline(offlineUserId));
        //   break;
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
          if(!conversationId){
            return;
          }
          if (messageConversationId !== conversationId) {
            return;
          }
          if (visibilityState) {
            sendWebSocketMessage({
              type: "MARK_MESSAGES_READ",
              payload: {
                conversationId,
              },
            });
          }

          setMessages((previousMessages) => [...previousMessages, newMessage]);
          break;
      }
    });

    return unsubscribe;
  }, [conversationId, visibilityState]);
  useEffect(() => {
    if (!conversationId) {
      return;
    }
    sendWebSocketMessage({
      type: "MARK_MESSAGES_READ",
      payload: {
        conversationId,
      },
    });
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
