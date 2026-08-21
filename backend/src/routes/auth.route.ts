import { Router } from "express";
import { Logout, refreshAccessToken, resetPassword } from "../controllers/auth.controller";
import { verifyJWT } from "../middleware/auth.middleware";

const router = Router();

router.route('/refresh-token').post(refreshAccessToken);
router.route('/logout').post(verifyJWT,Logout);
router.route('/reset-password').post(verifyJWT,resetPassword);

export default router