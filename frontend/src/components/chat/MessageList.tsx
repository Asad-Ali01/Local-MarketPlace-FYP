import { chatApi, useGetAllMessagesByConversationIdQuery } from '@/features/chat/chatApi';

import MessageBubble from './MessageBubble';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import type { IMessage } from '@/types/chat.types';
import { sendWebSocketMessage, subscribeToWebSocket } from '@/services/websocket/websocket';
import { useAppDispatch } from '@/hooks/useAppDispatchSelector';
import {
  clearUnreadCount,
} from '@/features/chat/chatSlice';

interface MessageListProps {
  conversationId?: string;

  receiverName?: string;
}

function MessageList({ conversationId, receiverName }: MessageListProps) {
  const dispatch = useAppDispatch();
  const { data } = useGetAllMessagesByConversationIdQuery(conversationId!, {
    skip: !conversationId,
  });
  const [isActive, setIsActive] = useState(
    () => document.visibilityState === 'visible' && document.hasFocus(),
  );
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  // -----------------------------
  // Initial messages from HTTP
  // -----------------------------
  useEffect(() => {
    const handleActiveState = () => {
      const isActive = document.visibilityState === 'visible' && document.hasFocus();
      setIsActive(isActive);
  
    };
    document.addEventListener('visibilitychange', handleActiveState);
    window.addEventListener('focus', handleActiveState);
    window.addEventListener('blur', handleActiveState);
    return () => {
      document.removeEventListener('visibilitychange', handleActiveState);
      window.removeEventListener('focus', handleActiveState);
      window.removeEventListener('blur', handleActiveState);
    };
  }, [conversationId]);


  useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'instant',
    });
  }, [data]);

  useEffect(() => {
    const unsubscribe = subscribeToWebSocket((incoming) => {
      switch (incoming.type) {
        case 'USER_TYPING':
          setIsTyping(true);
          break;
        case 'USER_STOP_TYPING':
          setIsTyping(false);
          break;
        case 'MESSAGES_READ':
          if (incoming.payload.conversationId !== conversationId) {
            return;
          }
         
          dispatch(chatApi.util.updateQueryData(
            "getAllMessagesByConversationId",
            conversationId!,
            (draft) => {
             draft.data = draft.data.map((message) => ({
              ...message,
              isRead:true
             }) )
            }
          ))
          break;
        case 'NEW_MESSAGE':
          const newMessage = incoming.payload;

          const messageConversationId = newMessage.conversation;
          if (!conversationId) {
            return;
          }
          if (messageConversationId !== conversationId) {
            return;
          }
         
          dispatch(chatApi.util.updateQueryData(
            "getAllMessagesByConversationId",
            messageConversationId,
            (draft) => {
              draft.data.push(newMessage)
            }
          ))
          break;
      }
    });

    return unsubscribe;
  }, [conversationId,dispatch]);
  useEffect(() => {
    if (!conversationId || !isActive) {
      return;
    }
    sendWebSocketMessage({
      type: 'MARK_MESSAGES_READ',
      payload: {
        conversationId,
      },
    });
      dispatch(clearUnreadCount(conversationId));
  }, [conversationId,isActive  ]);


  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4 md:p-6">
      {data?.data?.map((message) => (
        <div key={message._id}>
          <MessageBubble
            senderId={message.sender._id}
            type={message.isRead ? 'received' : 'sent'}
            content={message.content}
            time={new Date(message.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            avatarUrl={message.sender?.avatar?.url}
            senderName={message.sender.name}
          />
        </div>
      ))}

      {isTyping && <div className="text-sm text-gray-500">{receiverName} is typing...</div>}
      <div ref={bottomRef} />
    </div>
  );
}

export default MessageList;
