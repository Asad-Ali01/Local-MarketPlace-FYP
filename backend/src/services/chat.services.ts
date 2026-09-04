import { Types } from "mongoose";
import { Conversation } from "../models/conversation.model";
import { Message } from "../models/message.model";
import { User } from "../models/user.model";
import { Gig } from "../models/gig.model";
import { ApiError } from "../utils/ApiError";


const createConversationService = async (
  providerId: Types.ObjectId,
  gigId: Types.ObjectId,
  clientId: Types.ObjectId
) => {

  let conversation = await Conversation.findOne({
    "members.user": { $all: [providerId, clientId] },
    gig: gigId
  })
    .populate("members", "name avatar role")
    .populate("gig", "title startingPrice");

  if (conversation) {
    return { conversation };
  }

  conversation = await Conversation.create({
    members:[
      {
        user:providerId
      },
      {
        user:clientId
      }
    ],
    gig: gigId
  });

  await conversation.populate("members", "name avatar role");
  await conversation.populate("gig", "title startingPrice");

  return { conversation };
};


const getAllMyConversationsService = async (
  userId: Types.ObjectId
) => {

  const conversations = await Conversation.find({
    "members.user": userId
  })
    .populate("members.user", "name avatar role")
    .populate("gig", "title startingPrice")
    .sort({ lastMessageAt: -1 });
  console.log("Here is conversations: ",conversations);
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

const getConversationContextService = async(providerId:string,clientId:string,gigId:string) => {


   const conversation = await Conversation.findOne({
    gig:gigId,
    members:{
      $all:[
        { $elemMatch: { user:providerId }},
        { $elemMatch: { user:clientId }},
      ]
    }
  }).populate("members.user", "name avatar role")
  .populate("members.lastReadMessage")
    .populate("gig", "title startingPrice").lean();

  if(conversation){
    return {conversation};
  }

 const provider = await User.findById(providerId).select("_id name avatar").lean();
 if (!provider) {
    throw new ApiError(404, "Provider not found");
  }
 


 const gig = await Gig.findById(gigId).select("_id title startingPrice").lean();
  if (!gig) {
    throw new ApiError(404, "Gig not found");
  }
  return {provider,gig};
}
export {createConversationService,getAllMyConversationsService,getAllMessagesByConversationIdService,getConversationContextService};