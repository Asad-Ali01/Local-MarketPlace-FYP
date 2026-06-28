export interface IImage{
    url:string;
    public_id:string;
    slot:number;
}
export interface ILocation{
  type:"Point",
  coordinates:[number,number]
}

export interface IGig{
    provider:{
        name:string
    };
    title:string;
    description:string;
    location:ILocation,
    status:"draft" | "published",
    rating:number;
    totalReviews:number;
    totalOrders:number;
    images?:IImage[];
}
export interface IGetGigDetailsResponse{
    data:{
    totalGigs:number;
    hasGigs:boolean;
    gigs:IGig[];
    }
  
}