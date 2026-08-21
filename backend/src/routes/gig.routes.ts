import { Router } from "express";
import { upload } from "../middleware/multer.middleware";
import {  createGig,  deleteGig,  getAllGigsByCategory,  getAllMyGigs,  getGigDetailsByGigId,  getGigsDetails, getLocationSuggestions, providerDashBoardStats, updateGig } from "../controllers/gig.controller";
import { verifyJWT } from "../middleware/auth.middleware";
import { authorrizeRoles } from "../middleware/role.middleware";

const router = Router();

const gigUploadedFiles = upload.fields([
   {name:"images",maxCount:3},
   {name:"avatar",maxCount:1}
]
)


// Create Gig
router.route('/').post(verifyJWT,authorrizeRoles("provider","admin"),gigUploadedFiles,createGig);

// update gig
router.route('/:providerId').patch(verifyJWT,authorrizeRoles("provider","admin"),gigUploadedFiles,updateGig);

// Gigs detailed fetched for admin dashbaord
router.route('/').get(verifyJWT,getGigsDetails);

// provider dashbaord stats
router.route('/dashboard/:providerId').get(verifyJWT,providerDashBoardStats);

// Get All Gigs By Category
router.route('/category/:slug').get(getAllGigsByCategory);

// Get All gigs for provider by provider id
router.route('/provider/:providerId').get(getAllMyGigs);

// Delete gig
router.route('/:gigId').delete(verifyJWT,authorrizeRoles("provider","admin"),deleteGig);


router.route('/details/:gigId').get(getGigDetailsByGigId);


router.route('/location/search').get(verifyJWT,authorrizeRoles("provider"),getLocationSuggestions)
export default router