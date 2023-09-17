import { GoogleMap, LoadScript } from "@react-google-maps/api";

const MapReact = ({ mapStyles }) => {
  const mapContainerStyle = {
    height: "100%",
    width: "100%",
  };

  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCembocg2y-9sUBjHaVcJlhKlFMjgTIkCo">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={defaultCenter}
      ></GoogleMap>
    </LoadScript>
  );
};

export default MapReact;
