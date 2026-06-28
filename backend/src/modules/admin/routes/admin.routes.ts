import { Router } from "express";
import { adminAllUsers, adminDeleteUser, adminEditUser, adminLogin, adminLogout, adminStats, adminUserDetails, createCategory, createSubCategory, getAllCategories, getAllSubCategories } from "../controller/admin.controller";
import { verifyJWT } from "../../../middleware/auth.middleware";
import { authorrizeRoles } from "../../../middleware/role.middleware";
import { upload } from "../../../middleware/multer.middleware";


const router = Router();
const userUploadedFiles = upload.fields([
    { name: "avatar", maxCount:1},
    { name: "front", maxCount:1 },
    { name: "back", maxCount: 1}
])


// Admin login
router.route('/login').post(adminLogin);

router.route('/stats').post(adminStats);
// Get all users
router.route('/users').get(verifyJWT,authorrizeRoles("admin"),adminAllUsers);
// Delete one user
router.route('/users/:userId').delete(verifyJWT,authorrizeRoles("admin"),adminDeleteUser);
// Get one user
router.route('/users/:userId').get(verifyJWT,authorrizeRoles("admin"),adminUserDetails);
// Update one user
router.route('/users/:userId').patch(verifyJWT,authorrizeRoles("admin"),userUploadedFiles,adminEditUser);

router.route('/logout').post(verifyJWT,authorrizeRoles("admin"),adminLogout);


// Categories
router.route('/category').post(verifyJWT,authorrizeRoles("admin"),upload.single("icon"),createCategory);
router.route('/sub-category').post(verifyJWT,authorrizeRoles("admin"),upload.single("icon"),createSubCategory);
router.route('/category').get(verifyJWT,authorrizeRoles("admin"),getAllCategories);
router.route('/sub-category').get(verifyJWT,authorrizeRoles("admin"),getAllSubCategories);

export default router;