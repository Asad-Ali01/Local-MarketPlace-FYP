// Categories

import { createCategoryService, createSubCategoryService, deleteCategoryService, deleteSubCategoryService, getAllSubCategoriesService } from "../services/category.service";
import { getAllCategoriesService } from "../services/user.services";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiRespose";
import { asyncHandler } from "../utils/asynHandler";

const createCategory = asyncHandler(async(req,res) => {
  const userId = req.user._id.toString();
  if(!userId){
    throw new ApiError(401,"Only admin allowed to create category");
  }
  console.error("Here is Body: ",req.body);
  const {category} = await createCategoryService(req.body,userId,req.file);

  return res.status(200).json(new ApiResponse(200,{category},"Category created successfully"));
})

const createSubCategory = asyncHandler(async(req,res) => {
  console.log("Here is sub category data: ",req.body);
 const {subCategory} = await createSubCategoryService(req.body);

 return res.status(200).json(new ApiResponse(200,{subCategory},"Sub category created successfully"));
})


const getAllCategories = asyncHandler(async(req,res) => {
  const {allCategories} = await getAllCategoriesService();
  return res.status(200).json( new ApiResponse(200,allCategories,"Categories fetched successfully"));
})

const getAllSubCategories = asyncHandler(async(req,res) => {
  console.log("All sub categories ");
  const {subcategories} = await getAllSubCategoriesService();
  return res.status(200).json( new ApiResponse(200,subcategories,"SubCategories fetched successfully"));
})

const deleteCategory = asyncHandler(async(req,res) => {
  const categoryId = req.params.categoryId as string;
  if(!categoryId)
  {
    throw new ApiError(400,"Category Id is required");
  }
  await deleteCategoryService(categoryId);

  return res.status(200).json(new ApiResponse(200,{},"Category deleted successfully."));
})

const deleteSubCategory = asyncHandler(async(req,res) => {
  const subCategoryId = req.params.subCategoryId as string;
  if(!subCategoryId)
  {
    throw new ApiError(400,"Sub Category Id is required");
  }
  await deleteSubCategoryService(subCategoryId);
  return res.status(200).json(new ApiResponse(200,{},"Sub Category deleted successfully"));
})

export {createCategory,createSubCategory,getAllCategories,getAllSubCategories,deleteCategory,deleteSubCategory};