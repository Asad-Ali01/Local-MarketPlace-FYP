import mongoose, { Types } from "mongoose";

interface IOrder extends Document{
    gig:Types.ObjectId;
    provider:Types.ObjectId;
    client:Types.ObjectId;
    status: "pending" | "in_progress" | "delivered" | "completed" | "cancelled" | "revision";
    price:number;
    deadline?:Date;
    deliveryDate?:Date;
    requirements?:string;
    createdAt:Date;
    updatedAt:Date;
}

const orderSchema = new mongoose.Schema<IOrder>({
    gig:{
        type:Types.ObjectId,
        ref:"Gig",
        required:true

    },
    provider:{
          type:Types.ObjectId,
        ref:"User",
        required:true

    },
      client:{
          type:Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:["pending","in_progress" , "delivered" , "completed" , "cancelled" , "revision"],
        default:"pending"
    },
    price:{
        type:Number,
        required:true

    },
    deadline:{
        type:Date
    },
    deliveryDate:{
        type:Date
    },
    requirements:{
        type:String
    }

},{timestamps:true});

export const Order = mongoose.model<IOrder>("Order",orderSchema)