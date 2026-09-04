import ChatHeader from "@/components/chat/ChatHeader";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatSkeleton from "@/components/chat/ChatSkelton";
import GigInfo from "@/components/chat/GigInfo";
import MessageInput from "@/components/chat/MessageInput";
import MessageList from "@/components/chat/MessageList";
import {
  useGetAllConversationApiQuery,
  useGetConversationContextQuery,
} from "@/features/chat/chatApi";
import { useAppSelector } from "@/hooks/useAppDispatchSelector";
import { connectWebSocket } from "@/services/websocket/websocket";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useRef } from "react";
import { Navigate, useParams, useSearchParams } from "react-router";

function ChatPage() {
  const { conversationId } = useParams<{
    conversationId?: string;
  }>();

  const [searchParams] = useSearchParams();
  const providerId = searchParams.get("providerId");
  const gigId = searchParams.get("gigId");

  const { data, isLoading } = useGetAllConversationApiQuery();
  const { data: contextConversation } = useGetConversationContextQuery(
    providerId && gigId ? { providerId, gigId } : skipToken,
  );
  const currentUser = useAppSelector((state) => state.auth.user);

  const existingConversation = contextConversation?.data.conversation
    if (!conversationId && existingConversation) {
      return <Navigate to={`/client/messages/${existingConversation?._id}`} replace />;
    }



  const conversations = data?.data ?? [];
  const newConversation = contextConversation?.data?.provider
  ? {
      _id: "new",
      isNew: true,
      provider: contextConversation.data.provider,
      gig: contextConversation.data.gig,
    }
  : null;
  const selectedConversation = conversations.find(
    (conversation) => conversation._id === conversationId,
  );
  const receiverName = selectedConversation?.members.find(
    (member) => member.user._id !== currentUser?._id,
  )?.user.name;
  if (isLoading) {
    return <ChatSkeleton />;
  }
  
  console.log("asad");
  return (
    <div className="h-[calc(100vh-64px)] bg-gray-50">
      <div className="mx-auto flex h-full max-w-7xl overflow-hidden border bg-white">
        {/* Conversation list */}
        <ChatSidebar
          isLoading={isLoading}
          conversations={conversations}
          conversationId={conversationId}
          newConversation={newConversation}
        />
        <main className="flex min-w-0 flex-1 flex-col">
          {conversationId && selectedConversation ? (
            <>
              <ChatHeader
                conversation={selectedConversation}
                currentUserId={currentUser?._id}
              />
        
              {currentUser?.role === "client" && (
                <GigInfo gig={selectedConversation.gig} />
              )}

              <MessageList
                conversationId={conversationId}
                receiverName={receiverName}
              />

              <MessageInput conversationId={conversationId} />
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
      {/* IF current role is client then it means he is talkig to provider so GigInfo should be shown */}
export default ChatPage;
