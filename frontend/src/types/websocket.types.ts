export type ClientMessage =
  | {
      type: "SEND_MESSAGE";
      payload: {
        conversationId: string;
        text: string;
      };
    }
  | {
      type: "TYPING";
      payload: {
        conversationId: string;
      };
    }
  | {
      type: "STOP_TYPING";
      payload: {
        conversationId: string;
      };
    }
  | {
      type: "MARK_MESSAGES_READ";
      payload: {
        conversationId: string;
      };
    };

export type ServerWebSocketEvent =
  | {
      type: "NEW_MESSAGE";
      payload: {
        conversationId: string;
        message: string;
      };
    }
  | {
      type: "LAST_MESSAGE_UPDATE";
      payload: {
        conversationId: string;
        lastMessage: string;
        lastMessageAt:Date
      };
    }
  | {
      type: "MESSAGES_READ";
      payload: {
        conversationId: string;
        userId: string;
      };
    }
  | {
      type: "USER_TYPING";
      payload: {
        conversationId: string;
      };
    }
  | {
      type: "USER_STOP_TYPING";
      payload: {
        conversationId: string;
      };
    }
    | {
        type:"LAST_MESSAGE_UPDATED";
        payload:{
            conversationId:string;
        }
    }
    

