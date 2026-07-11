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
}
export const createGigService = async (
  data: createGigType,
  files: Express.Multer.File[],
  userId: Types.ObjectId,
) => {
  let { title, description, address, status, targetSlots,category,subCategory } = data;

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
  console.log("Here is slotsToassign = :",typeof targetSlots);
  const hasValidText = [title, description, status,address].every(
    (d) => typeof d === "string" && d.trim().length > 0,
  );

  if (!hasValidText) {
    throw new ApiError(
      400,
      "All fields (title, description, status, and location) are required",
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
  let uploadedImages: IImage[] = [];
  console.log("Here is req.files:",files.length);
  if (files && files.length > 0) {
    const filesUploaded = files.map(async (file, arrayIndex) => {
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
    uploadedImages = (await Promise.all(filesUploaded))
      .filter(
        (img): img is IImage =>
          img.url !== undefined && img.public_id !== undefined,
      )
      .sort((a, b) => a.slot - b.slot);
  }
console.log("Here is uploaded Images: ",uploadedImages);
  const gig = await Gig.create({
    provider: userId,
    title,
    description,
    status,
    location,
    images: uploadedImages,
    category,
    subCategory
  });

  return { gig };
};
