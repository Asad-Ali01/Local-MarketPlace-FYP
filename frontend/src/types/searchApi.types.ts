import type { IGig } from "./gig.types"
export interface ICursor{
    createdAt:string;
    _id:string;
}
export interface IGetSearchGigs{
    data:{
        gigs:IGig[],
        pagination:{
            hasMore:boolean,
            nextCursor:ICursor | null
        }
    }
}