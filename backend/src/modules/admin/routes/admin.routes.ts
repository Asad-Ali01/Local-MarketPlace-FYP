import { Router } from "express";
import { adminLogin } from "../controller/admin.controller";

const router = Router();

router.route('/login').post(adminLogin);

export default router;