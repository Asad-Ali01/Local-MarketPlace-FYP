import { Types } from "mongoose";
import { Gig } from "../models/gig.model"
import { Category } from "../../category/models/category.model";
import { SubCategory } from "../../category/models/subCategory.model";
import { ApiError } from "../../../utils/ApiError";
import { getPlaceName } from "../../../utils/getPlacenameByLatAndLng";

export  const getAllGigsByCategoryService = async(slug:string) => {

    const subCategoryId = await SubCategory.findOne({slug})
    if(!subCategoryId){
        throw new ApiError(400,"Category not found");
    }
   const gigs =  await Gig.find({subCategory:subCategoryId._id}).populate("provider","name").populate("subCategory","name");
   console.log("Here is gigs: ",gigs[0].location.coordinates)
    const coordinates = gigs[0].location.coordinates
   const {fullAddress,city} = await getPlaceName(coordinates[1],coordinates[0]);
   return {gigs,fullAddress,city};
}