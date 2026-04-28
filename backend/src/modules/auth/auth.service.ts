import { ApiError } from "../../utils/ApiError"
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from "../user/models/user.model";
import { generateAccessAndRefreshToken } from "../../utils/generateToken.service";
import bcrypt from 'bcrypt'
export const refreshAcessTokenService = async(incomingRefreshToken:string) => {
    if(!incomingRefreshToken){
        throw new ApiError(401,"No refresh token found");
    }
    if(!process.env.REFRESH_TOKEN_SECRET){
        throw new ApiError(500,"Failed to load refresh token secret from env");
    }

    try {
        const decoded = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET) as JwtPayload;
        console.log("Decoded: ",decoded);
        const user = await User.findOne({_id:decoded._id});
        if(!user){
            throw new ApiError(401,"Invalid refresh token");
        }
        if(!user.refreshToken){
            throw new ApiError(401,"Invalid refresh token");
        }
        console.log("Incoming refreshToken: ",incomingRefreshToken," User refreshToken: ",user.refreshToken)
        const isTokenValid = await bcrypt.compare(incomingRefreshToken,user.refreshToken);
        console.log("IStokenValid: ",isTokenValid);
        if(!isTokenValid){
            throw new ApiError(401,"Invalid refresh token");
        }
        const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id);

        return {accessToken,refreshToken};

    } catch (error) {
           if(error instanceof ApiError){
            throw error;
           }
           throw new ApiError(500,"Server error")
    }
}