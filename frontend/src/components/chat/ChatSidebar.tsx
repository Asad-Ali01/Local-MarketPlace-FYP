import { useGetAllConversationApiQuery } from "@/features/chat/chatApi";
import ConversationItem from "./ConversationItem";
import { useAppSelector } from "@/hooks/useAppDispatchSelector";
import { useNavigate } from "react-router";
import { useEffect } from "react";

interface ChatSidebarProps {
  conversationId?: string;
  socketRef:{
    current:WebSocket | null
  }
}

function ChatSidebar({ conversationId,socketRef }: ChatSidebarProps) {
  const { data, isLoading } = useGetAllConversationApiQuery();

  const conversations = data?.data ?? [];
  const currentUserId = useAppSelector((state) => state.auth.user?._id);
  const currentUserRole = useAppSelector((state) => state.auth.user?.role);
  const navigate = useNavigate();
  useEffect(() => {
    if(!conversationId) return;
    const socket = socketRef.current;
    if(!socket) return;

    socket.send(
      JSON.stringify({
        type:"MARK_MESSAGES_READ",
        payload:{
          conversationId
        }
      })
    )
  },[conversationId,socketRef])
  const handleConversationClick = (conversationId: string) => {
    if (currentUserRole === "client") {
      navigate(`/client/messages/${conversationId}`);
    } else if (currentUserRole === "provider") {
      navigate(`/provider/messages/${conversationId}`);
    }
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

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
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
