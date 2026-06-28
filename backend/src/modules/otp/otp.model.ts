import mongoose,{ Schema,Model,Document } from "mongoose";

interface IOtp{
    email:string;
    otp:string;
    expiresAt:Date;
}

const otpSchema = new Schema<IOtp>({
    email:{
        type:String,
        requried:true
    },
    otp:{
        type:String,
        requried:true      
    },
    expiresAt:{
        type:Date,
        required:true
    }
},{timestamps:true});

otpSchema.index({expiresAt:1},{expireAfterSeconds:0})

export const OTP =  mongoose.model<IOtp>('otp',otpSchema)