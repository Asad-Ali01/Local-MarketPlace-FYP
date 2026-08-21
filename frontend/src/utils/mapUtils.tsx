import MapMarker from "@/components/gig/gigdetails/map/MapMarker";
import { renderToStaticMarkup } from "react-dom/server";
import L from "leaflet";
export function createMarkerIcon(color: string) {
  return L.divIcon({
    html: renderToStaticMarkup(
      <MapMarker color={color} />
    ),

    className: "",

  });
}