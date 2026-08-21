import type { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { createMarkerIcon } from "@/utils/mapUtils";

type LocationSectionType = {
  providerLocation: {
    coordinates: [number, number];
  };
  providerName: string;
  gigTitle: string;
};

type FitMapBoundsProps = {
  providerLatLng: LatLngExpression;
  clientLocation: {
    lat: number;
    lng: number;
  } | null;
};

function FitMapBounds({
  providerLatLng,
  clientLocation,
}: FitMapBoundsProps) {
  const map = useMap();

  useEffect(() => {
    if (!clientLocation) return;

    const bounds = L.latLngBounds([
      providerLatLng,
      [clientLocation.lat, clientLocation.lng],
    ]);

    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 13,
    });
  }, [map, clientLocation, providerLatLng]);

  return null;
}

export default function LocationSection({
  providerLocation,
  providerName,
  gigTitle,
}: LocationSectionType) {
  const [clientLocation, setClientLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // MongoDB GeoJSON: [longitude, latitude]
  // Leaflet: [latitude, longitude]
  const providerLatLng: LatLngExpression = [
    providerLocation.coordinates[1],
    providerLocation.coordinates[0],
  ];

  const getMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setClientLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        setIsGettingLocation(false);
        toast.success("Your location has been found.");
      },
      (error) => {
        setIsGettingLocation(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error("Location permission was denied.");
            break;

          case error.POSITION_UNAVAILABLE:
            toast.error("Your location is currently unavailable.");
            break;

          case error.TIMEOUT:
            toast.error("Getting your location timed out.");
            break;

          default:
            toast.error("Unable to get your location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const openGoogleMaps = () => {
    if (!clientLocation) {
      toast.error("Please show your location first.");
      return;
    }

    const origin = `${clientLocation.lat},${clientLocation.lng}`;

    const destination = `${providerLocation.coordinates[1]},${providerLocation.coordinates[0]}`;

    const url =
      `https://www.google.com/maps/dir/?api=1` +
      `&origin=${encodeURIComponent(origin)}` +
      `&destination=${encodeURIComponent(destination)}` +
      `&travelmode=driving`;

    window.open(url, "_blank");
  };

  return (
    <div className="space-y-4">
      <MapContainer
        center={providerLatLng}
        zoom={13}
        style={{
          height: "500px",
          width: "100%",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Automatically fit both locations */}
        <FitMapBounds
          providerLatLng={providerLatLng}
          clientLocation={clientLocation}
        />

        {/* Provider location */}
        <Marker
          position={providerLatLng}
          icon={createMarkerIcon("#EF4444")}
        >
          <Popup>
            <strong>{providerName}</strong>
            <br />
            {gigTitle}
          </Popup>
        </Marker>

        {/* Client location */}
        {clientLocation && (
          <Marker
            position={[
              clientLocation.lat,
              clientLocation.lng,
            ]}
          >
            <Popup>Your Location</Popup>
          </Marker>
        )}
      </MapContainer>

      <div className="flex gap-3">
        {!clientLocation ? (
          <button
            onClick={getMyLocation}
            disabled={isGettingLocation}
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isGettingLocation
              ? "Getting your location..."
              : "Show My Location"}
          </button>
        ) : (
          <button
            onClick={openGoogleMaps}
            className="rounded-md bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          >
            Get Directions
          </button>
        )}
      </div>
    </div>
  );
}