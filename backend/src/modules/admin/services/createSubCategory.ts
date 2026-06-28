import { ApiError } from "../../../utils/ApiError";
import { Category } from "../models/category.model";
import { SubCategory } from "../models/subCategory.model";

const createSubCategoryService = async(data:{name:string,category:string}) => {
    const {name,category} = data;
    if(!name || !category){
        throw new ApiError(400,"Name and category are required");
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

export {createSubCategoryService};