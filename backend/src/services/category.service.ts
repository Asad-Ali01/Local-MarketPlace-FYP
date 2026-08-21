import mongoose from "mongoose";
import { Category } from "../models/category.model";
import { SubCategory } from "../models/subCategory.model";
import { ApiError } from "../utils/ApiError";
import { uploadToCloudinary } from "../utils/cloudinary";




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

const createSubCategoryService = async(data:{name:string,category:string}) => {
    const {name,category} = data;
    if(!name || !category){
        throw new ApiError(400,"Category and subcategory both are required");
    }

    // Check category exists
    const  categoryExists = await Category.findById(category);

    if(!categoryExists){
        throw new ApiError(404,"Category not found");
    }

    const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-");

    const subCategory = await SubCategory.create({
        name,
        slug,
        category:category
    });

    return {subCategory};
}


const deleteCategoryService = async(categoryId:string) => {
    const session = await mongoose.startSession();
   try {
    session.startTransaction();
  const deletedCategory = await Category.findByIdAndDelete(categoryId,{session});
  if(!deletedCategory)
  {
     throw new ApiError(404,"Category not found");
  }
 
  await SubCategory.deleteMany({category:categoryId},{session});
 await session.commitTransaction();
   } catch (error) {
   await session.abortTransaction();
   throw error;
   }finally{
   await session.endSession();
   }
 return;
}

const deleteSubCategoryService = async(subCategoryId:string) => {
   const subCategory = await SubCategory.findByIdAndDelete(subCategoryId);
   if(!subCategory)
   {
    throw new ApiError(404,"Sub Category not found");
   }
   return;
}

 const getAllCategoriesService = async() => {
   const categories = await Category.find().lean();
   return {categories};
}


 const getAllSubCategoriesService = async() => {
   const subcategories = await SubCategory.find().populate("category","name").lean()
   return {subcategories};
}

export {createCategoryService,createSubCategoryService,deleteCategoryService,deleteSubCategoryService,getAllCategoriesService,getAllSubCategoriesService}