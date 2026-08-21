import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import type { ConversationMember, IConversation } from "@/types/chat.types";

interface ChatHeaderProps {
  conversation?: IConversation;
  currentUserId?:string
}

function ChatHeader({
  conversation,
  currentUserId
}: ChatHeaderProps) {

   const otherUser =
    conversation?.members.find(
      (member: ConversationMember) => member._id !== currentUserId
    );

  return (
    <header className="flex items-center gap-3 border-b p-4">

      {otherUser && (
        <>
          <Avatar className="h-11 w-11">

            <AvatarImage
              src={otherUser.avatar?.url}
              alt={otherUser.name}
            />

            <AvatarFallback>
              {otherUser.name
                ?.charAt(0)
                .toUpperCase()}
            </AvatarFallback>

          </Avatar>

          <div>
            <h2 className="font-semibold">
              {otherUser.name}
            </h2>

            <p className="text-sm text-green-600">
              ● Online
            </p>
          </div>
        </>
      )}

    </header>
  );
}

export default ChatHeader;