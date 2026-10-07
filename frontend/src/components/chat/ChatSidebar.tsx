import { chatApi } from '@/features/chat/chatApi';
import ConversationItem from './ConversationItem';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatchSelector';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import {  subscribeToWebSocket } from '@/services/websocket/websocket';
import type {
  IConversation,
  IMessage,
  INewConversationContext,
} from '@/types/chat.types';
import NewConversationItem from './NewConversationItem';
import { clearUnreadCount } from '@/features/chat/chatSlice';

interface ChatSidebarProps {
  conversationId?: string;
  conversations: IConversation[];
  isLoading: boolean;
  newConversation?: INewConversationContext;
  isMobile?:boolean;
}

function ChatSidebar({
  conversationId,
  conversations,
  isLoading,
  newConversation,
  isMobile
}: ChatSidebarProps) {
  // const { data, isLoading } = useGetAllConversationApiQuery();
  const unreadCountsFromReduxState = useAppSelector((state) => state.chat.unreadCounts);
  // const conversations = data?.data ?? [];
  // const [allConversations, setAllConversations] = useState(conversations);
  const currentUserId = useAppSelector((state) => state.auth.user?._id);
  const currentUserRole = useAppSelector((state) => state.auth.user?.role);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
 
  useEffect(() => {
    const unsubscribe = subscribeToWebSocket((incoming) => {
      if (incoming.type === 'NEW_MESSAGE') {
        const savedMessage: IMessage = incoming.payload;
        dispatch(chatApi.util.updateQueryData(
          'getAllConversationApi',
          undefined,
          (draft) => {
            const index = draft.data.findIndex((conversation) => conversation._id === savedMessage.conversation);
            if(index === -1){
              return;
            }
            const conversation = draft.data[index];
            conversation.lastMessage = savedMessage.content;
            conversation.lastMessageAt = savedMessage.createdAt;
            // Delete that converstaion and then push agin in top
            const [updatedConversation] = draft.data.splice(index,1);
            draft.data.unshift(updatedConversation);
          }
        ))
       
      }
    
    });
    return unsubscribe;
  }, [navigate]);
  const handleConversationClick = (conversationId: string) => {
    dispatch(clearUnreadCount(conversationId));
    if (currentUserRole === 'client') {
      // Changing url to new converstaion in client side we still naviaget to client/messages because client has differnt sidebar and provider has differnt
      navigate(`/client/messages/${conversationId}`);
    } else if (currentUserRole === 'provider') {
      navigate(`/provider/messages/${conversationId}`);
    }
  };
  const handleNewConversationClick = () => {
    if (!newConversation) {
      return;
    }

    navigate(
      `/client/messages/new?providerId=${newConversation.provider._id}&gigId=${newConversation.gig._id}`,
    );
  };
  if (isLoading) {
    return (
      <aside className="hidden w-80 shrink-0 border-r md:flex md:flex-col">
        <div className="p-6">Loading conversations...</div>
      </aside>
    );
  }
    console.log("ISMOBIEL: ",isMobile," conversationId: ",conversationId);
  return (
    <aside className={`${conversationId && "hidden"} ${(isMobile && !conversationId) ?  "w-full" : "w-80"}  shrink-0 border-r md:flex md:flex-col`}>
      <div className="border-b p-5">
        <h1 className="text-xl font-semibold">Messages</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {newConversation && (
          <div key={newConversation?.gig?._id} onClick={handleNewConversationClick}>
            <NewConversationItem
              provider={newConversation.provider}
              gig={newConversation.gig}
              isSelected={!conversationId}
            />
          </div>
        )}
        {conversations.map((conversation) => (
          <div key={conversation._id} onClick={() => handleConversationClick(conversation._id)}>
            <ConversationItem
              key={conversation._id}
              conversation={conversation}
              isSelected={conversation._id === conversationId}
              currentUserId={currentUserId}
              unreadCounts={unreadCountsFromReduxState}
            />
          </div>
        ))}
      </div>
    </aside>
  );
}

export default ChatSidebar;
