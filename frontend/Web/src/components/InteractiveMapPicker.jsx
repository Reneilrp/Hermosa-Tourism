import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Maximize2, Minimize2, MapPin, Check, Crosshair } from 'lucide-react';

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
      <Popup>
        <div className="font-bold text-xs text-slate-900">
          📍 Selected Coordinates
          <div className="font-mono text-[11px] text-emerald-700 font-semibold mt-0.5">
            {position[0].toFixed(4)}, {position[1].toFixed(4)}
          </div>
        </div>
      </Popup>
    </Marker>
  ) : null;
}

export default function InteractiveMapPicker({
  latitude,
  longitude,
  onCoordinatesChange,
  height = '300px',
  allowFullscreen = true,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const currentPos = latitude && longitude ? [latitude, longitude] : [6.9300, 122.1050];

  const presets = [
    { label: 'Sadik Grand Mosque (Mercedes)', lat: 6.9580, lng: 122.1400 },
    { label: 'Masjid Baliwasan (WMSU)', lat: 6.9142, lng: 122.0590 },
    { label: 'Sta. Barbara District', lat: 6.9110, lng: 122.0805 },
    { label: 'Taluksangay Historic Mosque', lat: 6.9555, lng: 122.1795 },
  ];

  return (
    <>
      {/* Standard Inline Map View */}
      <div
        className={`relative rounded-2xl overflow-hidden border border-slate-200 shadow-xs transition-all ${
          isFullscreen ? 'fixed inset-4 z-[999] bg-white shadow-2xl rounded-3xl border-2 border-emerald-500 flex flex-col' : ''
        }`}
        style={{ height: isFullscreen ? 'calc(100vh - 2rem)' : height }}
      >
        {/* Fullscreen Map Header Bar */}
        {isFullscreen && (
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between z-30 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Crosshair className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-white">Full Screen Coordinate Picker</h4>
                <p className="text-[11px] text-slate-400">Click anywhere in Zamboanga City to pinpoint coordinates</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-emerald-400 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 font-bold">
                {latitude?.toFixed(5)}, {longitude?.toFixed(5)}
              </span>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Confirm & Done</span>
              </button>
            </div>
          </div>
        )}

        <MapContainer
          center={currentPos}
          zoom={13}
          scrollWheelZoom={true}
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

        {/* Top Floating Helper & Fullscreen Toggle */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
          <div className="bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-sm text-[11px] font-bold text-emerald-800 border border-emerald-200">
            📍 Click map to pinpoint
          </div>

          {allowFullscreen && (
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="bg-white/95 hover:bg-white text-slate-700 hover:text-slate-900 p-1.5 rounded-xl shadow-sm border border-slate-200 transition-all cursor-pointer"
              title={isFullscreen ? 'Exit Full Screen' : 'View Full Screen Map'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Bottom Quick Preset Anchors */}
        <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center gap-1.5 overflow-x-auto p-1.5 bg-white/90 backdrop-blur-xs rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 pl-1 shrink-0">Quick Anchors:</span>
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => onCoordinatesChange(p.lat, p.lng)}
              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-[10px] font-bold transition-all border border-slate-200 shrink-0 cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
