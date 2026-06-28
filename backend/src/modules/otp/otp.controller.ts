import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiRespose";
import { asyncHandler } from "../../utils/asynHandler";
import { transporter } from "../../utils/emailSend";
import { User } from "../user/models/user.model";
import { OTP } from "./otp.model";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface OtpTokenPayload extends JwtPayload{
    email: string;
}
const otpSend = asyncHandler(async(req,res) => {
    const email = req.params.email as string;
    if(!email){
        throw new ApiError(400,"Email is required");
    }
    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(404,"User does not exist");
    }
    if(user.role == "admin"){
        throw new ApiError(400,"Cannot send otp")
    }
      // prevent OTP spam
  await OTP.deleteMany({ email });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp,10)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  
   await OTP.create({
        email,
        otp: hashedOtp,
        expiresAt
    })

    await transporter.sendMail({
        from:process.env.EMAIL,
        to:email,
        subject:"Password Reset OTP",
        text:`Your OTP Code is ${otp}. It expires in 5 minutes`
    })
   return res.status(201).json(new ApiResponse(201,{},"Otp send successfully"))
})

const otpVerify = asyncHandler(async(req,res) => {
    const {email,otp} = req.body;

    if(!otp){
        throw new ApiError(400,"OTP is requried");
    }
    if(!email){
        throw new ApiError(400,"Email is requried");

    }
    
    const record = await OTP.findOne({email});

    if(!record){
        throw new ApiError(400,"Invalid OTP")
    }

    const isMatch = await bcrypt.compare(otp,record?.otp);

    if(!isMatch){
        throw new ApiError(400,"Invalid OTP")
    }

    if(record.expiresAt.getTime() < Date.now()){
        throw new ApiError(400,"OTP is expired");
    }
    if(!process.env.ACCESS_TOKEN_SECRET){
        throw new ApiError(500,"ACCESS_TOKEN_SECRET is not defined");
    }
    const resetToken = jwt.sign(
        {email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"5m"}
    )
    return res.status(200).json(new ApiResponse(200,{resetToken},"OTP verified successfully"));
})

const resetPassword = asyncHandler(async(req,res) => {
    const {newPassword,confirmPassword} = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        throw new ApiError(400,"Token is missing")
    }
    if(!process.env.ACCESS_TOKEN_SECRET){
        throw new ApiError(500,"ACCESS_TOKEN_SECRET is not defined");
    }
    if(!newPassword || !confirmPassword){
        throw new ApiError(400,"New Password and confirm password both required");
    }
    if(newPassword !== confirmPassword){
        throw new ApiError(400,"New password and confirm password do not match");
    }
    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET) as OtpTokenPayload;

    const email = decoded.email;

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(404,"User not found");
    }

   
    user.password = newPassword;
    await user.save()
    OTP.deleteMany({email});
    return res.status(200).json(new ApiResponse(200,{},"Password reset successfully. Please login with new password"));
})

export {otpSend,otpVerify,resetPassword}