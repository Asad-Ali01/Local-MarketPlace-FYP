import { Message } from "../../chat/models/message.model";
import { Gig } from "../models/gig.model"
import { Order } from "../models/order.model";
import { Review } from "../models/review.model";

export const providerDashboardStatsService = async(providerId:string) => {
    const totalGigs = await Gig.countDocuments({provider:providerId});
    const activeOrders = await Order.countDocuments({
        provider:providerId,
        status:{  $in: ["pending","in_progress"]   }
    });
    const completedOrders = await Order.countDocuments({
        provider:providerId,
        status:"completed"
    })
    // Total earnings by all gigs
    const orders = await Order.find({
        provider:providerId,
        status:"completed"
    });
   
   const totalEarnings = orders.reduce((acc,order) => {
      return  acc + order.price;
    },0)

    const ratings = await Review.find({provider:providerId});

    const totalRating = ratings.reduce((acc,rating) => {
        return acc + rating.rating
    },0)
    const reviews = ratings.length;
    const averageRating = reviews > 0 ? totalRating / reviews : 0;  // if review is 0 then 0 /0 Nan
    
    const unreadMessages =  await Message.countDocuments({
        receiver:providerId,
        isRead:false
    })

    const draftGigs = await Gig.countDocuments({
        status:"draft"
    })
     const publishedGigs = await Gig.countDocuments({
        status:"published"
    })
    return{
        totalGigs,
        activeOrders,
        completedOrders,
        totalEarnings,
        averageRating,
        unreadMessages
    }
}