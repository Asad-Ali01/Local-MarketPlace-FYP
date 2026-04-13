import { ApiResponse } from "../../../utils/ApiRespose";
import { asyncHandler } from "../../../utils/asynHandler";
import { adminLoginService } from "../services/adminLogin.service";
import { cookieOptions } from "../../../utils/cookieOptions";
const adminLogin = asyncHandler(async(req,res) => {
    const {safeUser,accessToken,refreshToken} = await adminLoginService(req.body);

    return res
    .status(200)
    .cookie("accessToken",accessToken,cookieOptions)
    .cookie("refreshToken",refreshToken,cookieOptions)
    .json(new ApiResponse(200,{user:safeUser,accessToken},"Admin login successfully"))
})


export {adminLogin};