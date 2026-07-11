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

export interface ICreateGigResponse{
    provider: string,
    title:string;
    description:string;
    status:"draft" | "published"
    location:ILocation
    image:IImage[]
}
export interface ICreateRequest{
    title:string;
    description:string;
    status:"draft" | "published"
    location:string;
    category:string;
    subcategory:string;
}
export interface IGetGigDetailsResponse{
    data:{
    totalGigs:number;
    hasGigs:boolean;
    gigs:IGig[];
    }
  
}
export interface IProviderDashboardTopCardRequest{
    providerId:string;
}

export interface IProviderDashboardTopCardResponse{
    data:{
          totalGigs:number
        activeOrders:number
        completedOrders:number
        totalEarnings:number
        averageRating:number
        unreadMessages:number
    }
}