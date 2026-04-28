import { User } from "../models/user.model";
import { ApiError } from "../../../utils/ApiError";
import { generateAccessAndRefreshToken } from "../../../utils/generateToken.service";

interface LoginUserPayload {
    email: string;
    password: string;
}

export const loginUserService = async (data: LoginUserPayload) => {
 let {email,password} = data;

    email = email?.toLowerCase().trim();
    if([email,password].some(field => typeof field !== "string" || !field.trim())){
        throw new ApiError(400,"All fields are required");
    }
    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(401,"Incorrect email or password");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401,"Incorrect email or password");
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