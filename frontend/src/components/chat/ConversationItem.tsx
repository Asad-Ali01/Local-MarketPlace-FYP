import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import type { ConversationMember, IConversation } from "@/types/chat.types";

interface ConversationItemProps {
  conversation: IConversation;
  isSelected: boolean;
  currentUserId?:string;
}


function ConversationItem({ 
  conversation,
  isSelected,
  currentUserId
}: ConversationItemProps) {

  const otherUser =
    conversation.members.find(
      (member: ConversationMember) => member._id !== currentUserId
    );

  return (
    <button
      className={`flex w-full items-center gap-3 border-b p-4 text-left transition ${
        isSelected
          ? "bg-blue-50"
          : "hover:bg-gray-50"
      }`}
    >

      <Avatar className="h-12 w-12 shrink-0">
        <AvatarImage
          src={otherUser?.avatar?.url}
          alt={otherUser?.name}
        />

        <AvatarFallback>
          {otherUser?.name
            ?.charAt(0)
            .toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">

        <div className="flex justify-between gap-2">

          <p className="truncate font-semibold">
            {otherUser?.name}
          </p>

          <span className="shrink-0 text-xs text-gray-400">
            {conversation.lastMessageAt
              ? new Date(
                  conversation.lastMessageAt
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </span>

        </div>

        <p className="truncate text-sm text-gray-500">
          {conversation.lastMessage ||
            "No messages yet"}
        </p>

      </div>

    </button>
  );
}

export default ConversationItem;