import { Types } from "mongoose"
import { Gig } from "../models/gig.model"

export const getGigBasicInfoService = async(providerId:Types.ObjectId) => {
    const totalGigs = await Gig.countDocuments({
        provider:providerId
    });
    const gigs = await Gig.find({provider:providerId}).populate("provider","name").sort({createdAt:-1});
    const hasGigs = totalGigs > 0;
    
    return {totalGigs,hasGigs,gigs};
}