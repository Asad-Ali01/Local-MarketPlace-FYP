import { Router } from "express";
import { upload } from "../../../middleware/multer.middleware";
import {  createGig,  getGigsDetails, updateGig } from "../controller/gig.controller";
import { verifyJWT } from "../../../middleware/auth.middleware";
import { authorrizeRoles } from "../../../middleware/role.middleware";

const router = Router();

const gigUploadedFiles = upload.array(
   "images",3
)


// Create Gig
router.route('/gig').post(verifyJWT,authorrizeRoles("provider","admin"),gigUploadedFiles,createGig);

// update gig
router.route('/gig').patch(verifyJWT,authorrizeRoles("provider","admin"),gigUploadedFiles,updateGig);

// Gigs detailed fetched
router.route('/gig').get(verifyJWT,getGigsDetails);



export default router