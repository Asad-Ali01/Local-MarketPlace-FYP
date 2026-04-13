import { Router } from "express";
import { loginUser, registerUser } from "../controller/user.controller";
import { upload } from "../../../middleware/multer.middleware";
const router = Router()

const registerUserUploadedFiles = upload.fields([
    { name: "avatar", maxCount:1},
    { name: "front", maxCount:1 },
    { name: "back", maxCount: 1}
])

router.route("/register").post(registerUserUploadedFiles,registerUser);
router.route("/login").post(loginUser);


export default router