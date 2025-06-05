import React, { useState, useCallback, useMemo } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = ({ address = "Dream InReality, Sellindge, Ashford, UK" }) => {
  const [mapError, setMapError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // API Key check
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Map container style
  const containerStyle = useMemo(
    () => ({
      width: "100%",
      height: "400px",
      borderRadius: "1rem",
    }),
    []
  );

  // Default center (approximate location for Sellindge, Ashford, UK)
  const center = useMemo(
    () => ({
      lat: 51.1279,
      lng: 0.9781,
    }),
    []
  );

  // Map options
  const options = useMemo(
    () => ({
      disableDefaultUI: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      gestureHandling: "cooperative",
      styles: [
        {
          featureType: "all",
          elementType: "geometry.fill",
          stylers: [{ saturation: -20 }, { lightness: 10 }],
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
      ],
    }),
    []
  );

  // Libraries to load
  const libraries = useMemo(() => ["places", "geometry"], []);

  const onLoad = useCallback((map) => {
    setIsLoading(false);
    console.log("Map loaded successfully");
  }, []);

  const onUnmount = useCallback(() => {
    console.log("Map unmounted");
  }, []);

  const onLoadError = useCallback((error) => {
    console.error("Failed to load Google Maps:", error);
    setMapError(
      "Failed to load Google Maps. Please check your API key and internet connection."
    );
    setIsLoading(false);
  }, []);

  // Handle missing API key
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
    );
  }

  // Handle map errors
  if (mapError) {
    return (
      <div className="w-full h-96 rounded-2xl shadow-2xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center p-6">
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
    );
  }

  return (
    <div className="w-full h-96 rounded-2xl shadow-2xl overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-400 border-t-transparent mx-auto mb-4"></div>
            <p className="text-sky-700 font-medium">Loading map...</p>
            <p className="text-sky-600 text-sm">{address}</p>
          </div>
        </div>
      )}

      <LoadScript
        googleMapsApiKey={apiKey}
        libraries={libraries}
        onError={onLoadError}
        loadingElement={<div style={{ height: "100%" }} />}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={options}
        >
          <Marker
            position={center}
            title={address}
            animation={2} // DROP animation
            icon={{
              url:
                "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" fill="#0ea5e9" stroke="#fff" stroke-width="2"/>
                  <circle cx="20" cy="20" r="8" fill="#fff"/>
                </svg>
              `),
              scaledSize: window.google?.maps
                ? new window.google.maps.Size(40, 40)
                : { width: 40, height: 40 },
              anchor: window.google?.maps
                ? new window.google.maps.Point(20, 20)
                : { x: 20, y: 20 },
            }}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
