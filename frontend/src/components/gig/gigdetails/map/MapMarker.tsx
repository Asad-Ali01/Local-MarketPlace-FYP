interface MapMarkerProps {
  color?: string;
  size?: number;
}

export default function MapMarker({ color = '#EF4444', size = 42 }: MapMarkerProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      {/* Marker Shape */}
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        fill={color}
      />

      {/* White Circle */}
      <circle cx="12" cy="9" r="3.2" fill="white" />
    </svg>
  );
}
