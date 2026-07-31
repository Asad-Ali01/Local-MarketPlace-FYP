import { asyncHandler } from "../../../utils/asynHandler";
import { Category } from "../../category/models/category.model";

const getAllCategoriesForHomePageService = async() => {
   const allCategories = await Category.aggregate([
      {
         $lookup:{
            from:"subcategories",
            localField:"_id",
            foreignField:"category",
            as:"subCategories"
         }
      }
   ]);
   return {allCategories}
}

export {getAllCategoriesForHomePageService}