"use client";

import { useState, useCallback } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

// Contact page map: Google's dark colour scheme in a slate frame. If the key
// is missing or the map fails to load, the reader gets a link to the same
// place on Google Maps instead.

// Swan Lane, Sellindge, Ashford.
const CENTER = { lat: 51.107477, lng: 1.015212 };
// Required for AdvancedMarker. Replace with a production Map ID when one
// exists (see USER-TODO.md).
const MAP_ID = "DEMO_MAP_ID";
const DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${CENTER.lat},${CENTER.lng}`;

const frame =
  "h-80 overflow-hidden rounded-lg border border-line bg-surface lg:h-full lg:min-h-[24rem]";

function Fallback() {
  return (
    <div className={`${frame} flex items-center justify-center p-6`}>
      <div className="text-center">
        <p className="mb-2">The map is not available.</p>
        <a
          href={DIRECTIONS}
          target="_blank"
          rel="noopener noreferrer"
          className="link-inverse inline-flex min-h-[44px] items-center"
        >
          Open Swan Lane, Sellindge in Google Maps
        </a>
      </div>
    </div>
  );
}

export default function GoogleMap({
  address = "Dream InReality, Swan Lane, Sellindge, Ashford, Kent",
}) {
  const [failed, setFailed] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const onError = useCallback(() => setFailed(true), []);

  if (!apiKey || failed) return <Fallback />;

  return (
    <div
      role="region"
      aria-label="Map of Swan Lane, Sellindge, Ashford"
      className={frame}
    >
      <APIProvider apiKey={apiKey} onError={onError}>
        <Map
          className="h-full w-full"
          defaultCenter={CENTER}
          defaultZoom={15}
          mapId={MAP_ID}
          colorScheme="DARK"
          gestureHandling="cooperative"
          zoomControl
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl
        >
          <AdvancedMarker position={CENTER} title={address}>
            <Pin
              background="#22d3ee"
              borderColor="#0f172a"
              glyphColor="#0f172a"
              scale={1.2}
            />
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  );
}
