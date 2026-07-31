import { Router } from "express";
import { upload } from "../../../middleware/multer.middleware";
import {  createGig,  getAllGigsByCategory,  getGigsDetails, providerDashBoardStats, updateGig } from "../controllers/gig.controller";
import { verifyJWT } from "../../../middleware/auth.middleware";
import { authorrizeRoles } from "../../../middleware/role.middleware";

const router = Router();

const gigUploadedFiles = upload.fields([
   {name:"images",maxCount:3},
   {name:"avatar",maxCount:1}
]
)


// Create Gig
router.route('/gig').post(verifyJWT,authorrizeRoles("provider","admin"),gigUploadedFiles,createGig);

// update gig
router.route('/gig/:providerId').patch(verifyJWT,authorrizeRoles("provider","admin"),gigUploadedFiles,updateGig);

// Gigs detailed fetched for admin dashbaord
router.route('/gig').get(verifyJWT,getGigsDetails);

// provider dashbaord stats
router.route('/gig/:providerId').get(verifyJWT,providerDashBoardStats);

// Get All Gigs By Category
router.route('/gig/category/:slug').get(getAllGigsByCategory);

export default router