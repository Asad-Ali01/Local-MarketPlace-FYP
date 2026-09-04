import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useAppSelector } from "@/hooks/useAppDispatchSelector";
import type { IConversationMember, IConversation } from "@/types/chat.types";

interface ChatHeaderProps {
  conversation?: IConversation;
  currentUserId?:string
}

function ChatHeader({
  conversation,
  currentUserId
}: ChatHeaderProps) {
    // const [isOnline,setIsOnline] = useState(false);
    console.log("Conversation: ",conversation);
   const otherUser =
    conversation?.members.find(
      (member: IConversationMember) => member.user._id !== currentUserId
    )?.user;
    console.log("Other user: ",otherUser," Current User: ",currentUserId);
    const isOnline = useAppSelector(state => {
      console.log("State: ",state.chat.onlineUsersIds);
   return  otherUser  ? state.chat.onlineUsersIds.includes(otherUser._id) : false
    })
    console.log("ISONLINE",isOnline)
    // useEffect(() => {
    //   console.log("Asas");
    //   const unsubscribe = subscribeToWebSocket((incoming) => {
    //       console.log("InComing Type: ",incoming);

    //     switch(incoming.type){
    //       case "USER_ONLINE":
    //         if(incoming.payload.userId === otherUser?._id){
    //           setIsOnline(true);
    //           console.log('currentID online: ',currentUserId);
    //         }
    //         break;
    //       case "USER_OFFLINE":
    //          if(incoming.payload.userId === otherUser?._id){
    //           setIsOnline(false);
    //           console.log('currentID offline: ',currentUserId);

    //         }
    //         break;
    //     }
    //   })
    //   return unsubscribe;
    // },[otherUser?._id])
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
              ● {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </>
      )}

    </header>
  );
}

export default ChatHeader;