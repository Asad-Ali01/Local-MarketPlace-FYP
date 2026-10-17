import mongoose, { Types } from "mongoose";
import { createConversationService, getAllMessagesByConversationIdService, getAllMyConversationsService, getConversationContextService, getMessagesByConversationService } from "../services/chat.services";
import { ApiResponse } from "../utils/ApiRespose";
import { asyncHandler } from "../utils/asynHandler";
import { ApiError } from "../utils/ApiError";
import { Conversation } from "../models/conversation.model";
import { Request } from "express";
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

const getAllMessagesByConversationId = asyncHandler(async(req:Request<{conversationId:string;}>,res) => {
    const conversationId = req.params.conversationId

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

const getMessagesByConversation = asyncHandler(async(req:Request<{conversationId:string;}>,res) => {
    const rawCursor = req.query.cursor;
    let rawLimit = req.query.limit;
    const conversationId = req.params.conversationId;
    const userId = req.user._id.toString();
    let limit :  number | undefined;
    // validate conversation id
    if(typeof conversationId !== 'string' || !mongoose.isObjectIdOrHexString(conversationId))
    {
        throw new ApiError(400,"Invalid conversation ID.");
    }

    // Validate limit
    if(typeof rawLimit !== undefined)
    {
        if(typeof rawLimit !== "string" || rawLimit.trim() === "")
        {
            throw new ApiError(400,"Invalid limit.");
        }

        limit = Number(rawLimit);

        if(!Number.isInteger(limit) || limit < 0)
        {
            throw new ApiError(400,"Limit must be positive integer.");
        }
    }
    // Validate cursor
    let cursor:string | undefined;

    if(rawCursor !== undefined)
    {
        if(typeof rawCursor !== "string" || rawCursor.trim() === "")
        {
            throw new ApiError(400,"Invalid cursor.");
        }
        cursor = rawCursor;
    }
   const result = await getMessagesByConversationService({userId,conversationId,limit,cursor});

    return res.status(200).json(new ApiResponse(200,result,"Messages fetched successfully"));
})
export {createConversation,getAllMyConversations,getAllMessagesByConversationId,getConversationContext,getMessagesByConversation};