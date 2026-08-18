import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Custom Leaflet Pin Icon
const pinIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function LocationPicker({ position, onPositionChange }) {
  useMapEvents({
    click(e) {
      onPositionChange(e.latlng.lat, e.latlng.lng);
    },
  });

  return position ? (
    <Marker position={position} icon={pinIcon}>
      <Popup>Selected Pinpoint in Zamboanga City</Popup>
    </Marker>
  ) : null;
}

export default function InteractiveMapPicker({ latitude, longitude, onCoordinatesChange, height = '300px' }) {
  const currentPos = latitude && longitude ? [latitude, longitude] : [6.9300, 122.1050];

  return (
    <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm" style={{ height }}>
      <MapContainer
        center={currentPos}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationPicker
          position={latitude && longitude ? [latitude, longitude] : null}
          onPositionChange={(lat, lng) => onCoordinatesChange(Number(lat.toFixed(6)), Number(lng.toFixed(6)))}
        />
      </MapContainer>
      <div className="absolute top-2 right-2 z-20 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg shadow text-xs font-semibold text-emerald-800 border border-emerald-200">
        📍 Click on map to pinpoint coordinates
      </div>
    </div>
  );
}
