import axios from "axios";
import { ApiError } from "./ApiError";

export async function geocodeAddress(address:string){
  try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`,{
        params:{
            format:"json",
            q:address
        },
          headers:{
              "User-Agent":"Local Market Place (asadllc255@gmail.com)"
          }
      })
     const data = response.data

     if(!data.length){
        throw new ApiError(400,"Address not found");
     }

     return{
        latitude:Number(data[0].lat),
        longitude:Number(data[0].lon)
     }
  } catch (error) {
    throw new ApiError(500,"Failed to geocode address");
  }

    
}

