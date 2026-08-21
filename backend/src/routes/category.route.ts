import { createCategory, createSubCategory, deleteCategory, deleteSubCategory,  getAllCategories, getAllSubCategories } from "../controllers/category.controller";
import { verifyJWT } from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";
import { authorrizeRoles } from "../middleware/role.middleware";
import { Router } from "express";

const router = Router();
// Categories
router.route('/admin/category').post(verifyJWT,authorrizeRoles("admin"),upload.single("icon"),createCategory);
router.route('/admin/sub-category').post(verifyJWT,authorrizeRoles("admin"),upload.single("icon"),createSubCategory);
router.route('/admin/category').get(verifyJWT,authorrizeRoles("admin","provider"),getAllCategories);
router.route('/admin/sub-category').get(verifyJWT,authorrizeRoles("admin","provider"),getAllSubCategories);
router.route('/admin/category/:categoryId').delete(verifyJWT,authorrizeRoles("admin"),deleteCategory);
router.route('/admin/sub-category/:subCategoryId').delete(verifyJWT,authorrizeRoles("admin"),deleteSubCategory);

export default router