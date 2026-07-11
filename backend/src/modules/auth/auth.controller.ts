import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiRespose";
import { asyncHandler } from "../../utils/asynHandler";
import { cookieOptions } from "../../utils/cookieOptions";
import { logoutService, refreshAcessTokenService } from "./auth.service";

export const refreshAccessToken = asyncHandler(async(req,res) => {
    const refreshtoken = req.cookies.refreshToken;
    console.log("Here is refreshToken: ",refreshtoken);
    const {user,accessToken,refreshToken} = await refreshAcessTokenService(refreshtoken);
    return res.status(200)
    .cookie("accessToken",accessToken,cookieOptions)
    .cookie("refreshToken",refreshToken,cookieOptions)
    .json(new ApiResponse(200,{user,accessToken},"Access token refresh successfully"))
})


export const Logout = asyncHandler(async(req,res) => {
  const userId = req.user._id;
  console.log("TYpe of userID: ",typeof userId);
   if(!userId  || typeof userId !== "object"){
    throw new ApiError(400,"User id is required to logout ");
  }
  const {user} = await logoutService(userId)
  res.clearCookie("accessToken",cookieOptions);
  res.clearCookie("refreshToken",cookieOptions)
  return res.status(200).json(new ApiResponse(200,{},"User logout successfully"))
})