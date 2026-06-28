import { Types } from "mongoose"
import { Gig } from "../models/gig.model"

export const getGigDetailsService = async(userId:Types.ObjectId) => {
    const totalGigs = await Gig.countDocuments({
        provider:userId
    });
    const gigs = await Gig.find({provider:userId}).populate("provider","name").sort({createdAt:-1});
    const hasGigs = totalGigs > 0;
    
    return {totalGigs,hasGigs,gigs};
}