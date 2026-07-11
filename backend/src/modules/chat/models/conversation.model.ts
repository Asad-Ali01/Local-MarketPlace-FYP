import mongoose, { Schema, Types } from "mongoose";

export interface IConversation {
  members: Types.ObjectId[];          // usually buyer and provider
  gig?: Types.ObjectId;               // optional: chat related to a gig
  order?: Types.ObjectId;             // optional: chat related to an order
  lastMessage: string;
  lastMessageAt?: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    ],

    gig: {
      type: Schema.Types.ObjectId,
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