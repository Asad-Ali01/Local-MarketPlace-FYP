import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppSelector } from '@/hooks/useAppDispatchSelector';
import type { IConversationMember, IConversation, INewConversation } from '@/types/chat.types';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
interface ChatHeaderProps {
  conversation?: IConversation;
  currentUserId?: string;
  newConversation?:INewConversation;
  isMobile?:boolean;
}

function ChatHeader({ conversation,newConversation, currentUserId,isMobile }: ChatHeaderProps) {
  const otherUser = conversation?.members.find(
    (member: IConversationMember) => member.user._id !== currentUserId,
  )?.user;
  const isOnline = useAppSelector((state) => {
    return otherUser ? state.chat.onlineUsersIds.includes(otherUser._id) : false;
  });
  const navigate = useNavigate();
 
  const handleBack = () => {
    const path = location.pathname.split("/").slice(0,3).join("/");
    console.log("Path is: ",path);
    navigate(`${path}`)
  }
  return (
    <header className="flex items-center gap-3 border-b p-4">
      {
        newConversation && (
        <>
        {
          isMobile &&
        <ArrowLeft onClick={handleBack}/>
        }
          <Avatar className="h-11 w-11">
            <AvatarImage src={newConversation.provider?.avatar?.url} alt={newConversation?.provider?.name} />

            <AvatarFallback>{newConversation?.provider?.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div>
            <h2 className="font-semibold">{newConversation?.provider?.name}</h2>
{/*           
            <p className={`text-sm  ${isOnline ? "text-green-600" : "text-red-600"}`}>● {isOnline ? 'Online' : 'Offline'}</p> */}
          </div>
        </>
      )
      }
      {otherUser && (
        <>
       {
          isMobile &&
                <ArrowLeft onClick={handleBack}/>

        }

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
