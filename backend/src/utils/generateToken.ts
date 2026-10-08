
import { Types } from "mongoose";
import { ApiError } from "./ApiError";
import bcrypt from 'bcrypt';
import { User } from "../models/user.model";
export const generateAccessAndRefreshToken = async(userId: string | Types.ObjectId) => {
    try {
        const user = await User.findById(userId);

        if(!user){
            throw new ApiError(404,"Failed to find user");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        const hashedRefreshToken = await bcrypt.hash(refreshToken,10);
        await User.updateOne(
            { _id: user._id },
            { $set: { refreshToken: hashedRefreshToken } },
        );
        
        return {accessToken,refreshToken};
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        console.log("Here is error: ",error)
        throw new ApiError(500,"Something went wrong while generating access and refresh token");
    }
}