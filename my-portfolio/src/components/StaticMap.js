import React from "react";
import Image from "next/image";

const StaticMap = ({
  address = "Dream InReality, Sellindge, Ashford, UK",
  width = 600,
  height = 400,
  zoom = 15,
}) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="w-full h-96 rounded-2xl shadow-2xl bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-sky-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <p className="text-sky-700 font-medium mb-2">Static Map</p>
          <p className="text-sky-600 text-sm">{address}</p>
          <p className="text-xs text-sky-500 mt-3">
            Add Google Maps API key to enable interactive map
          </p>
        </div>
      </div>
    );
  }

  // Construct Static Maps API URL
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
    address
  )}&zoom=${zoom}&size=${width}x${height}&markers=color:0x0ea5e9%7C${encodeURIComponent(
    address
  )}&key=${apiKey}&style=feature:poi%7Celement:all%7Cvisibility:simplified&style=feature:all%7Celement:geometry.fill%7Csaturation:-20%7Clightness:10`;

  return (
    <div className="w-full h-96 rounded-2xl shadow-2xl overflow-hidden relative">
      <Image
        src={staticMapUrl}
        alt={`Map showing ${address}`}
        width={width}
        height={height}
        className="w-full h-full object-cover"
        priority
        onError={(e) => {
          console.error("Static map failed to load:", e);
          e.target.style.display = "none";
        }}
      />
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
        <p className="text-sm font-medium text-gray-800">{address}</p>
        <p className="text-xs text-gray-600">Static Map View</p>
      </div>
    </div>
  );
};

export default StaticMap;
