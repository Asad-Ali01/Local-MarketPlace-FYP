import type { IAvatar, IGig, IProvider } from "./gig.types";
export interface IConversationMember{
  user:{
    _id: string;
      avatar?: IAvatar;
      name: string;
      role: "provider" | "client";
  };
  lastReadMessage?:string;
  lastReadAt?:Date;
}
export interface IConversation {
  _id: string;
  members: IConversationMember[];

  gig?: {
    startingPrice?: number;
    title: string;
    _id: string;
  };
  order?: string; // optional: chat related to an order
  lastMessage: string;
  lastMessageAt?: Date;
}
export interface INewConversation {
  provider?: {
      _id:string;
      name:string;
      avatar:IAvatar
    };
  gig?: {
      _id:string;
      title:string;
      startingPrice:number | null;
    };
}
export interface IConversationContext{
  data:{
    conversation?:IConversation;
     provider?: {
      _id:string;
      name:string;
      avatar:IAvatar
    };
  gig?: {
      _id:string;
      title:string;
      startingPrice:number | null;
    };
  }
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
  data: IMessage[];
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