import React, { useEffect,  useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { connectWebSocket } from "@/services/websocket/websocket";

interface MessageInputProps {
  conversationId?: string;
  socketRef:{
    current:WebSocket | null
  }
}

function MessageInput({
  conversationId,
  socketRef
}: MessageInputProps) {

  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTyping = useRef(false);

  const handleTextChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);
    const socket = socketRef.current;
    if(!socket || socket.readyState !== WebSocket.OPEN){
      return;
    }

    // USer started typing
    if(!isTyping.current){
      isTyping.current = true;

      socket.send(
        JSON.stringify({
          type:"TYPING",
          payload:{
            conversationId
          }
        })
      );

    }

    // Reset stop-typing timer
    if(typingTimer.current){
      clearTimeout(typingTimer.current);
    }

    typingTimer.current = setTimeout(() => {
      isTyping.current = false;
      if(socket?.readyState === WebSocket.OPEN){
        socket.send(
          JSON.stringify({
            type:"STOP_TYPING",
            payload:{
              conversationId
            }
          })
        )
      }
    },1000)
  }
  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key == "Enter"){
      handleSend();
    }
  }
  const handleSend = () => {
    if (!message.trim()) return;
    if(!conversationId){
        console.log("No conversation id exists");
        return;
    }
    const socket = socketRef.current;
    if(!socket){
        console.log("Socket does not exist");
        return;
    }

    if(socket.readyState !== WebSocket.OPEN){
        console.log("Socket is not connected");
        return;
    }
     socket.send(
          JSON.stringify({
            type:"STOP_TYPING",
            payload:{
              conversationId
            }
          })
        )
        socket.send(
          JSON.stringify({
            type:"SEND_MESSAGE",
            payload:{
                conversationId,
                text:message
            }
        })
      )
      console.log("Send messgae: ",message);
    setMessage("");
  };
  useEffect(() => {
    inputRef.current?.focus();
  },[])

  return (
    <div className="border-t bg-white p-4">

      <div className="flex items-center gap-2">

        <Input
          value={message}
          ref={inputRef}
          onChange={handleTextChange}
          placeholder="Type your message..."
          className="flex-1"
          onKeyDown={handleKeyDown}
        />

        <Button
          size="icon"
          onClick={handleSend}
          
        >
          <Send className="h-5 w-5" />
        </Button>

      </div>

    </div>
  );
}

export default MessageInput;