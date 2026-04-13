import { User } from "../modules/user/models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asynHandler";
import jwt, { JwtPayload } from 'jsonwebtoken';
const verifyJWT = asyncHandler(async(req,_,next) => {
    const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer","").trim();
   
    if(!token){
        throw new ApiError(401,"Unauthorized request");
    }
     if(!process.env.ACCESS_TOKEN_SECRET){
        throw new ApiError(500,"Access token secret is undefined");
    }
   try {
     const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET) as JwtPayload;
     if(!decodedToken){
         throw new ApiError(401,"Invalid access token");
     }
     const user = await User.findById(decodedToken._id).select("-password -refreshToken");
     if(!user){
         throw new ApiError(401,"Invalid access token");
     }
     req.user = user;
     next();
   } catch (error:any) {
    if(error.name === "TokenExpiredError"){
        throw new ApiError(401,"Access token expired");
    }
    throw new ApiError(401,"Invalid access token");
   }
})

export {verifyJWT}