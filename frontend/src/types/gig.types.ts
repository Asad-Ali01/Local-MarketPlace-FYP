export type GigGalleryProps = {
  images: {
    url: string;
  }[];
};

export interface IImage {
  url: string;
  public_id: string;
  slot: number;
}
export interface ILocation {
  type: "Point";
  coordinates: [number, number];
  locationName:string;
  city:string;
}
export interface IAvatar {
  url: string;
  public_id: string;
}
export interface IProvider {
  name: string;
  _id:string;
}
export interface IGig {
  _id: string;
  provider: IProvider;
  title: string;
  description: string;
  status: "draft" | "published";
  location: ILocation;
  images: IImage[];
  avatar: IAvatar;
  category: {
    _id:string;
    name:string;
  };
  subCategory: {
    _id:string;
    name:string;
  };
  tags: string[];
  startingPrice: number | null;
  totalOrders: number;
  totalReviews: number;
  rating: number;
}

export interface ICreateGigResponse extends IGig {}
export interface ICreateRequest {
  title: string;
  description: string;
  status: "draft" | "published";
  location: string;
  category: string;
  subcategory: string;
}
export interface IGetMyGigDetailsResponse {
  data: {
    totalGigs: number;
    hasGigs: boolean;
    gigs: IGig[];
  };
}
export interface IProviderDashboardTopCardRequest {
  providerId: string;
}

export interface IProviderDashboardTopCardResponse {
  data: {
    totalGigs: number;
    activeOrders: number;
    completedOrders: number;
    totalEarnings: number;
    averageRating: number;
    unreadMessages: number;
  };
}

export interface IProviderGetAllGigsByCategoryResponse {

    data: ICreateGigResponse[];

}

interface IGetAllMyGigs extends Omit<IGig, "provider"> {
  provider: string;
}

export interface IGetAllMyGigsResponse {
  data: IGetAllMyGigs[];
}

export interface IGetLocationSuggestionsResponse {
  data: {
    id: number;
    displayName: string;
    latitude: number;
    longitude: number;
    city:string;
  }[];
}

export interface IGetGigDetailsById extends IGig{
  data:IGig
}