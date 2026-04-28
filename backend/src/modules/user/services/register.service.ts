import { ApiError } from "../../../utils/ApiError";
import { User } from "../models/user.model";
import { Types } from "mongoose";
import { uploadToCloudinary } from "../../../utils/cloudinary";
export const registerUserService = async (data: any, files: any) => {
  const { name, email, password, confirmPassword, role, location } = data;

  const allowedRoles = ["client", "provider"];
  
  if (!allowedRoles.includes(role)) {
    throw new ApiError(400, "Invalid role. Must be 'client' or 'provider'");
  }
  
  const normalizedRole = role;
  const uploadedFiles = (files || {}) as Record<string, Express.Multer.File[]>;
  if ([name, email, password, confirmPassword].some((field) => !field.trim())) {
    throw new ApiError(400, "All fields are required");
  }
  if (normalizedRole === "provider" && !location) {
    throw new ApiError(400, "All fields are required");
  }
  if (password !== confirmPassword) {
    throw new ApiError(400, "Password do not match");
  }
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  if (
    normalizedRole === "provider" &&
    (!uploadedFiles.avatar || !uploadedFiles.front || !uploadedFiles.back)
  ) {
    throw new ApiError(400, "All files are required");
  }

  const userId = new Types.ObjectId();
  let avatarUpload;
  let frontUpload;
  let backUpload;

  if (uploadedFiles.avatar?.[0]) {
    avatarUpload = await uploadToCloudinary(uploadedFiles.avatar[0], userId, "avatar");
  }

  if (normalizedRole === "provider") {
    frontUpload = await uploadToCloudinary(
      uploadedFiles.front[0],
      userId,
      "identityCard/front",
    );
    backUpload = await uploadToCloudinary(
      uploadedFiles.back[0],
      userId,
      "identityCard/back",
    );
  }

  if (normalizedRole === "provider" && (!avatarUpload || !frontUpload || !backUpload)) {
    throw new ApiError(500, "Failed to get files data");
  }

  let parsedLocation: any;
  if (normalizedRole === "provider") {
    try {
      parsedLocation = typeof location === "string" ? JSON.parse(location) : location;
    } catch {
      throw new ApiError(400, "Invalid location format");
    }
  }
  const providerLocation =
    normalizedRole === "provider"
      ? {
          type: "Point",
          coordinates: [Number(parsedLocation.lng), Number(parsedLocation.lat)]
        }
      : undefined;


  const user = await User.create({
    _id: userId,
    name,
    password,
    email,
    role: normalizedRole,
    ...(providerLocation ? { location: providerLocation } : {}),
    avatar: avatarUpload,
    ...(normalizedRole === "provider"
      ? {
          identityCard: {
            front: frontUpload,
            back: backUpload,
          },
        }
      : {}),
  });

  return user;
};
