import ChatHeader from '@/components/chat/ChatHeader';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatSkeleton from '@/components/chat/ChatSkelton';
import GigInfo from '@/components/chat/GigInfo';
import MessageInput from '@/components/chat/MessageInput';
import MessageList from '@/components/chat/MessageList';
import {
  chatApi,
  useGetAllConversationApiQuery,
  useGetConversationContextQuery,
} from '@/features/chat/chatApi';
import {
  clearPendingNewConversation,
  setPendingNewConversation,
} from '@/features/chat/chatSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatchSelector';
import { subscribeToWebSocket } from '@/services/websocket/websocket';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import {  useLocation, useNavigate, useParams, useSearchParams } from 'react-router';

function ChatPage() {
  const { conversationId } = useParams<{
    conversationId?: string;
  }>();
  const [isMobile,setIsMobile] = useState(window.matchMedia("(max-width:768px)").matches);
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const providerId = searchParams.get('providerId');
  const gigId = searchParams.get('gigId');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllConversationApiQuery();
  const { data: contextConversation } = useGetConversationContextQuery(
    providerId && gigId ? { providerId, gigId } : skipToken,
  );
  const currentUser = useAppSelector((state) => state.auth.user);
  const pendingNewConversation = useAppSelector(
    (state) => state.chat.pendingNewConversation,
  );


  const hasNewConversation =
    !!contextConversation?.data.provider && !!contextConversation?.data?.gig && !conversationId;

  useEffect(() => {
    if (hasNewConversation && contextConversation?.data.provider && contextConversation.data.gig) {
      dispatch(
        setPendingNewConversation({
          type: 'newConversation',
          provider: contextConversation.data.provider,
          gig: contextConversation.data.gig,
        }),
      );
    }
  }, [dispatch, hasNewConversation, contextConversation]);

   useEffect(() => {
    const handleChange = (e:MediaQueryListEvent) => {
      setIsMobile(e.matches);
    }
  const mediaQuery = window.matchMedia("(max-width:768px)")
   mediaQuery.addEventListener("change",handleChange);

   return () => {
    mediaQuery.removeEventListener("change",handleChange);
   }
  },[])
  useEffect(() => {
    const unsubscribe = subscribeToWebSocket((incoming) => {
      if (incoming.type === 'NEW_CONVERSATION') {
        const { newCreatedConversation } = incoming.payload;

        dispatch(clearPendingNewConversation());

        dispatch(
          chatApi.util.updateQueryData('getAllConversationApi', undefined, (draft) => {
            const exists = draft.data.some(
              (conversation) => conversation._id === newCreatedConversation._id,
            );

            if (!exists) {
              draft.data.unshift(newCreatedConversation);
            }
          }),
        );

        navigate(`/client/messages/${newCreatedConversation._id}`, { replace: true });
      }
    });

    return unsubscribe;
  }, [dispatch, navigate]);

  
  const conversations = data?.data ?? [];

  
  const selectedConversation = conversations.find(
    (conversation) => conversation._id === conversationId,
  );
  const receiverName = selectedConversation?.members.find(
    (member) => member.user._id !== currentUser?._id,
  )?.user.name;
  if (isLoading) {
    return <ChatSkeleton />;
  }

  return (
    <div className="h-[calc(100vh-64px)] bg-gray-50">
      <div className="mx-auto flex h-full max-w-7xl overflow-hidden border bg-white">
        {/* Conversation list */}
      
          <ChatSidebar
            isLoading={isLoading}
            conversations={conversations}
            conversationId={conversationId}
            newConversation={pendingNewConversation}
            isMobile={isMobile}
            // onNewConversationCreated={onNewConversationCreated}
          />
       

        <main className={` flex min-w-0 flex-1 flex-col`}>
          {(conversationId && selectedConversation) || hasNewConversation ? (
            <>
            
              <ChatHeader
                conversation={selectedConversation}
                newConversation={hasNewConversation ?  contextConversation?.data : undefined}
                currentUserId={currentUser?._id}
                isMobile={isMobile}
              />

              {currentUser?.role === 'client' && (
                <GigInfo
                  gig={selectedConversation?.gig}
                  newConversationGig={contextConversation?.data?.gig}
                />
              )}

              <MessageList conversationId={conversationId} receiverName={receiverName} />

              <MessageInput conversationId={conversationId} />
            </>
          ) : (
            /* No conversation selected */
            <div className={`${(isMobile && !conversationId) && "hidden" } flex flex-1 items-center justify-center`}>
              <p className="text-gray-500">Select a conversation to start chatting</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
{
  /* IF current role is client then it means he is talkig to provider so GigInfo should be shown */
}
export default ChatPage;
