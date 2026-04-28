import { Router } from "express";
import { adminAllUsers, adminDeleteUser, adminEditUser, adminLogin, adminStats, adminUserDetails } from "../controller/admin.controller";
import { verifyJWT } from "../../../middleware/auth.middleware";
import { authorrizeRoles } from "../../../middleware/role.middleware";
import { upload } from "../../../middleware/multer.middleware";

const router = Router();
const userUploadedFiles = upload.fields([
    { name: "avatar", maxCount:1},
    { name: "front", maxCount:1 },
    { name: "back", maxCount: 1}
])
router.route('/login').post(adminLogin);
router.route('/stats').post(adminStats);
router.route('/allUsers').get(verifyJWT,authorrizeRoles("admin"),adminAllUsers);
router.route('/delete-user/:userId').delete(verifyJWT,authorrizeRoles("admin"),adminDeleteUser);
router.route('/get-user/:userId').get(verifyJWT,authorrizeRoles("admin"),adminUserDetails);
router.route('/edit-user/:userId').patch(verifyJWT,authorrizeRoles("admin"),userUploadedFiles,adminEditUser);
export default router;