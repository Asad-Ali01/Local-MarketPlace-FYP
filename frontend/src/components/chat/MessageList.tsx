import {
  chatApi,
  useGetAllMessagesByConversationIdQuery,
  useGetMessagesByConversationInfiniteQuery,
} from '@/features/chat/chatApi';

import MessageBubble from './MessageBubble';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import type { IMessage } from '@/types/chat.types';
import { sendWebSocketMessage, subscribeToWebSocket } from '@/services/websocket/websocket';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatchSelector';
import { clearUnreadCount } from '@/features/chat/chatSlice';
import { current } from '@reduxjs/toolkit';
import { Spin } from 'antd';
import { Loader, Loader2 } from 'lucide-react';

interface MessageListProps {
  conversationId?: string;

  receiverName?: string;
}

function MessageList({ conversationId, receiverName }: MessageListProps) {
  const dispatch = useAppDispatch();
  // const { data } = useGetAllMessagesByConversationIdQuery(conversationId!, {
  //   skip: !conversationId,
  // });
  const { currentData, fetchNextPage, isFetchingNextPage, isLoading, hasNextPage } =
    useGetMessagesByConversationInfiniteQuery(
      {
        conversationId: conversationId!,
        limit: 50,
      },
      {
        skip: !conversationId,
      },
    );

  const [isActive, setIsActive] = useState(
    () => document.visibilityState === 'visible' && document.hasFocus(),
  );
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isOnTop = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const pendingScrollRef = useRef<{
    scrollHeight: number;
    scrollTop: number;
    pageCount: number;
  } | null>(null);
  const initiallyScrolledRef = useRef<string | null>(null);
  const [lastMessageByMe,setlastMessageByMe] = useState(false);
  const currentUser = useAppSelector((state) => state.auth.user);
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

  useEffect(() => {
    const unsubscribe = subscribeToWebSocket((incoming) => {
      switch (incoming.type) {
        case 'USER_TYPING':
          if (incoming.payload.conversationId !== conversationId) {
            return;
          }

          setIsTyping(true);

          if (typingTimer.current) {
            clearTimeout(typingTimer.current);
          }

          typingTimer.current = setTimeout(() => {
            setIsTyping(false);
            typingTimer.current = null;
          }, 3000);
          break;
        case 'USER_STOP_TYPING':
          if (incoming.payload.conversationId !== conversationId) {
            return;
          }

          setIsTyping(false);
          if (typingTimer.current) {
            clearTimeout(typingTimer.current);
            typingTimer.current = null;
          }
          break;
        case 'MESSAGES_READ':
          if (incoming.payload.conversationId !== conversationId) {
            return;
          }

          dispatch(
            chatApi.util.updateQueryData(
              'getAllMessagesByConversationId',
              conversationId!,
              (draft) => {
                draft.data = draft.data.map((message) => ({
                  ...message,
                  isRead: true,
                }));
              },
            ),
          );
          break;
        case 'ERROR':
          const errorMessage = incoming.payload.message;
          console.error(errorMessage);
          break;
        case 'NEW_MESSAGE':
          const newMessage:IMessage = incoming.payload;

          const messageConversationId = newMessage.conversation;
          if (!conversationId) {
            return;
          }
          if (messageConversationId !== conversationId) {
            return;
          }
          if(newMessage.sender._id === currentUser?._id)
          {
            setlastMessageByMe(true);
          }
          console.log("New message: ",newMessage)
          dispatch(
            chatApi.util.updateQueryData(
              'getMessagesByConversation',
              {
                conversationId: messageConversationId,
                limit: 50,
              },
              (draft) => {
                const lastIndex = draft.pages.length - 1;
                if (lastIndex >= 0) {
                  draft.pages[lastIndex].data.messages.push(newMessage);
                  
                } 
              },
            ),
          );
          break;
      }
    });

    return () => {
      unsubscribe();
      if (typingTimer.current) {
        clearTimeout(typingTimer.current);
        typingTimer.current = null;
      }
    };
  }, [conversationId, dispatch]);
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
  }, [conversationId, isActive]);
  useEffect(() => {
    const topElement = isOnTop.current;
    const container = scrollContainerRef.current;
    if (!container) return;
    if (!topElement) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          pendingScrollRef.current = {
            scrollHeight: container.scrollHeight,
            scrollTop: container.scrollTop,
            pageCount: currentData?.pages.length ?? 0,
          };
          fetchNextPage();
        }
      },
      {
        root: container,
        threshold: 0,
      },
    );
    observer.observe(topElement);

    return () => {
      observer.disconnect();
    };
  }, [currentData?.pages.length, hasNextPage, isFetchingNextPage, fetchNextPage]);
  useLayoutEffect(() => {
    const pageCount = currentData?.pages.length ?? 0;
    const pending = pendingScrollRef.current;
    const container = scrollContainerRef.current;
    //if page == 0 tehn tahts mean api is laoding dat aso prevent the scrolling
    if (!conversationId || !container || pageCount === 0) {
      return;
    }

    if (pending && pageCount > pending.pageCount) {
      const heightDiffernce = container.scrollHeight - pending.scrollHeight;
      container.scrollTop = pending.scrollTop + heightDiffernce;
      pendingScrollRef.current = null;
      return;
    }
    if (initiallyScrolledRef.current != conversationId) {
      container.scrollTop = container.scrollHeight;
      initiallyScrolledRef.current = conversationId;
    }
  }, [currentData, conversationId]);

  const messages = currentData?.pages
    .slice()
    .reverse()
    .flatMap((page) => page.data.messages);
  console.log('Messages: ', messages);
  useLayoutEffect(() => {


    if (lastMessageByMe) {
      bottomRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [messages?.length, conversationId]);

  return (
    <div className="flex-1  space-y-4 overflow-y-auto p-4 md:p-6" ref={scrollContainerRef}>
      <div className="flex justify-center" ref={isOnTop}>
        {isFetchingNextPage && <Loader2 className="size-5 animate-spin mt-1" />}
      </div>
      {messages?.map((message) => (
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
            message={message}
          />
        </div>
 
      ))}

      {isTyping && <div className="text-sm text-gray-500">{receiverName} is typing...</div>}
      <div ref={bottomRef} />
    </div>
  );
}

export default MessageList;
