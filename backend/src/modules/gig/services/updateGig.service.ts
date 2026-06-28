import { Types } from "mongoose";
import { ApiError } from "../../../utils/ApiError";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../../../utils/cloudinary";
import { IImage, Gig } from "../models/gig.model";

type updatedFields = {
  title?: string;
  description?: string;
  status?: string;
  location?: {
    type: "Point";
    coordinates: [number, number];
  };
  images?: IImage[];
};

export const updateGigService = async (
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
