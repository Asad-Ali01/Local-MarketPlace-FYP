import { Types } from "mongoose";
import { Conversation } from "../models/conversation.model";
import { Message } from "../models/message.model";


const createConversationService = async (
  providerId: Types.ObjectId,
  gigId: Types.ObjectId,
  clientId: Types.ObjectId
) => {

  let conversation = await Conversation.findOne({
    members: { $all: [providerId, clientId] },
    gig: gigId
  })
    .populate("members", "name avatar role")
    .populate("gig", "title startingPrice");

  if (conversation) {
    return { conversation };
  }

  conversation = await Conversation.create({
    members: [providerId, clientId],
    gig: gigId
  });

  await conversation.populate("members", "name avatar role");
  await conversation.populate("gig", "title startingPrice");

  return { conversation };
};


const getAllMyConversationsService = async (
  clientId: Types.ObjectId
) => {

  const conversations = await Conversation.find({
    members: clientId
  })
    .populate("members", "name avatar role")
    .populate("gig", "title startingPrice")
    .sort({ lastMessageAt: -1 });

  return { conversations };
};

const getAllMessagesByConversationIdService = async(
    conversationId:string
) => {
     if (!Types.ObjectId.isValid(conversationId)) {
    throw new Error("Invalid conversation ID");
  }
   const messages = await Message.find({conversation:conversationId}).populate("sender","name avatar").sort({createdAt: 1});

   return {messages};
}
export {createConversationService,getAllMyConversationsService,getAllMessagesByConversationIdService};