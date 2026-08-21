import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/hooks/useAppDispatchSelector";
import { CheckCheck } from "lucide-react";

interface MessageBubbleProps {
  type: "sent" | "received";
  content: string;
  time: string;
  avatarUrl?: string;
  senderName?: string;
  senderId: string;
}

function MessageBubble({
  senderId,
  type,
  content,
  time,
  avatarUrl,
  senderName,
}: MessageBubbleProps) {
  const isReceived = type === "received";
  const currentUserId = useAppSelector((state) => state.auth.user?._id);

  return (
    <div
      className={`flex  gap-2 ${currentUserId === senderId ? "justify-end" : "justify-start"}`}
    >
      {/* <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage
            src={avatarUrl}
            alt={senderName}
          />

          <AvatarFallback>
            {senderName?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar> */}

      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          currentUserId == senderId
            ? "bg-gray-700 text-white"
            : "bg-black text-white"
        }`}
      >
        <p className="text-sm">{content}</p>
        {
          currentUserId == senderId
          &&
            <span>
          <CheckCheck
            size={16}
            className={isReceived ? "text-blue-500" : "text-gray-400"}
          />
        </span>
        }
      
        <span className="mt-1 block text-xs opacity-60">{time}</span>
      </div>
    </div>
  );
}

export default MessageBubble;
