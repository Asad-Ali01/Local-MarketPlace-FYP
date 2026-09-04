import { useGetAllConversationApiQuery } from "@/features/chat/chatApi";
import ConversationItem from "./ConversationItem";
import { useAppSelector } from "@/hooks/useAppDispatchSelector";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { sendWebSocketMessage, subscribeToWebSocket } from "@/services/websocket/websocket";
import type { IConversation, IMessage } from "@/types/chat.types";
import NewConversationItem from "./NewConversationItem";

interface ChatSidebarProps {
  conversationId?: string;
 conversations:IConversation[];
 isLoading:boolean
 newConversation?:any
}

function ChatSidebar({ conversationId,conversations,isLoading,newConversation }: ChatSidebarProps) {
  // const { data, isLoading } = useGetAllConversationApiQuery();

  // const conversations = data?.data ?? [];
  const [allConversations,setAllConversations] = useState(conversations);
  const currentUserId = useAppSelector((state) => state.auth.user?._id);
  const currentUserRole = useAppSelector((state) => state.auth.user?.role);
  const navigate = useNavigate();
  console.log("Chat sidebar renders: ",allConversations);
  useEffect(() => {
    const unsubscribe = subscribeToWebSocket((incoming) => {
      if(incoming.type === "NEW_MESSAGE"){
        const savedMessage:IMessage = incoming.payload
          setAllConversations((prev) => prev.map((conversation) => (
            conversation._id === savedMessage.conversation ? {...conversation,lastMessage:savedMessage.content,lastMessageAt:savedMessage.createdAt} : conversation
          )))
      }
    })
    return unsubscribe;
  },[])
  const handleConversationClick = (conversationId: string) => {
    if (currentUserRole === "client") {
      // Changing url to new converstaion in client side we still naviaget to client/messages because client has differnt sidebar and provider has differnt
      navigate(`/client/messages/${conversationId}`);
    } else if (currentUserRole === "provider") {
      navigate(`/provider/messages/${conversationId}`);
    }
    
  };
  const handleNewConversationClick = () => {
  navigate(
    `/client/messages/new?providerId=${newConversation.provider._id}&gigId=${newConversation.gig._id}`
  );
};
  if (isLoading) {
    return (
      <aside className="hidden w-80 shrink-0 border-r md:flex md:flex-col">
        <div className="p-6">Loading conversations...</div>
      </aside>
    );
  }

  return (
    <aside className="hidden w-80 shrink-0 border-r md:flex md:flex-col">
      <div className="border-b p-5">
        <h1 className="text-xl font-semibold">Messages</h1>
      </div>

      <div className="flex-1 overflow-y-auto" >
        {
          newConversation && 
          <div
            key={newConversation.gig._id}
onClick={handleNewConversationClick}
          >
            <NewConversationItem
    provider={newConversation.provider}
    gig={newConversation.gig}
    isSelected={!conversationId}
  />
          </div>
        }
        {allConversations.map((conversation) => (
          <div
            key={conversation._id}
            onClick={() => handleConversationClick(conversation._id)}
          >
            <ConversationItem
              key={conversation._id}
              conversation={conversation}
              isSelected={conversation._id === conversationId}
              currentUserId={currentUserId}
            />
          </div>
        ))}
      </div>
    </aside>
  );
}

export default ChatSidebar;
