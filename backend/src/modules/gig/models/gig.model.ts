import mongoose, { Types } from "mongoose";
import { IAvatar, ILocation } from "../../user/models/user.model";


export interface IImage{
    url:string;
    public_id:string;
    slot:number;
}

interface ICategory{
    name:string,
    slug:string,
}
interface ISubCategory{
     name:string,
    slug:string,
    categort:Types.ObjectId
}
export interface IGig{
    avatar:IAvatar
    provider:Types.ObjectId;
    title:string;
    description:string;
    location:ILocation,
    status:"draft" | "published";
    rating:number;
    totalReviews:number;
    totalOrders:number;
    images?:IImage[];
   category:Types.ObjectId;
   subCategory:Types.ObjectId;
    startingPrice?:number;
    tags:[string] 
}
const gigAvatarSchema = new mongoose.Schema({
    url:{
        type:String
    },
    public_id:{
        type:String
    }
})
const imagesSchema = new mongoose.Schema<IImage>({
    url:{
        type:String,
    },
    public_id:{
        type:String
    },
    slot:{
        type:Number
    }
})
const gigSchema = new mongoose.Schema<IGig>({
    avatar:gigAvatarSchema,
    provider:{
        type:Types.ObjectId,
        required:true,
        ref:"User"
    },
 
    title:{
        type:String,
        required:true,
        min:4,
        max:80
    },
    description:{
        type:String,
        required:true,
        min:50,
        max:1000
    },
    images:[imagesSchema],
    location:{
       type:{
        type:String,
        enum:["Point"],
       required:true 
       },
       coordinates:{
        type:[Number],
        required:true
       }
    },
    status:{
        type:String,
        enum:["draft","published"],
        default:"draft"
    },
    rating:{
        type:Number,
        default:0
    },
    totalOrders:{
        type:Number,
        default:0

    },
    totalReviews:{
        type:Number,
        default:0
    },
    category:{
        type:Types.ObjectId,
        ref:"Category",
        required:true
    },
    subCategory:{
        type:Types.ObjectId,
        ref:"SubCategory",
        required:true
    },
    startingPrice:{
        type:Number,
        default:null
    },
    tags:[
        {
            type:String,
            trim:true,
            lowercase:true
        }
    ]
 
},{timestamps:true})
// For fast sorting
gigSchema.index({
        createdAt:-1
})
// Used for scanning gigs fast 
gigSchema.index({
    provider:1
})

gigSchema.index({
    category:1
})

gigSchema.index({
    subCategory:1
})

gigSchema.index({
    location:"2dsphere"
})
export const Gig = mongoose.model<IGig>("Gig",gigSchema);