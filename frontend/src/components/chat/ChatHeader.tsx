import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppSelector } from '@/hooks/useAppDispatchSelector';
import type { IConversationMember, IConversation } from '@/types/chat.types';
import { useState } from 'react';

interface ChatHeaderProps {
  conversation?: IConversation;
  currentUserId?: string;
}

function ChatHeader({ conversation, currentUserId }: ChatHeaderProps) {
  // const [isOnline,setIsOnline] = useState(false);

  const otherUser = conversation?.members.find(
    (member: IConversationMember) => member.user._id !== currentUserId,
  )?.user;
  const isOnline = useAppSelector((state) => {
    return otherUser ? state.chat.onlineUsersIds.includes(otherUser._id) : false;
  });
  return (
    <header className="flex items-center gap-3 border-b p-4">
      {otherUser && (
        <>
          <Avatar className="h-11 w-11">
            <AvatarImage src={otherUser.avatar?.url} alt={otherUser.name} />

            <AvatarFallback>{otherUser.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div>
            <h2 className="font-semibold">{otherUser.name}</h2>

            <p className={`text-sm  ${isOnline ? "text-green-600" : "text-red-600"}`}>● {isOnline ? 'Online' : 'Offline'}</p>
          </div>
        </>
      )}
    </header>
  );
}

export default ChatHeader;
