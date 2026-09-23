import { getGigsWithCursorService, searchServicesService } from "../services/search.service";
import { ApiResponse } from "../utils/ApiRespose";
import { asyncHandler } from "../utils/asynHandler";

const searchServices = asyncHandler(async(req,res) => {
    const q = req.query.q as string;
    console.log("Query is: ",q," type of q is: ",typeof(q));
    const suggestions = await searchServicesService(q);

    return res.status(200).json(new ApiResponse(200,suggestions,"Sub Categories fetched successfully."))
})

const getGigsWithCursor = asyncHandler(async(req,res) => {
   const limit = Number(req.query.limit) || 20;

   const cursor = req.query.cursor ? JSON.parse(String(req.query.cursor)) : undefined;

   const result = await getGigsWithCursorService({
    limit,
    cursor
});

return res.status(200).json(
    new ApiResponse(200,{
        gigs:result.gigs,
        pagination:{
            hasMore:result.hasMore,
            nextCursor:result.nextCursor
        }
    })
);
})
export {searchServices,getGigsWithCursor};