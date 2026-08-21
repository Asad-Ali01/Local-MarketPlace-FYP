import axios from "axios";
import { ApiError } from "./ApiError";


export async function searchLocations(query: string) {
    console.log("Location");
    // 1. Call Nominatim API
    const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
            params: {
                q: query,
                format: "jsonv2",
                limit: 5,
                countrycodes: "pk",
                addressdetails:1,
                "accept-language":"en"
            },
            headers: {
                "User-Agent": "Local Marketplace (asadllc255@gmail.com)"
            }
        }
    );

    const data = response.data;
    console.log("Data: ",data);
    // 2. No locations found
    if (!data.length) {
        throw new ApiError(404, "No locations found");
    }

    // 3. Convert Nominatim response into your own format
    return data.map((place: any) => ({
        id: place.place_id,
        displayName: place.display_name,
        city:place.address.city,
        latitude: Number(place.lat),
        longitude: Number(place.lon),
    }));
}