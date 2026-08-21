import { createGigService, deleteGigService, getAllGigsByCategoryService, getAllMyGigService, getGigDetailsByGigIdService, getProviderGigInfoService, gigUpdateService, providerDashboardStatsService } from "../services/gig.services";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiRespose";
import { asyncHandler } from "../utils/asynHandler"
import { searchLocations } from "../utils/searchLocation";


const createGig = asyncHandler(async(req,res) => {
    const files = req.files as {
      images:Express.Multer.File[],
      avatar:Express.Multer.File[]
    };
    const userId = req.user._id;
    console.log("Here is data: ",req.body);
  
  const {gig} = await createGigService(req.body,files.images,files.avatar,userId);

  return res.status(200).json(new ApiResponse(200,gig,"Gig created successfully"));
})

const updateGig = asyncHandler(async(req,res) => {
    const providerId = req.params.providerId as string;
    const userId = req.user._id;

  const {gig} =  await gigUpdateService(req.body,req.files,providerId,userId);
  if(gig){
    return res.status(200).json(new ApiResponse(200,gig,"Gig updated successfully"));
  }
})

const getGigsDetails = asyncHandler(async(req,res) => {
  const userId = req.user._id
 const {totalGigs,hasGigs,gigs} = await getProviderGigInfoService(userId);

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


const getAllGigsByCategory = asyncHandler(async(req,res) => {
  const {slug} = req.params

  if(!slug || typeof(slug) !== "string")
  {
    throw new ApiError(400,"Category Id is required")
  }
  const {gigs} = await getAllGigsByCategoryService(slug);

  return res.status(200).json(new ApiResponse(200,gigs,"All gigs fetched successfully"));
})

const getAllMyGigs = asyncHandler(async(req,res) => {
  const providerId = req.params.providerId as  string;
  if(!providerId)
  {
    throw new ApiError(400,"Provider Id is required");
  }
  const {gigs}= await getAllMyGigService(providerId);

  return res.status(200).json(new ApiResponse(200,gigs,"Gigs fetched successfully"));
})


const deleteGig = asyncHandler(async(req,res) => {
  const gigId = req.params.gigId as string;
  console.log("Here is gidID: ",gigId);
  if(!gigId){
    throw new ApiError(400,"Gig id is missing");
  }
  await deleteGigService(gigId);
  return res.status(200).json(new ApiResponse(200,{},"Gig deleted successfully"));
})

const getGigDetailsByGigId = asyncHandler(async(req,res) => {
  const gigId = req.params.gigId as string;
  if(!gigId)
  {
    throw new ApiError(400,"Gig id is required");
  }
 const {gig} = await getGigDetailsByGigIdService(gigId);
 return res.status(200).json(new ApiResponse(200,gig,"Gig details fetched successfully"));
})

const getLocationSuggestions = asyncHandler(async(req,res) => {
  const query = req.query.q as string;
  console.log("Query: ",query);
  const locations = await searchLocations(query);

  return res.status(200).json(new ApiResponse(200,locations,"Locations fetched successfully"));
}) 
export {createGig,updateGig,getGigsDetails,providerDashBoardStats,getAllGigsByCategory,getAllMyGigs,deleteGig,getGigDetailsByGigId,getLocationSuggestions};