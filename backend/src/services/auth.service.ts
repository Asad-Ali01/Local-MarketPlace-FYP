import { ApiError } from "../utils/ApiError"
import jwt, { JwtPayload } from 'jsonwebtoken';
import { generateAccessAndRefreshToken } from "../utils/generateToken";
import bcrypt from 'bcrypt'
import { Types } from "mongoose";
import { User } from "../models/user.model";

type resetPasswordType = {
    oldPassword:string;
    newPassword:string;
    confirmPassword:string;
}
export const refreshAcessTokenService = async(incomingRefreshToken:string) => {
    if(!incomingRefreshToken){
        throw new ApiError(401,"No refresh token found");
    }
    if(!process.env.JWT_REFRESH_SECRET){
        throw new ApiError(500,"Failed to load refresh token secret from env");
    }

    try {
        const decoded = jwt.verify(incomingRefreshToken,process.env.JWT_REFRESH_SECRET) as JwtPayload;
        console.log("Decoded: ",decoded);
        const user = await User.findOne({_id:decoded._id});
        if(!user){
            throw new ApiError(404,"User not found");
        }
        if(!user.refreshToken){
            throw new ApiError(401,"Refresh token not found");
        }
        console.log("Incoming refreshToken: ",incomingRefreshToken," User refreshToken: ",user.refreshToken)
        const isTokenValid = await bcrypt.compare(incomingRefreshToken,user.refreshToken);
        console.log("IStokenValid: ",isTokenValid);
        if(!isTokenValid){
            throw new ApiError(401,"Invalid refresh token");
        }
        const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id);
        const userObj = user.toObject();
        const {password,refreshToken:storedRefreshToken,...safeUser} = userObj
        return {user:safeUser,accessToken,refreshToken};

    } catch (error) {
           if(error instanceof ApiError){
            throw error;
           }
           throw new ApiError(500,"Server error")
    }
}


// Logout


const logoutService = async(userId:Types.ObjectId) => {
   console.log("ASad");
   const user = await User.findByIdAndUpdate(userId,{
    $unset: {refreshToken: 1}
   })
   return {user}
}

const resetPasswordService = async(userId:Types.ObjectId,data:resetPasswordType) => {
    const {confirmPassword,newPassword,oldPassword} = data;
    if(![confirmPassword,newPassword,oldPassword].every(d => typeof(d) == "string" && d.trim())){
        throw new ApiError(400,"All fields are required");
    }

    if(newPassword !== confirmPassword){
        throw new ApiError(400,"New password and confirm password do not match");
    }
    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(404,"User not found");
    }
   const isSamePassword = await bcrypt.compare(
    newPassword,
    user.password
);

if (isSamePassword) {
    throw new ApiError(400, "New password cannot be the same as the current password.");
}
    const isPasswordValid = await user?.isPasswordCorrect(oldPassword)
    if(isPasswordValid){
        user.password = newPassword;
        user.save();
    }
    return {};
}
export {logoutService,resetPasswordService}