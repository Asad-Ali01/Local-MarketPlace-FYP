import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { createConversation, getAllMessagesByConversationId, getAllMyConversations } from "../controllers/chat.controller";


const router = Router();

router.route("/conversations").post(verifyJWT,createConversation);
router.route("/conversations").get(verifyJWT,getAllMyConversations);

// Get All messages
router.route("/:conversationId/messages").get(verifyJWT,getAllMessagesByConversationId);

export default router