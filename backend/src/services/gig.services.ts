import { Types } from "mongoose";
import { ApiError } from "../utils/ApiError";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary";
import { createGigType, LocationType, updatedFields } from "../types/gig.types";
import { SubCategory } from "../models/subCategory.model";
import { Gig, IImage } from "../models/gig.model";
import { Order } from "../models/order.model";
import { Review } from "../models/review.model";
import { Message } from "../models/message.model";
 const createGigService = async (
  data: createGigType,
  images: Express.Multer.File[],
  avatar:Express.Multer.File[],
  userId: Types.ObjectId,
) => {
  let { title, description, location, status, targetSlots,category,subCategory,startingPrice,tags } = data;
  let parsedTags:string[] =[];

  if(tags){
    parsedTags = JSON.parse(tags)
  }
  let price : number | undefined;
  if(startingPrice != undefined){
    if(Number(startingPrice) <= 0){
      throw new ApiError(400,"Starting price must be greater than 0")
    }
    price = Number(startingPrice)
  }

  const totalGigs = await Gig.countDocuments({ provider: userId });
  if (totalGigs >= 2) {
    throw new ApiError(
      400,
      "You already has two Gigs. More than 2 gigs are not allowed",
    );
  }
  //Parse the incoming target slots array (e.g 0 ,2)
  const slotsToAssign = targetSlots
    ? typeof targetSlots == "string"
      ? JSON.parse(targetSlots)
      : targetSlots
    : [];
  const parsedLocation : LocationType = JSON.parse(location);
  const hasValidText = [title, description, status,location].every(
    (d) => typeof d === "string" && d.trim().length > 0,
  );

  if (!hasValidText) {
    throw new ApiError(
      400,
      "All fields (title, description, status,starting price and location) are required",
    );
  }
 
  if(
   !parsedLocation.lng  ||
   !parsedLocation.lat  ||
    !parsedLocation.city  || 
    !parsedLocation.locationName
  ){
    throw new ApiError(400,"All Location fields are required");
  }
  //    Uploaded Images
  let uploadedImagesToCloudinary: IImage[] = [];
  let fixedLocation = {
    type:"Point",
    locationName:parsedLocation.locationName,
    city:parsedLocation.city,
    coordinates:[Number(parsedLocation.lng),Number(parsedLocation.lat)]
  }
  if (images && images.length > 0) {
    const uploadedImagesPromises = images.map(async (file, arrayIndex) => {
      const targetSlot = slotsToAssign[arrayIndex];
      if (targetSlot == undefined) {
        throw new ApiError(
          400,
          `Missing slot assignment for file at index ${arrayIndex}`,
        );
      }
      const result = await uploadToCloudinary(file, userId, "gig/images");
      return {
        url: result?.url,
        public_id: result?.public_id,
        slot: targetSlot,
      };
    });
    uploadedImagesToCloudinary = (await Promise.all(uploadedImagesPromises))
      .filter(
        (img): img is IImage =>
          img.url !== undefined && img.public_id !== undefined,
      )
      .sort((a, b) => a.slot - b.slot);
  }


   let avatarUpload;

if (avatar && avatar.length > 0) {
    avatarUpload = await uploadToCloudinary(
        avatar[0],
        userId,
        "gig/avatar"
    );
}

  const gig = await Gig.create({
    avatar:avatarUpload,
    provider: userId,
    title,
    description,
    status,
    location:fixedLocation,
    images: uploadedImagesToCloudinary,
    category,
    subCategory,
    tags:parsedTags,
    startingPrice:price
  });

  return { gig };
};



const deleteGigService = async(gigId:string) => {
    const gig = await Gig.findById(gigId);

    if(!gig){
        throw new ApiError(404,"Gig not found");
    }
    await gig.deleteOne();

    return;
}




 const getAllGigsByCategoryService = async(slug:string) => {

    const subCategoryId = await SubCategory.findOne({slug})
    if(!subCategoryId){
        throw new ApiError(400,"Category not found");
    }
   const gigs =  await Gig.find({subCategory:subCategoryId._id}).populate("provider","name").populate("subCategory","name");
//    console.log("Here is gigs: ",gigs[0].location.coordinates)
    // const coordinates = gigs[0].location.coordinates
//    const {fullAddress,city} = await getPlaceName(coordinates[1],coordinates[0]);
   return {gigs};
}

 const getAllMyGigService = async(providerId:string) => {
   const gigs = await Gig.find({provider:providerId});
   if(gigs.length === 0){
    throw new ApiError(400,"No gigs found");
   }
   return {gigs};
}

