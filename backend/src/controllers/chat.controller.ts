import { Types } from "mongoose";
import { createConversationService, getAllMessagesByConversationIdService, getAllMyConversationsService } from "../services/chat.services";
import { ApiResponse } from "../utils/ApiRespose";
import { asyncHandler } from "../utils/asynHandler";
import { ApiError } from "../utils/ApiError";

const createConversation = asyncHandler(async(req,res) => {
    const clientId = req.user._id;
    const {providerId,gigId} = req.body;
   const {conversation} =  await createConversationService(providerId,gigId,clientId);
   return res.status(200).json( new ApiResponse(200,conversation,"Conversation created successfully"))
})

const getAllMyConversations = asyncHandler(async(req,res) => {
        const clientId = req.user._id;

   const {conversations} = await getAllMyConversationsService(clientId);

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
export {createConversation,getAllMyConversations,getAllMessagesByConversationId};