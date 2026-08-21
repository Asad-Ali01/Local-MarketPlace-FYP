
import { Types } from "mongoose";
import { uploadToCloudinary } from "../utils/cloudinary";

import { generateAccessAndRefreshToken } from "../utils/generateToken";
import { asyncHandler } from "../utils/asynHandler";
import { Category } from "../models/category.model";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";

interface LoginUserPayload {
    email: string;
    password: string;
}

const registerUserService = async (data: any, files: any) => {
  const { name, email, password, confirmPassword, role } = data;

  const allowedRoles = ["client", "provider"];

  if (!allowedRoles.includes(role)) {
    throw new ApiError(400, "Invalid role. Must be 'client' or 'provider'");
  }

  const normalizedRole = role;
  const uploadedFiles = (files || {}) as Record<string, Express.Multer.File[]>;
  if (
    [name, email, password, confirmPassword].some(
      (field) => typeof field === "string" && !field.trim(),
    )
  ) {
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
    avatarUpload = await uploadToCloudinary(
      uploadedFiles.avatar[0],
      userId,
      "users/avatar",
    );
  }

  if (normalizedRole === "provider") {
    frontUpload = await uploadToCloudinary(
      uploadedFiles.front[0],
      userId,
      "users/identityCard/front",
    );
    backUpload = await uploadToCloudinary(
      uploadedFiles.back[0],
      userId,
      "users/identityCard/back",
    );
  }

  if (
    normalizedRole === "provider" &&
    (!avatarUpload || !frontUpload || !backUpload)
  ) {
    throw new ApiError(500, "Failed to get files data");
  }

  const user = await User.create({
    _id: userId,
    name,
    password,
    email,
    role: normalizedRole,
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




 const loginUserService = async (data: LoginUserPayload) => {
 let {email,password} = data;

    email = email?.toLowerCase().trim();
    if([email,password].some(field => typeof field !== "string" || !field.trim())){
        throw new ApiError(400,"All fields are required");
    }
    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(400,"Incorrect email or password");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(400,"Incorrect email or password");
    }

    if(user.status !== "approved"){
        throw new ApiError(403,"Account not approved yet")
    }

    if(user.role === "admin"){
        throw new ApiError(401,"Incorrect email or password");
    }
    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id);
        console.log(refreshToken);

    const safeUser = await User.findById(user._id).select("-password -refreshToken -status")
    return{user:safeUser, accessToken,refreshToken};
}

const getAllCategoriesService = async() => {
   const allCategories = await Category.aggregate([
      {
         $lookup:{
            from:"subcategories",
            localField:"_id",
            foreignField:"category",
            as:"subCategories"
         }
      }
   ]);
   return {allCategories}
}


export {registerUserService,loginUserService,getAllCategoriesService}