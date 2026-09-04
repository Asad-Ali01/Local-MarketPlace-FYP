import mongoose, { Schema, Types } from "mongoose";

interface IConversationMember{
  user:Types.ObjectId;
  lastReadMessage?:Types.ObjectId;
  lastReadAt?:Date;
}
export interface IConversation {
  _id:Types.ObjectId
  members: IConversationMember[];          // usually client and provider
  gig?: Types.ObjectId;               // optional: chat related to a gig
  order?: Types.ObjectId;             // optional: chat related to an order
  lastMessage: string;
  lastMessageAt?: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    members: [
     {
      user:{
        type: Types.ObjectId,
        ref: "User",
        required: true
      },
      lastReadMessage:{
        type:Types.ObjectId, 
        ref:"Message",
        default:null
      },
      lastReadAt:{
        type:Date,
        default:null
      }
    }
    ],

    gig: {
      type: Types.ObjectId,
      ref: "Gig",
      default: null
    },

    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      default: null
    },

    lastMessage: {
      type: String,
      default: ""
    },

    lastMessageAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

export const Conversation = mongoose.model<IConversation>(
  "Conversation",
  conversationSchema
);