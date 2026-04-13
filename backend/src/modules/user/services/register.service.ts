import { ApiError } from "../../../utils/ApiError";
import { User } from "../models/user.model";
import { ApiResponse } from "../../../utils/ApiRespose";
import { Types } from "mongoose";
import { uploadToCloudinary } from "../../../utils/cloudinary";
export const registerUserService = async (data: any, files: any) => {
  const { name, email, password, confirmPassword, role, location } = data;
  const allowedRoles = ["client", "provider"];

  if ([name, email, password, confirmPassword].some((field) => !field.trim())) {
    throw new ApiError(400, "All fields are required");
  }
  if (!location) {
    throw new ApiError(400, "All fields are required");
  }
  if (password !== confirmPassword) {
    throw new ApiError(400, "Password do not match");
  }
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  if (!files || !files.avatar || !files.front || !files.back) {
    throw new ApiError(400, "All files are required");
  }

  const userId = new Types.ObjectId();

  let avatarUpload = await uploadToCloudinary(
    files.avatar[0],
    userId,
    "avatar",
  );
  let frondUpload = await uploadToCloudinary(
    files.front[0],
    userId,
    "identity/front",
  );
  let backUpload = await uploadToCloudinary(
    files.back[0],
    userId,
    "identity/back",
  );
  if (!avatarUpload || !frondUpload || !backUpload) {
    throw new ApiError(500, "Failed to get files data");
  }
  const parsedLocation =
    typeof location === "string" ? JSON.parse(location) : location;

  const user = await User.create({
    _id: userId,
    name,
    password,
    email,
    role: allowedRoles.includes(role) ? role : "client",
    location: {
      type: "Point",
      coordinates: [
        Number(parsedLocation.coordinates?.[0]),
        Number(parsedLocation.coordinates?.[1]),
      ],
    },
    avatar: avatarUpload,
    identityCard: {
      front: frondUpload,
      back: backUpload,
    },
  });
  return user;
};
