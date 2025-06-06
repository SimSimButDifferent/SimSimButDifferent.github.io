import React, { useState } from "react";
import GoogleMap from "./Map";
import StaticMap from "./StaticMap";

const MapTest = () => {
  const [useStaticMap, setUseStaticMap] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Google Maps Test - AdvancedMarker Migration
      </h2>

      {/* Migration Status */}
      <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200">
        <h3 className="text-lg font-semibold mb-2 text-green-800">
          ✅ Migration Complete
        </h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>
            • Migrated from deprecated google.maps.Marker to
            AdvancedMarkerElement
          </li>
          <li>
            • Updated to @vis.gl/react-google-maps library (Google recommended)
          </li>
          <li>• Using modern Pin component with custom styling</li>
          <li>• Clean white container design without blue border</li>
          <li>• No more deprecation warnings!</li>
        </ul>
      </div>

      {/* API Key Status */}
      <div className="mb-6 p-4 rounded-lg bg-gray-100">
        <h3 className="text-lg font-semibold mb-2">Configuration Status</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span
              className={`w-3 h-3 rounded-full ${
                apiKey ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            <span>API Key: {apiKey ? "Configured" : "Missing"}</span>
          </div>
          {apiKey && (
            <div className="text-sm text-gray-600">
              Key: {apiKey.substring(0, 8)}...
              {apiKey.substring(apiKey.length - 4)}
            </div>
          )}
          <div className="text-xs text-gray-500 mt-2">
            <strong>Note:</strong> AdvancedMarkers require a Map ID. Using
            DEMO_MAP_ID for testing.
          </div>
        </div>
      </div>

      {/* Map Type Toggle */}
      <div className="mb-6">
        <button
          onClick={() => setUseStaticMap(!useStaticMap)}
          className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
        >
          Switch to {useStaticMap ? "Interactive AdvancedMarker" : "Static"} Map
        </button>
      </div>

      {/* Map Component - Test Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Contact Box for Size Reference */}
        <div className="flex-shrink-0">
          <div className="bg-sky-300 p-4 rounded-2xl shadow-xl">
            <div className="flex flex-col bg-white rounded-2xl shadow-xl text-center p-4">
              <h3 className="text-xl font-semibold mb-4">
                Contact Box Reference
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                This shows the contact box with blue border for comparison.
              </p>
              <div className="space-y-2 text-sm">
                <p>📞 +44 (0)24 7698 1341</p>
                <p>📧 dreaminrealitycad@gmail.com</p>
                <p>📍 Swan Lane, Sellindge, Ashford, UK</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Component */}
        <div className="min-h-[400px]">
          <h3 className="text-lg font-semibold mb-4">
            {useStaticMap
              ? "Static Map"
              : "Interactive Map with AdvancedMarker"}{" "}
            Test
          </h3>
          {useStaticMap ? (
            <StaticMap address="Dream InReality, Swan Lane, Sellindge, Ashford, UK" />
          ) : (
            <GoogleMap address="Dream InReality, Swan Lane, Sellindge, Ashford, UK" />
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Testing Instructions</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>
            The interactive map now uses AdvancedMarkerElement (no deprecation
            warnings)
          </li>
          <li>Map has clean white container design without blue border</li>
          <li>On larger screens, components should sit side by side</li>
          <li>
            On smaller screens, map should stack below the contact reference
          </li>
          <li>
            Check browser console - should be free of deprecation warnings!
          </li>
        </ol>
      </div>

      {/* Technical Details */}
      <div className="p-4 bg-purple-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Migration Details</h3>
        <div className="text-sm space-y-2">
          <p>
            <strong>Before:</strong> @react-google-maps/api with deprecated
            Marker
          </p>
          <p>
            <strong>After:</strong> @vis.gl/react-google-maps with
            AdvancedMarker + Pin
          </p>
          <p>
            <strong>Styling:</strong> Clean white container with rounded corners
            and shadow
          </p>
          <p>
            <strong>Benefits:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Future-proof implementation</li>
            <li>Better performance and rendering</li>
            <li>Enhanced customization options</li>
            <li>Clean, minimal design</li>
            <li>Google's official recommendation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MapTest;
