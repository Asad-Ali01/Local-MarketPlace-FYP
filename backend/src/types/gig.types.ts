import { IImage } from "../models/gig.model";

export type createGigType = {
  title:string;
  description:string;
  location:string;
  status:"draft" | "published";
  targetSlots:[];
  category:string;
  subCategory:string;
  startingPrice:string;
  tags:string
}
export type LocationType = {
  
      lng:number;
      lat:number;

    city:string,
    locationName:string
  }

export  type updatedFields = {
  title?: string;
  description?: string;
  status?: string;
  location?: {
    type: "Point";
    coordinates: [number, number];
  };
  images?: IImage[];
};
