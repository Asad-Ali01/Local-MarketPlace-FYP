import { ApiError } from "../../../utils/ApiError";
import { ApiResponse } from "../../../utils/ApiRespose";
import { asyncHandler } from "../../../utils/asynHandler"
import { createCategoryService } from "../../admin/services/createCategory";
import { createGigService } from "../services/createGig.service"
import { createSubCategoryService } from "../../admin/services/createSubCategory";
import { getGigBasicInfoService } from "../services/getGigBasicInfo.service";
import { updateGigService } from "../services/updateGig.service";
import { providerDashboardStatsService } from "../services/providerDashboardStats";

const createGig = asyncHandler(async(req,res) => {
    const files = (req.files as Express.Multer.File[]) || [];
    const userId = req.user._id;
    console.log("Here is data: ",req.body);
  
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
 const {totalGigs,hasGigs,gigs} = await getGigBasicInfoService(userId);

 return res.status(200).json(new ApiResponse(200,{totalGigs,hasGigs,gigs},"Gig details fetched successfully"));
})


const providerDashBoardStats = asyncHandler(async(req,res) => {
    const providerId = req.params.providerId as string
    if(!providerId){
      throw new ApiError(400,"ProviderId is missing !. Need providerId to fetched dashboard stats");
    }
    const {
        totalGigs,
        activeOrders,
        completedOrders,
        totalEarnings,
        averageRating,
        unreadMessages
    } = await providerDashboardStatsService(providerId)

    return res.status(200).json(new ApiResponse(200,{
        totalGigs,
        activeOrders,
        completedOrders,
        totalEarnings,
        averageRating,
        unreadMessages
    },"Provider dashboard stats fetched successfully"))
})


export {createGig,updateGig,getGigsDetails,providerDashBoardStats};