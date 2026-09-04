import { IUser } from "../models/user.model";
import WebSocket from "ws";
export interface AuthenticatedWebSocket extends WebSocket{
    user:IUser
} 
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