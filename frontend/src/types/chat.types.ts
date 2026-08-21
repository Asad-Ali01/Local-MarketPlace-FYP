import type { IAvatar, IGig } from "./gig.types";

export interface IConversation {
  _id: string;
  members: [
    {
      _id: string;
      avatar?: {
        url: string;
        public_id: string;
      };
      name: string;
      role: "provider" | "client";
    },
  ];

  gig?: {
    startingPrice?: number;
    title: string;
    _id: string;
  };
  order?: string; // optional: chat related to an order
  lastMessage: string;
  lastMessageAt?: Date;
}
export interface ICreateConversation {
  data: IConversation;
}
export interface IGetAllCoversations {
  data: IConversation[];
}
export interface IMessage {
   
    _id:string;
    conversation: string;
    sender: {
      _id:string;
      name: string;
      avatar: IAvatar;
    };
    receiver: string;
    content: string;
    isRead: boolean;
    createdAt:Date;
  
}
export interface IMessages {
  data: {
    _id:string;
    conversation: string;
    sender: {
      _id:string;
      name: string;
      avatar: IAvatar;
    };
    receiver: string;
    content: string;
    isRead: boolean;
    createdAt:Date;
  }[];
}


export interface ConversationMember {
  _id: string;
  name: string;
  role: "client" | "provider";
  avatar?: {
    url: string;
    public_id: string;

  };
}


export type ClientMessage =
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
      type: "SEND_MESSAGE";
      payload: {
        conversationId: string;
        text: string;
      };
    };