const getProviderGigInfoService = async(providerId:Types.ObjectId) => {
    console.log("Here is providerId: ",providerId )
    const totalGigs = await Gig.countDocuments({
        provider:providerId
    });
    const gigs = await Gig.find({provider:providerId}).populate("provider","name").sort({createdAt:-1});
    const hasGigs = totalGigs > 0;
    
    return {totalGigs,hasGigs,gigs};
}

 const getGigDetailsByGigIdService = async(gigId:string) => {
   const gig = await Gig.findById(gigId).populate("provider","name").populate("category","name").populate("subCategory","name");
   if(!gig){
    throw new ApiError(404,"Gig not found");
   }
    return {gig};
}

const providerDashboardStatsService = async(providerId:string) => {
    const totalGigs = await Gig.countDocuments({provider:providerId});
    const activeOrders = await Order.countDocuments({
        provider:providerId,
        status:{  $in: ["pending","in_progress"]   }
    });
    const completedOrders = await Order.countDocuments({
        provider:providerId,
        status:"completed"
    })
    // Total earnings by all gigs
    const orders = await Order.find({
        provider:providerId,
        status:"completed"
    });
   
   const totalEarnings = orders.reduce((acc,order) => {
      return  acc + order.price;
    },0)

    const ratings = await Review.find({provider:providerId});

    const totalRating = ratings.reduce((acc,rating) => {
        return acc + rating.rating
    },0)
    const reviews = ratings.length;
    const averageRating = reviews > 0 ? totalRating / reviews : 0;  // if review is 0 then 0 /0 Nan
    
    const unreadMessages =  await Message.countDocuments({
        receiver:providerId,
        isRead:false
    })

    const draftGigs = await Gig.countDocuments({
        status:"draft"
    })
     const publishedGigs = await Gig.countDocuments({
        status:"published"
    })
    return{
        totalGigs,
        activeOrders,
        completedOrders,
        totalEarnings,
        averageRating,
        unreadMessages
    }
}


const gigUpdateService = async (
  data: any,
  files: any,
  providerId: string,
  userId: Types.ObjectId,
) => {
  let { title, description, location, status, targetSlots } = data;
  //Array of slot of images
  const slotsToUpdate: number[] = targetSlots
    ? typeof targetSlots === "string"
      ? JSON.parse(targetSlots)
      : targetSlots
    : undefined;
  //Checking if anything update for text
  const hasTextUpdate = [title, description, status].some(
    (field) => typeof field === "string" && field.trim().length > 0,
  );
  //Checking does files are coming from frontend
  const hasFiles = files && files.length > 0;
  //Checking if nothing to update
  if (!hasTextUpdate && !location && !hasFiles) {
    throw new ApiError(400, "Nothing to update");
  }

  let uploadImages: IImage[] = [];
  const updatedFields: updatedFields = {};
  let parsedLocation: any;

  const gigExist = await Gig.findById(providerId);

  if (!gigExist) {
    throw new ApiError(404, "Gig deos not exist");
  }
  // The images that already exists in database
  let currentImages = [...(gigExist.images || [])];
  if (files && files.length > 0) {
    const mappedReturn = files.map(async (file: any, arrayIndex: number) => {
      const targetSlot = slotsToUpdate[arrayIndex];
      if (targetSlot == undefined) {
        throw new ApiError(
          400,
          `Missing target slots for file at index ${arrayIndex}`,
        );
      }

      const found = currentImages.find((c) => c.slot === targetSlot);
      if (found) {
        await deleteFromCloudinary(found.public_id);
      }

      const result = await uploadToCloudinary(file, userId, "gig/images");
      return {
        url: result?.url,
        public_id: result?.public_id,
        slot: targetSlot,
      };
    });
    uploadImages = await Promise.all(mappedReturn);

    for (const newImg of uploadImages) {
      // Drop old image which matched the updated image slot
      currentImages = currentImages.filter((img) => img.slot != newImg.slot);

      // Push new Img to currentImages
      currentImages.push(newImg);
    }

    updatedFields.images = currentImages.sort((a, b) => a.slot - b.slot);
  }
  if (location) {
    try {
      parsedLocation =
        typeof location == "string" ? JSON.parse(location) : location;
      location = {
        type: "Point",
        coordinates: [Number(parsedLocation.lng), Number(parsedLocation.lat)],
      };
    } catch (error) {
      throw new ApiError(400, "Invalid location format");
    }
  }

  if (title) updatedFields.title = title;
  if (description) updatedFields.description = description;
  if (status) updatedFields.status = status;
  if (location) updatedFields.location = location;

  const gig = await Gig.findByIdAndUpdate(
    providerId,
    {
      $set: updatedFields,
    },
    { new: true, runValidators: true },
  );

  return { gig };
};


export {createGigService,deleteGigService,getAllMyGigService,getAllGigsByCategoryService,gigUpdateService,providerDashboardStatsService,getProviderGigInfoService,getGigDetailsByGigIdService}