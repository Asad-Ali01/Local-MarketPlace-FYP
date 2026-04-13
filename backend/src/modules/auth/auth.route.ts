import { Router } from "express";
import { refreshAccessToken } from "./auth.controller";

const router = Router();

router.route('/refresh-token').post(refreshAccessToken);