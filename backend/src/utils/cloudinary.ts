import {v2 as cloudinary} from 'cloudinary'
import { ApiError } from './ApiError';
import { Types } from 'mongoose';
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadToCloudinary = async (file: Express.Multer.File,userId:Types.ObjectId | string,folder:string) => {
    try {
        if(!file)   return undefined;
        const base64 = file.buffer.toString("base64");
        const dataUri = `data:${file.mimetype};base64,${base64}`;
        const result = await cloudinary.uploader.upload(dataUri,{
            folder:`users/${userId}/${folder}`,
            resource_type:"image"
        }) 
        return {
            url:result.secure_url,
            public_id:result.public_id
        };
    } catch (error) {
        console.log("Cloudinary error: ",error);
        throw new ApiError(500,"Failed to upload file on cloudinary");
    }
}

const deleteFromCloudinary = async(public_id:string) => {
    if(!public_id) return;
    try {
        const res = await cloudinary.uploader.destroy(public_id,{
            invalidate:true
        });
        return res;
    } catch (error) {
        console.log("Failed to delete file from cloudinary",error);
        throw new ApiError(500,"Failed to delete file from cloudinary");
    }
}

export {uploadToCloudinary,deleteFromCloudinary}