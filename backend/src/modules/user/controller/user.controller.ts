import { ApiResponse } from "../../../utils/ApiRespose";
import { asyncHandler } from "../../../utils/asynHandler";
import { loginUserService } from "../services/login.service";
import { registerUserService } from "../services/register.service";

import { cookieOptions } from "../../../utils/cookieOptions";



const registerUser = asyncHandler(async(req,res) => {

    await registerUserService(req.body,req.files);
    return res
    .status(200)
    .json( new ApiResponse(201,{},"User created successfully"))

} )

const loginUser = asyncHandler(async(req,res) => {
   const {user,accessToken,refreshToken} = await loginUserService(req.body);
    res
    .status(200)
    .cookie("accessToken",accessToken,cookieOptions)
    .cookie("refreshToken",refreshToken,cookieOptions)
    .json( new ApiResponse(200,{user,accessToken},"User login successfully"));

})

export {registerUser,loginUser}