import { Category } from "../models/category.model"
import { SubCategory } from "../models/subCategory.model";

export const getAllCategoriesService = async() => {
   const categories = await Category.find().lean();
   return {categories};
}


export const getAllSubCategoriesService = async() => {
   const subcategories = await SubCategory.find().populate("category","name").lean()
   return {subcategories};
}