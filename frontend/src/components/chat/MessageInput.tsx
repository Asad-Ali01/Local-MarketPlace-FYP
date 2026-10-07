import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { sendWebSocketMessage } from '@/services/websocket/websocket';
import { useSearchParams } from 'react-router';

interface MessageInputProps {
  conversationId?: string;
  // socketRef: {
  //   current: WebSocket | null;
  // };
}

function MessageInput({ conversationId }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTyping = useRef(false);
  const [searchParams] = useSearchParams();
  const providerId = searchParams.get('providerId');
  const gigId = searchParams.get('gigId');
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
    }
    typingTimer.current = null;
    isTyping.current = false;
    setMessage('');
  }, [conversationId]);
  useEffect(() => {
    return () => {
      if (isTyping.current && conversationId) {
        sendWebSocketMessage({
          type: 'STOP_TYPING',
          payload: { conversationId },
        });
      }

      if (typingTimer.current) {
        clearTimeout(typingTimer.current);
      }

      typingTimer.current = null;
      isTyping.current = false;
    };
  }, [conversationId]);
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);

    if (!conversationId) {
      console.log('No conversation id exists');
      return;
    }
    // USer started typing
    if (!isTyping.current) {
      isTyping.current = true;
      sendWebSocketMessage({
        type: 'TYPING',
        payload: {
          conversationId,
        },
      });
    }

    // Reset stop-typing timer
    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
    }

    typingTimer.current = setTimeout(() => {
      isTyping.current = false;
      sendWebSocketMessage({
        type: 'STOP_TYPING',
        payload: {
          conversationId,
        },
      });
    }, 1000);
  };
  const stopTyping = () => {
    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
      typingTimer.current = null;
    }

    if (isTyping.current && conversationId) {
      sendWebSocketMessage({
        type: 'STOP_TYPING',
        payload: { conversationId },
      });
    }

    isTyping.current = false;
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!message.trim()) return;
   
    if (conversationId) {
      stopTyping();
      sendWebSocketMessage({
        type: 'SEND_MESSAGE',
        payload: {
          conversationId,

          text: message,
        },
      });
    } else if (providerId && gigId) {
      sendWebSocketMessage({
        type: 'SEND_MESSAGE',
        payload: {
          conversationId: null,
          providerId,
          gigId,
          text: message,
        },
      });
    }

    setMessage('');
  };

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

        <Button size="icon" onClick={handleSend}>
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default MessageInput;
