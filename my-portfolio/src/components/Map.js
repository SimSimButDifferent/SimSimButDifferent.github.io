import React, { useState, useCallback } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

const GoogleMap = ({
  address = "Dream InReality, Swan Lane, Sellindge, Ashford, UK",
}) => {
  const [mapError, setMapError] = useState(null);

  // API Key check
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Default center (approximate location for Sellindge, Ashford, UK)
  const center = { lat: 51.107477, lng: 1.015212 };

  // Map ID is required for AdvancedMarkerElement
  const mapId = "DEMO_MAP_ID";

  const handleMapError = useCallback((error) => {
    console.error("Failed to load Google Maps:", error);
    setMapError(
      "Failed to load Google Maps. Please check your API key and internet connection."
    );
  }, []);

  // Handle missing API key
  if (!apiKey) {
    return (
      <div className="h-full">
        <div className="flex flex-col bg-white rounded-2xl shadow-xl h-full">
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
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
              <p className="text-sky-700 font-medium mb-2">
                Google Maps API Key Required
              </p>
              <p className="text-sky-600 text-sm max-w-sm">
                To display the map, please add your Google Maps API key to the
                environment variables.
              </p>
              <p className="text-xs text-sky-500 mt-3">
                Visit{" "}
                <a
                  href="https://console.cloud.google.com/google/maps-apis/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-sky-700"
                >
                  Google Cloud Console
                </a>{" "}
                to get your API key
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle map errors
  if (mapError) {
    return (
      <div className="h-full">
        <div className="flex flex-col bg-white rounded-2xl shadow-xl h-full">
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 mx-auto text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <p className="text-red-700 font-medium mb-2">Map Loading Error</p>
              <p className="text-red-600 text-sm">{mapError}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="flex flex-col bg-white rounded-2xl shadow-xl h-full overflow-hidden">
        <div className="relative flex-1">
          <APIProvider
            apiKey={apiKey}
            onLoad={() => console.log("Google Maps API loaded successfully")}
            onError={handleMapError}
          >
            <Map
              style={{ width: "100%", height: "100%" }}
              defaultCenter={center}
              defaultZoom={15}
              mapId={mapId}
              gestureHandling="cooperative"
              disableDefaultUI={false}
              zoomControl={true}
              mapTypeControl={false}
              streetViewControl={false}
              fullscreenControl={true}
            >
              {/* AdvancedMarker with custom Pin styling */}
              <AdvancedMarker position={center} title={address}>
                <Pin
                  background="#0ea5e9"
                  borderColor="#ffffff"
                  glyphColor="#ffffff"
                  scale={1.2}
                />
              </AdvancedMarker>
            </Map>
          </APIProvider>

          {/* Address overlay */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg max-w-xs">
            <p className="text-sm font-medium text-gray-800">{address}</p>
            <p className="text-xs text-gray-600">📍 Interactive Map</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;
