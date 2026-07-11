import { Router } from "express";
import { Logout, refreshAccessToken } from "./auth.controller";
import { verifyJWT } from "../../middleware/auth.middleware";

const router = Router();

router.route('/refresh-token').post(refreshAccessToken);
router.route('/logout').post(verifyJWT,Logout);

export default router