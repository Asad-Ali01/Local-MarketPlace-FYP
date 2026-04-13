import { ApiResponse } from "../../utils/ApiRespose";
import { asyncHandler } from "../../utils/asynHandler";
import { cookieOptions } from "../../utils/cookieOptions";
import { refreshAcessTokenService } from "./auth.service";

export const refreshAccessToken = asyncHandler(async(req,res) => {
    const refreshtoken = req.cookies.refreshToken;
    const {accessToken,refreshToken} = await refreshAcessTokenService(refreshtoken);

    return res.status(200)
    .cookie("accessToken",accessToken,cookieOptions)
    .cookie("refreshToken",refreshToken,cookieOptions)
    .json(new ApiResponse(200,{accessToken},"Access token refresh successfully"))
})