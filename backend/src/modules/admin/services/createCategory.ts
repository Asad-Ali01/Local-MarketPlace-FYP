import { ApiError } from "../../../utils/ApiError";
import { uploadToCloudinary } from "../../../utils/cloudinary";
import { Category } from "../models/category.model";

const createCategoryService = async(data:{name:string},userId:string,file:any) => {
    const {name} = data;
    if(!name){
        throw new ApiError(400,"Category name is required");
    }


    let iconFileUploadToCloudinary;
    if(!file){
        throw new ApiError(400,"Icon file is missing");
    }
    else{
       iconFileUploadToCloudinary = await uploadToCloudinary(file,userId,"category/icons");
    }
    const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")
    const category = await Category.create({
        name,
        slug,
        icon:iconFileUploadToCloudinary
    })
    return {category};
}

export {createCategoryService};