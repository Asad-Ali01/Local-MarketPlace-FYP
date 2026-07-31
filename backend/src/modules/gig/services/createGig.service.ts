import { Types } from "mongoose";
import { ApiError } from "../../../utils/ApiError";
import { uploadToCloudinary } from "../../../utils/cloudinary";
import { type IImage, Gig } from "../models/gig.model";
import { geocodeAddress } from "../../../utils/geoCode";
type createGigType = {
  title:string;
  description:string;
  address:string;
  status:"draft" | "published";
  targetSlots:[];
  category:string;
  subCategory:string;
  startingPrice:string;
  tags:string
}
export const createGigService = async (
  data: createGigType,
  images: Express.Multer.File[],
  avatar:Express.Multer.File[],
  userId: Types.ObjectId,
) => {
  let { title, description, address, status, targetSlots,category,subCategory,startingPrice,tags } = data;
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
 
  const hasValidText = [title, description, status,address].every(
    (d) => typeof d === "string" && d.trim().length > 0,
  );

  if (!hasValidText) {
    throw new ApiError(
      400,
      "All fields (title, description, status,starting price and location) are required",
    );
  }
  //Setting location
  let location: any;
  try {
    // Getting (lon,lat) from address
    let latAndLon = await geocodeAddress(address);
    console.log("Lat and lon: ",latAndLon);
    location = {
      type: "Point" as const,
      coordinates: [Number(latAndLon.longitude), Number(latAndLon.latitude)],
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
  }

  //    Uploaded Images
  let uploadedImagesToCloudinary: IImage[] = [];

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
    location,
    images: uploadedImagesToCloudinary,
    category,
    subCategory,
    tags:parsedTags,
    startingPrice:price
  });

  return { gig };
};
