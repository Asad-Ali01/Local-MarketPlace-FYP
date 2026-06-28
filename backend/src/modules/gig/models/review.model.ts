import mongoose,{mongo, Types} from "mongoose";

interface IReview extends Document{
    user:mongoose.Types.ObjectId;
    gig:mongoose.Types.ObjectId;
    rating:number;
    comment:string;

    
}

const reviewSchema = new mongoose.Schema<IReview>({
    user:{
        type: Types.ObjectId,
        ref:"User",
        required:true
    },
    gig:{
        type:Types.ObjectId,
        ref:"Provider",
        required:true

    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5

    },
    comment:{
        type:String,
        required:true
    }
})


export const Review = mongoose.model<IReview>("Review",reviewSchema);