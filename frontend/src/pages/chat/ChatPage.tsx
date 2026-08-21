import ChatHeader from "@/components/chat/ChatHeader";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatSkeleton from "@/components/chat/ChatSkelton";
import GigInfo from "@/components/chat/GigInfo";
import MessageInput from "@/components/chat/MessageInput";
import MessageList from "@/components/chat/MessageList";
import { useGetAllConversationApiQuery } from "@/features/chat/chatApi";
import { useAppSelector } from "@/hooks/useAppDispatchSelector";
import { connectWebSocket } from "@/services/websocket/websocket";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";

function ChatPage() {
  const { conversationId } = useParams<{
    conversationId?: string;
  }>();

   const socketRef =  useRef<WebSocket | null>(null);
  
  useEffect(() => {
    const socket = connectWebSocket();

    socketRef.current = socket;

    return () => {
        socket.close();
        socketRef.current = null
    }
  },[])


  const { data, isLoading } =
    useGetAllConversationApiQuery();

  const conversations = data?.data ?? [];

  const currentUser = useAppSelector(
    (state) => state.auth.user
  );
  const selectedConversation = conversations.find(
    (conversation) =>
      conversation._id === conversationId
  );
  const receiverName = selectedConversation?.members.find(user => user._id !== currentUser?._id)?.name;
  if (isLoading) {
    return <ChatSkeleton />;
  }

  return (
    <div className="h-[calc(100vh-64px)] bg-gray-50">
      <div className="mx-auto flex h-full max-w-7xl overflow-hidden border bg-white">

        {/* Conversation list */}
        <ChatSidebar
          conversationId={conversationId}
          socketRef={socketRef}
        />

        <main className="flex min-w-0 flex-1 flex-col">

          {conversationId && selectedConversation ? (
            <>
              <ChatHeader
                conversation={selectedConversation}
                currentUserId={currentUser?._id}
              />

              {currentUser?.role === "client" && (
                <GigInfo
                  conversation={selectedConversation}
                />
              )}

              <MessageList
                conversationId={conversationId}
                socketRef={socketRef}
                receiverName={receiverName}
              />

              <MessageInput
                conversationId={conversationId}
                socketRef={socketRef}
              />
            </>
          ) : (
            /* No conversation selected */
            <div className="flex flex-1 items-center justify-center">
              <p className="text-gray-500">
                Select a conversation to start chatting
              </p>
            </div>
          )}

        </main>

      </div>
    </div>
  );
}

export default ChatPage;