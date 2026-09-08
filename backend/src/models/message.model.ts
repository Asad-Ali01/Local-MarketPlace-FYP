import mongoose, { Schema, Types } from "mongoose";

export interface IMessage extends Document{
  conversation: Types.ObjectId;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  content: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
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

    content: {
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

messageSchema.index({conversation:1, createdAt:-1})
export const Message = mongoose.model<IMessage>("Message", messageSchema);