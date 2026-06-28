import mongoose, { Types } from "mongoose";

export interface ISubCategory {
    name: string;
    slug: string;
    category: Types.ObjectId;
}

const subCategorySchema = new mongoose.Schema<ISubCategory>({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
},{timestamps:true});

export const SubCategory = mongoose.model<ISubCategory>(
    "SubCategory",
    subCategorySchema
);