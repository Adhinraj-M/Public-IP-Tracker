import React, { useContext, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { AppContext } from "../Context/AppContext";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 50],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const ChangeMapView = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 13, { animate: true });
    }
  }, [coords, map]);
  return null;
};

const MapComponent = () => {
  const { fetchedIp } = useContext(AppContext);

  const defaultLocation = [28.7041, 77.1025];

  const lat = fetchedIp?.lat;
  const lon = fetchedIp?.lon;

  const position = lat && lon ? [lat, lon] : defaultLocation;

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      className="h-[500px] w-full rounded-lg shadow-lg mb-70"
    >
      <ChangeMapView coords={position} />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={position} icon={customIcon}>
        <Popup>
          {fetchedIp
            ? `📍 ${fetchedIp.city}, ${fetchedIp.regionName}, ${fetchedIp.country}`
            : "Default Location (Delhi)"}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
