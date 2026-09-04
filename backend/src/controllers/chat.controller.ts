import { Types } from "mongoose";
import { createConversationService, getAllMessagesByConversationIdService, getAllMyConversationsService, getConversationContextService } from "../services/chat.services";
import { ApiResponse } from "../utils/ApiRespose";
import { asyncHandler } from "../utils/asynHandler";
import { ApiError } from "../utils/ApiError";
import { Conversation } from "../models/conversation.model";

const createConversation = asyncHandler(async(req,res) => {
    const clientId = req.user._id;
    const {providerId,gigId} = req.body;
   const {conversation} =  await createConversationService(providerId,gigId,clientId);
   return res.status(200).json( new ApiResponse(200,conversation,"Conversation created successfully"))
})

const getAllMyConversations = asyncHandler(async(req,res) => {
        const userId = req.user._id;

   const {conversations} = await getAllMyConversationsService(userId);

   return res.status(200).json(new ApiResponse(200,conversations,"All conversations fetched successfully"));
})

const getAllMessagesByConversationId = asyncHandler(async(req,res) => {
    const conversationId = Array.isArray(req.params.conversationId)
      ? req.params.conversationId[0]
      : req.params.conversationId;

    if (!conversationId) {
        throw new ApiError(400,"Conversation id is required");
    }
   const {messages} = await getAllMessagesByConversationIdService(conversationId);
   return res.status(200).json(new ApiResponse(200,messages,"All messages fetched successfully"));
})


const getConversationContext = asyncHandler(async(req,res) => {
    const {providerId,gigId} = req.query;
    const clientId = req.user._id.toString();
    if(!providerId || !gigId){
        throw new ApiError(400,"ProviderId and gigId both are required");
    }
   const response  = await getConversationContextService(providerId as string,clientId,gigId as string);
  return res.status(200).json(new ApiResponse(200,response,"Conversation context fetched successfully"));
})
export {createConversation,getAllMyConversations,getAllMessagesByConversationId,getConversationContext};