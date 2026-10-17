import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { createConversation, getAllMessagesByConversationId, getAllMyConversations,  getConversationContext, getMessagesByConversation } from "../controllers/chat.controller";


const router = Router();

router.route("/conversations").post(verifyJWT,createConversation);
router.route("/conversations").get(verifyJWT,getAllMyConversations);

// Get All messages
router.route("/:conversationId/messages").get(verifyJWT,getAllMessagesByConversationId);

// Get Conversation Context if exists then return if not then give provider and gig basic info
router.route("/conversations/context").get(verifyJWT,getConversationContext);
// get messages by conversation using cursor
router.route("/conversations/messages/:conversationId").get(verifyJWT,getMessagesByConversation)
export default router