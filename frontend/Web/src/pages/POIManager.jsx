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
  List,
  Map as MapIcon,
  Moon,
  Utensils,
  ShoppingBag,
  Landmark,
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Create custom category-specific colored markers for Leaflet
const createCategoryIcon = (category) => {
  const iconColor = category === 'worship' ? '#059669' : category === 'dining' ? '#d97706' : category === 'market' ? '#ea580c' : '#7c3aed';
  const svgHtml = `
    <div style="background-color: ${iconColor}; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 2.5px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);">
      <div style="transform: rotate(45deg); color: white; font-size: 14px; font-weight: bold;">
        ${category === 'worship' ? '🕌' : category === 'dining' ? '🍽️' : category === 'market' ? '🛍️' : '🏛️'}
      </div>
    </div>
  `;
  return L.divIcon({
    html: svgHtml,
    className: 'custom-leaflet-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

export default function POIManager({ pois, onAddNewPOI, onEditPOI, onDeletePOI }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'

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

  return (
    <div className="space-y-4">
      {/* Category Tabs, Halal Tier Filter, Search Query & View Switcher */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Categories' },
            { id: 'worship', label: '🕌 Mosques' },
            { id: 'dining', label: '🍽️ Halal Dining' },
            { id: 'market', label: '🛍️ Barter Markets' },
            { id: 'cultural', label: '🏛️ Cultural' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Right Controls: Tier Filter + Search Input + List/Map View Toggle */}
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          {/* Halal Tier Selector */}
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none cursor-pointer"
          >
            <option value="all">All Halal Tiers</option>
            <option value="tier1">Tier 1: Certified / Mosque</option>
            <option value="tier2">Tier 2: Muslim-Owned</option>
            <option value="tier3">Tier 3: Halal Options</option>
            <option value="tier4">Tier 4: Vegan/Seafood</option>
          </select>

          {/* Search Query Input */}
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search places in Zamboanga..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-7 py-1.5 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
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

          {/* View Mode Toggle: List vs Map (Same as Mobile) */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'map'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. LIST VIEW (Default Table) */}
      {viewMode === 'list' && (
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
      )}

      {/* 2. MAP VIEW (Full-Canvas Zamboanga Interactive GIS Map) */}
      {viewMode === 'map' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-slate-900">
                Interactive GIS Pinpoint Map ({filtered.length} Landmarks Displayed)
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                • Click any marker to view details or edit
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-bold">
              <span className="flex items-center gap-1 text-emerald-700">🟢 Mosques</span>
              <span className="flex items-center gap-1 text-amber-700">🟡 Halal Dining</span>
              <span className="flex items-center gap-1 text-orange-700">🟠 Markets</span>
              <span className="flex items-center gap-1 text-purple-700">🟣 Cultural</span>
            </div>
          </div>

          <div className="h-[520px] rounded-2xl overflow-hidden border border-slate-200 relative">
            <MapContainer
              center={[6.9350, 122.1000]}
              zoom={12}
              scrollWheelZoom={true}
              className="w-full h-full z-10"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {filtered.map((poi) => (
                <Marker
                  key={poi.id}
                  position={[poi.latitude, poi.longitude]}
                  icon={createCategoryIcon(poi.category)}
                >
                  <Popup className="custom-popup">
                    <div className="p-1 space-y-2 max-w-xs text-slate-900">
                      <img
                        src={poi.image}
                        alt={poi.name}
                        className="w-full h-24 rounded-lg object-cover bg-slate-100"
                      />
                      <div>
                        <div className="font-extrabold text-xs text-slate-950">{poi.name}</div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">{poi.address}</div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {poi.tier === 'tier1' ? 'Tier 1: Certified' : 'Tier 2: Muslim-Owned'}
                          </span>
                          <span className="text-[10px] text-amber-600 font-bold flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {poi.rating}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => onEditPOI(poi)}
                          className="flex-1 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] text-center transition-all cursor-pointer"
                        >
                          Edit Place
                        </button>
                        <button
                          onClick={() => onDeletePOI(poi.id)}
                          className="py-1 px-2.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-bold text-[11px] transition-all cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
}
