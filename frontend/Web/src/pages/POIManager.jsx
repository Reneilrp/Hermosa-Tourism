import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Filter,
  Edit2,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Star,
  Plus,
  X,
  Moon,
  Utensils,
  ShoppingBag,
  Landmark,
  Compass,
  Phone,
  Clock,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Create custom category-specific colored markers for Leaflet
const createCategoryIcon = (category, isSelected = false) => {
  const iconColor = category === 'worship' ? '#059669' : category === 'dining' ? '#d97706' : category === 'market' ? '#ea580c' : '#7c3aed';
  const size = isSelected ? 40 : 34;
  const emoji = category === 'worship' ? '🕌' : category === 'dining' ? '🍽️' : category === 'market' ? '🛍️' : '🏛️';

  const svgHtml = `
    <div style="background-color: ${iconColor}; width: ${size}px; height: ${size}px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: ${isSelected ? '3.5px solid #fbbf24' : '2.5px solid white'}; box-shadow: 0 6px 14px rgba(0,0,0,0.4); transition: all 0.2s ease;">
      <div style="transform: rotate(45deg); color: white; font-size: ${isSelected ? '16px' : '13px'}; font-weight: bold;">
        ${emoji}
      </div>
    </div>
  `;
  return L.divIcon({
    html: svgHtml,
    className: 'custom-leaflet-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

function MapCameraController({ center, zoom }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function POIManager({
  pois,
  viewMode = 'list',
  onAddNewPOI,
  onEditPOI,
  onDeletePOI,
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedPOI, setSelectedPOI] = useState(null);
  const [mapCenter, setMapCenter] = useState([6.9350, 122.1000]);
  const [mapZoom, setMapZoom] = useState(12);

  const filtered = pois.filter((p) => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchTier = selectedTier === 'all' || p.tier === selectedTier;
    const effectiveSearch = search.trim().toLowerCase();
    const matchSearch =
      effectiveSearch === '' ||
      p.name.toLowerCase().includes(effectiveSearch) ||
      p.address.toLowerCase().includes(effectiveSearch) ||
      (p.cuisine && p.cuisine.toLowerCase().includes(effectiveSearch));
    return matchCat && matchTier && matchSearch;
  });

  const focusPreset = (lat, lng, zoom = 14) => {
    setMapCenter([lat, lng]);
    setMapZoom(zoom);
  };

  return (
    <>
      {/* 1. LIST VIEW (Default Table with Padding & Filter Strip) */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {/* Single-Row Unified Filter & Action Toolbar */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
            {/* Left Controls: Category Dropdown + Tier Dropdown + Search in One Row */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              {/* Category Option Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none cursor-pointer shrink-0 transition-colors"
              >
                <option value="all">📂 All Categories ({pois.length})</option>
                <option value="worship">🕌 Mosques & Masjids</option>
                <option value="dining">🍽️ Halal Dining & Food</option>
                <option value="market">🛍️ Barter Trade Markets</option>
                <option value="cultural">🏛️ Cultural Heritage</option>
              </select>

              {/* Halal Tier Option Dropdown */}
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none cursor-pointer shrink-0 transition-colors"
              >
                <option value="all">🛡️ All Halal Tiers</option>
                <option value="tier1">Tier 1: Certified / Mosque</option>
                <option value="tier2">Tier 2: Muslim-Owned</option>
                <option value="tier3">Tier 3: Halal Options</option>
                <option value="tier4">Tier 4: Vegan/Seafood</option>
              </select>

              {/* Search Query Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search places, barangays, or dishes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-7 py-2 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                />
                {search.length > 0 && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Action: Add New Place / Mosque */}
            <button
              onClick={() => onAddNewPOI('worship')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Place / Mosque</span>
            </button>
          </div>

          {/* Places Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] font-extrabold tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">Establishment / Mosque</th>
                    <th className="px-4 py-3.5">Category</th>
                    <th className="px-4 py-3.5">Halal Tier</th>
                    <th className="px-4 py-3.5">Coordinates (GPS)</th>
                    <th className="px-4 py-3.5">Rating & Reviews</th>
                    <th className="px-4 py-3.5">Cert Body</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {filtered.map((poi) => (
                    <tr key={poi.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={poi.image}
                            alt={poi.name}
                            className="w-10 h-10 rounded-xl object-cover bg-slate-100 shrink-0"
                          />
                          <div>
                            <div className="font-extrabold text-slate-900 text-xs">{poi.name}</div>
                            <div className="text-[11px] text-slate-500 truncate max-w-xs">{poi.address}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="capitalize font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg text-[10px]">
                          {poi.category}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                            poi.tier === 'tier1'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : poi.tier === 'tier2'
                              ? 'bg-blue-100 text-blue-800 border border-blue-200'
                              : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {poi.tier === 'tier1' ? 'Tier 1: Certified' : poi.tier === 'tier2' ? 'Tier 2: Muslim-Owned' : 'Tier 3: Options'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-[11px] text-slate-600">
                        {poi.latitude?.toFixed(4)}, {poi.longitude?.toFixed(4)}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-slate-900">{poi.rating}</span>
                          <span className="text-slate-400 text-[10px]">({poi.reviewCount})</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 text-[11px]">
                        {poi.certBody || 'NCMF / Council'}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onEditPOI(poi)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all cursor-pointer"
                            title="Edit Place"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeletePOI(poi.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                            title="Delete Place"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. MAP VIEW (Edge-to-Edge 100% Full Canvas between Sidebar & Navbar) */}
      {viewMode === 'map' && (
        <div className="w-full h-full relative overflow-hidden bg-slate-200">
          {/* Single-Row Floating Bar on Top of Map */}
          <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between gap-3 pointer-events-none">
            {/* Left Single-Row Dropdowns & Search */}
            <div className="flex items-center gap-2 pointer-events-auto bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-slate-200/90">
              {/* Category Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none cursor-pointer transition-colors"
              >
                <option value="all">📂 All Categories ({pois.length})</option>
                <option value="worship">🕌 Mosques</option>
                <option value="dining">🍽️ Dining</option>
                <option value="market">🛍️ Markets</option>
                <option value="cultural">🏛️ Cultural</option>
              </select>

              {/* Tier Dropdown */}
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none cursor-pointer transition-colors"
              >
                <option value="all">🛡️ All Tiers</option>
                <option value="tier1">Tier 1: Certified</option>
                <option value="tier2">Tier 2: Muslim-Owned</option>
                <option value="tier3">Tier 3: Options</option>
              </select>

              {/* Search Map Pins */}
              <div className="relative w-48 sm:w-60">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter map pins..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-7 py-2 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
                {search.length > 0 && (
                  <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Quick Presets & Add Place Button in Same Row */}
            <div className="flex items-center gap-2 pointer-events-auto">
              <div className="hidden lg:flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-slate-200/90 text-[11px] font-bold text-slate-700">
                <span className="px-1.5 text-slate-400">Focus:</span>
                <button
                  onClick={() => focusPreset(6.9580, 122.1400, 15)}
                  className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-all cursor-pointer"
                >
                  Mercedes Grand Mosque
                </button>
                <button
                  onClick={() => focusPreset(6.9142, 122.0590, 15)}
                  className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-all cursor-pointer"
                >
                  WMSU Campus
                </button>
                <button
                  onClick={() => focusPreset(6.9555, 122.1795, 15)}
                  className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-all cursor-pointer"
                >
                  Taluksangay
                </button>
              </div>

              <button
                onClick={() => onAddNewPOI('worship')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Place / Mosque</span>
              </button>
            </div>
          </div>

          {/* Full-Bleed 100% Leaflet GIS Canvas */}
          <div className="w-full h-full absolute inset-0 z-10">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              scrollWheelZoom={true}
              className="w-full h-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapCameraController center={mapCenter} zoom={mapZoom} />

              {filtered.map((poi) => (
                <Marker
                  key={poi.id}
                  position={[poi.latitude, poi.longitude]}
                  icon={createCategoryIcon(poi.category, selectedPOI?.id === poi.id)}
                  eventHandlers={{
                    click: () => {
                      setSelectedPOI(poi);
                    },
                  }}
                >
                  <Popup>
                    <div className="font-bold text-xs text-slate-900">{poi.name}</div>
                    <div className="text-[11px] text-slate-500">{poi.address}</div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Left Slide-Over / Floating Selected Landmark Detail Card */}
          {selectedPOI && (
            <div className="absolute top-22 left-5 z-30 w-84 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in slide-in-from-left duration-200">
              <div className="relative">
                <img
                  src={selectedPOI.image}
                  alt={selectedPOI.name}
                  className="w-full h-36 object-cover bg-slate-100"
                />
                <button
                  onClick={() => setSelectedPOI(null)}
                  className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-2.5 left-2.5">
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg shadow-md ${
                      selectedPOI.tier === 'tier1'
                        ? 'bg-emerald-600 text-white'
                        : selectedPOI.tier === 'tier2'
                        ? 'bg-blue-600 text-white'
                        : 'bg-amber-600 text-white'
                    }`}
                  >
                    {selectedPOI.tier === 'tier1' ? 'Tier 1: Certified' : 'Tier 2: Muslim-Owned'}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-snug">{selectedPOI.name}</h4>
                  <p className="text-xs text-slate-500 flex items-start gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{selectedPOI.address}</span>
                  </p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-semibold">Coordinates:</span>
                    <span className="font-mono font-bold text-slate-700">{selectedPOI.latitude?.toFixed(4)}, {selectedPOI.longitude?.toFixed(4)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-semibold">Rating:</span>
                    <span className="font-bold text-amber-600 flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {selectedPOI.rating} ({selectedPOI.reviewCount || 0})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onEditPOI(selectedPOI)}
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Place</span>
                  </button>
                  <button
                    onClick={() => {
                      onDeletePOI(selectedPOI.id);
                      setSelectedPOI(null);
                    }}
                    className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-all cursor-pointer"
                    title="Delete Place"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Right Floating Minimal Legend */}
          <div className="absolute bottom-5 right-5 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-3.5 text-xs font-bold text-slate-700">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold">Legend:</span>
            <span className="flex items-center gap-1 text-emerald-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" /> Mosques
            </span>
            <span className="flex items-center gap-1 text-amber-800">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" /> Halal Dining
            </span>
            <span className="flex items-center gap-1 text-orange-800">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-600 inline-block" /> Markets
            </span>
            <span className="flex items-center gap-1 text-purple-800">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block" /> Cultural
            </span>
          </div>
        </div>
      )}
    </>
  );
}
