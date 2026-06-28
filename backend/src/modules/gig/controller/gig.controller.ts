import { ApiError } from "../../../utils/ApiError";
import { ApiResponse } from "../../../utils/ApiRespose";
import { asyncHandler } from "../../../utils/asynHandler"
import { createCategoryService } from "../../admin/services/createCategory";
import { createGigService } from "../services/createGig.service"
import { createSubCategoryService } from "../../admin/services/createSubCategory";
import { getGigDetailsService } from "../services/getGigDetails.service";
import { updateGigService } from "../services/updateGig.service";

const createGig = asyncHandler(async(req,res) => {
    const files = (req.files as Record<string,Express.Multer.File[]>)?.images || [];
    const userId = req.user._id;
  const {gig} = await createGigService(req.body,files,userId);

  return res.status(200).json(new ApiResponse(200,gig,"Gig created successfully"));
})

const updateGig = asyncHandler(async(req,res) => {
    const providerId = req.params.providerId as string;
    const userId = req.user._id;

  const {gig} =  await updateGigService(req.body,req.files,providerId,userId);
  if(gig){
    return res.status(200).json(new ApiResponse(200,gig,"Gig updated successfully"));
  }
})

const getGigsDetails = asyncHandler(async(req,res) => {
  const userId = req.user._id
 const {totalGigs,hasGigs,gigs} = await getGigDetailsService(userId);

 return res.status(200).json(new ApiResponse(200,{totalGigs,hasGigs,gigs},"Gig details fetched successfully"));
})



export {createGig,updateGig,getGigsDetails};