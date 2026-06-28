import { Router } from "express";
import { otpSend, otpVerify, resetPassword } from "./otp.controller";

const router = Router();

router.route('/otp-send/:email').post(otpSend)
router.route('/otp-verify').post(otpVerify)
router.route('/reset-password').post(resetPassword)

export default router;