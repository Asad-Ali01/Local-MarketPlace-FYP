import mongoose from "mongoose";

export interface IIcon {
    url: string;
    public_id: string;
}

export interface ICategory {
    name: string;
    slug: string;
    icon: IIcon;
}

const categorySchema = new mongoose.Schema<ICategory>({
    name: {
        type: String,
        required: true,
        unique: true,
    }, 
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    icon: {
        type:{
            url:{
                type:String,
                required:true
            },
            public_id:{
                type:String,
                required:true
            }
        },
        required:true
    }
},{timestamps:true});

export const Category = mongoose.model<ICategory>(
    "Category",
    categorySchema
);