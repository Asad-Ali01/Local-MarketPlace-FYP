import mongoose, { Schema, Types } from "mongoose";

export interface IMessage {
  conversation: Types.ObjectId;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  text: string;
  isRead: boolean;
}

const messageSchema = new Schema<IMessage>(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    text: {
      type: String,
      required: true,
      trim: true
    },

    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export const Message = mongoose.model<IMessage>("Message", messageSchema);