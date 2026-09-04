import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { createConversation, getAllMessagesByConversationId, getAllMyConversations,  getConversationContext } from "../controllers/chat.controller";


const router = Router();

router.route("/conversations").post(verifyJWT,createConversation);
router.route("/conversations").get(verifyJWT,getAllMyConversations);

// Get All messages
router.route("/:conversationId/messages").get(verifyJWT,getAllMessagesByConversationId);

// Get Conversation Context if exists then return if not then give provider and gig basic info
router.route("/conversations/context").get(verifyJWT,getConversationContext);

export default router