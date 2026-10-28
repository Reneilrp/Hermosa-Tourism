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
  Copy,
  Check,
  Maximize2,
  Table,
  Map as MapIcon,
  Columns,
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Bespoke SVG Minaret/Moorish Map Pin Generator for Leaflet
const createCategoryIcon = (category, isSelected = false) => {
  const iconColor =
    category === 'worship'
      ? '#047857'
      : category === 'dining'
      ? '#d97706'
      : category === 'market'
      ? '#ea580c'
      : '#4f46e5';
  const size = isSelected ? 42 : 36;
  const emoji =
    category === 'worship' ? '🕌' : category === 'dining' ? '🍽️' : category === 'market' ? '🛍️' : '🏛️';

  const svgHtml = `
    <div style="background-color: ${iconColor}; width: ${size}px; height: ${size}px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: ${
    isSelected ? '3.5px solid #f59e0b' : '2.5px solid #ffffff'
  }; box-shadow: 0 8px 18px rgba(0,0,0,0.35); transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);">
      <div style="transform: rotate(45deg); color: white; font-size: ${
        isSelected ? '17px' : '14px'
      }; font-weight: bold; line-height: 1;">
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
      map.flyTo(center, zoom, { duration: 1.1 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function POIManager({
  pois = [],
  viewMode: propViewMode = 'list',
  onAddNewPOI,
  onEditPOI,
  onDeletePOI,
}) {
  // Local view mode state: 'table' | 'split' | 'map'
  const [activeLayout, setActiveLayout] = useState(propViewMode === 'map' ? 'map' : 'table');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedPOI, setSelectedPOI] = useState(null);
  const [mapCenter, setMapCenter] = useState([6.9350, 122.1000]);
  const [mapZoom, setMapZoom] = useState(13);
  const [copiedId, setCopiedId] = useState(null);

  // Sync prop changes if external shell toggles viewMode
  React.useEffect(() => {
    if (propViewMode === 'map') {
      setActiveLayout('map');
    }
  }, [propViewMode]);

  const categoryCounts = {
    all: pois.length,
    worship: pois.filter((p) => p.category === 'worship').length,
    dining: pois.filter((p) => p.category === 'dining').length,
    market: pois.filter((p) => p.category === 'market').length,
    cultural: pois.filter((p) => p.category === 'cultural').length,
  };

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

  const focusPreset = (lat, lng, zoom = 15, poi = null) => {
    setMapCenter([lat, lng]);
    setMapZoom(zoom);
    if (poi) setSelectedPOI(poi);
  };

  const handleCopyCoords = (poi) => {
    const text = `${poi.latitude?.toFixed(5)}, ${poi.longitude?.toFixed(5)}`;
    navigator.clipboard?.writeText(text);
    setCopiedId(poi.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getTierBadge = (tier) => {
    switch (tier) {
      case 'tier1':
        return {
          label: 'Tier 1: Certified',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: ShieldCheck,
        };
      case 'tier2':
        return {
          label: 'Tier 2: Muslim-Owned',
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
          icon: Moon,
        };
      case 'tier3':
        return {
          label: 'Tier 3: Halal-Friendly',
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: Utensils,
        };
      default:
        return {
          label: 'Tier 4: Vegan/Seafood',
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
          icon: Landmark,
        };
    }
  };

  const categories = [
    { id: 'all', label: 'All Registries', count: categoryCounts.all, icon: Layers },
    { id: 'worship', label: 'Mosques & Masjids', count: categoryCounts.worship, icon: Moon },
    { id: 'dining', label: 'Halal Dining', count: categoryCounts.dining, icon: Utensils },
    { id: 'market', label: 'Barter Markets', count: categoryCounts.market, icon: ShoppingBag },
    { id: 'cultural', label: 'Cultural Heritage', count: categoryCounts.cultural, icon: Landmark },
  ];

  const tiers = [
    { id: 'all', label: 'All Tiers' },
    { id: 'tier1', label: 'Tier 1 (Certified)' },
    { id: 'tier2', label: 'Tier 2 (Muslim-Owned)' },
    { id: 'tier3', label: 'Tier 3 (Halal Options)' },
  ];

  return (
    <div className="space-y-4">
      {/* 1. TOP CONTROL DOCKET (Search, Segmented Layout Switcher, and Add POI CTA) */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search verified masjids, halal kitchens, or barangays..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/90 rounded-xl pl-9 pr-8 py-2 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all"
          />
          {search.length > 0 && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              aria-label="Clear search query"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right: Layout Switcher & Primary Action */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* Segmented Layout Controller */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60 shrink-0">
            <button
              onClick={() => setActiveLayout('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeLayout === 'table'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Table Ledger View"
              aria-label="Switch to table ledger view"
            >
              <Table className="w-3.5 h-3.5 text-emerald-700" />
              <span>Table</span>
            </button>

            <button
              onClick={() => setActiveLayout('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeLayout === 'split'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Split Map and Directory View"
              aria-label="Switch to split map and directory view"
            >
              <Columns className="w-3.5 h-3.5 text-emerald-700" />
              <span>Split</span>
            </button>

            <button
              onClick={() => setActiveLayout('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeLayout === 'map'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Full Leaflet GIS Map View"
              aria-label="Switch to full GIS map view"
            >
              <MapIcon className="w-3.5 h-3.5 text-emerald-700" />
              <span>Map</span>
            </button>
          </div>

          {/* Add New Place / Mosque Button */}
          <button
            onClick={() => onAddNewPOI('worship')}
            className="bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Place / Mosque</span>
          </button>
        </div>
      </div>

      {/* 2. TACTILE CATEGORY & HALAL TIER FILTER CHIPS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md font-extrabold ${
                    isSelected ? 'bg-slate-800 text-amber-300' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tier Selector Chips */}
        <div className="flex items-center gap-1 overflow-x-auto shrink-0">
          {tiers.map((t) => {
            const isSelected = selectedTier === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTier(t.id)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. LAYOUT RENDERING */}

      {/* A. TABLE VIEW */}
      {activeLayout === 'table' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/90 border-b border-slate-200 text-slate-600 uppercase text-[10px] font-extrabold tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Establishment / Mosque</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Halal Tier</th>
                  <th className="px-4 py-3.5">Coordinates (GPS)</th>
                  <th className="px-4 py-3.5">Rating & Feedback</th>
                  <th className="px-4 py-3.5">Audit Body</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <MapPin className="w-8 h-8 text-slate-300 stroke-1" />
                        <div className="text-sm font-bold text-slate-700">No establishments found</div>
                        <p className="text-xs text-slate-400">
                          Try adjusting your search query or switching category filters.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((poi) => {
                    const tierMeta = getTierBadge(poi.tier);
                    const TierIcon = tierMeta.icon;
                    return (
                      <tr
                        key={poi.id}
                        className="hover:bg-slate-50/90 transition-colors group"
                      >
                        {/* Title & Image */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={poi.image}
                              alt={poi.name}
                              className="w-10 h-10 rounded-xl object-cover bg-slate-100 border border-slate-200/80 shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="font-extrabold text-slate-900 text-xs truncate group-hover:text-emerald-700 transition-colors">
                                {poi.name}
                              </div>
                              <div className="text-[11px] text-slate-500 truncate max-w-xs mt-0.5">
                                {poi.address}
                              </div>
                              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                {poi.isPromoted && (
                                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                                    ★ {poi.promotionTier === 'sponsored' ? 'Sponsored' : 'Top Recommended'}
                                  </span>
                                )}
                                {(poi.accreditationNumber || poi.ra9593Compliant) && (
                                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200" title={`DOT Accreditation: ${poi.accreditationNumber || 'Verified'}`}>
                                    🛡️ RA 9593 DOT
                                  </span>
                                )}
                                {poi.mayorsPermitNumber && (
                                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200" title={`LGU Mayor's Permit: ${poi.mayorsPermitNumber}`}>
                                    🏛️ {poi.mayorsPermitNumber}
                                  </span>
                                )}
                                {poi.isMuslimFriendly && (
                                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                                    Muslim-Friendly
                                  </span>
                                )}
                                {poi.supplierName && (
                                  <span className="text-[9px] font-semibold text-slate-500 truncate max-w-xs" title={`Supplier: ${poi.supplierName} (${poi.supplierLocation || ''})`}>
                                    📦 {poi.supplierName}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="capitalize font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md text-[10px] border border-slate-200">
                            {poi.category}
                          </span>
                        </td>

                        {/* Halal Tier */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border ${tierMeta.bg}`}
                          >
                            <TierIcon className="w-3 h-3 shrink-0" />
                            <span>{tierMeta.label}</span>
                          </span>
                        </td>

                        {/* Coordinates */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <button
                            onClick={() => handleCopyCoords(poi)}
                            className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-600 hover:text-emerald-700 bg-slate-50 hover:bg-slate-100 px-2 py-1 rounded-lg border border-slate-200/70 transition-colors cursor-pointer"
                            title="Click to copy coordinates"
                            aria-label={`Copy GPS coordinates for ${poi.name}`}
                          >
                            <span>
                              {poi.latitude?.toFixed(4)}, {poi.longitude?.toFixed(4)}
                            </span>
                            {copiedId === poi.id ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3 text-slate-400" />
                            )}
                          </button>
                        </td>

                        {/* Rating */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="font-extrabold text-slate-900">{poi.rating}</span>
                            <span className="text-slate-400 text-[10px]">
                              ({poi.reviewCount || 12} reviews)
                            </span>
                          </div>
                        </td>

                        {/* Cert Body */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="text-[11px] font-semibold text-slate-600">
                            {poi.certBody || 'NCMF / Council'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                focusPreset(poi.latitude, poi.longitude, 16, poi);
                                setActiveLayout('split');
                              }}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-all cursor-pointer"
                              title="Locate on Map"
                              aria-label={`Locate ${poi.name} on map`}
                            >
                              <MapPin className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onEditPOI(poi)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-all cursor-pointer"
                              title="Edit Place"
                              aria-label={`Edit ${poi.name}`}
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeletePOI(poi.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                              title="Delete Place"
                              aria-label={`Delete ${poi.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Ledger Telemetry */}
          <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>
              Showing <strong className="text-slate-900">{filtered.length}</strong> of{' '}
              <strong className="text-slate-900">{pois.length}</strong> verified locations
            </span>
            <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              Zamboanga Tourism GIS Active
            </span>
          </div>
        </div>
      )}

      {/* B. SPLIT VIEW (Directory List on Left, Leaflet Map on Right) */}
      {activeLayout === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-230px)] min-h-[550px]">
          {/* Left: Scrollable Directory List */}
          <div className="lg:col-span-5 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800">
                Directory Entries ({filtered.length})
              </span>
              <span className="text-[11px] text-slate-500 font-semibold">
                Click any place to zoom map
              </span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2 space-y-1">
              {filtered.map((poi) => {
                const isSelected = selectedPOI?.id === poi.id;
                const tierMeta = getTierBadge(poi.tier);
                return (
                  <div
                    key={poi.id}
                    onClick={() => focusPreset(poi.latitude, poi.longitude, 16, poi)}
                    className={`p-3 rounded-xl transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? 'bg-emerald-50 border border-emerald-300 shadow-xs'
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <img
                      src={poi.image}
                      alt={poi.name}
                      className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-200"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-extrabold text-slate-900 truncate">{poi.name}</h4>
                        <span className="text-[10px] font-bold text-amber-600 flex items-center gap-0.5 shrink-0">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {poi.rating}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{poi.address}</p>
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        {poi.isPromoted && (
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300">
                            ★ Top Recommended
                          </span>
                        )}
                        {(poi.accreditationNumber || poi.ra9593Compliant) && (
                          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200" title={`DOT Accreditation: ${poi.accreditationNumber || 'Verified'}`}>
                            🛡️ DOT
                          </span>
                        )}
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${tierMeta.bg}`}>
                          {tierMeta.label}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500">
                          {poi.latitude?.toFixed(4)}, {poi.longitude?.toFixed(4)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Embedded Interactive Map */}
          <div className="lg:col-span-7 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden relative shadow-xs">
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
                    click: () => setSelectedPOI(poi),
                  }}
                >
                  <Popup>
                    <div className="p-1">
                      <div className="font-bold text-xs text-slate-900">{poi.name}</div>
                      <div className="text-[11px] text-slate-500">{poi.address}</div>
                      <div className="mt-1 font-bold text-emerald-800 text-[10px]">
                        {poi.category?.toUpperCase()}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Floating Top Focus Buttons on Map */}
            <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-xl shadow-lg border border-slate-200 text-xs font-bold text-slate-700 pointer-events-auto">
                <span className="text-[10px] uppercase text-slate-400 px-1 font-extrabold">Hotspots:</span>
                <button
                  onClick={() => focusPreset(6.9580, 122.1400, 16)}
                  className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] transition-colors cursor-pointer"
                >
                  Mercedes Grand Mosque
                </button>
                <button
                  onClick={() => focusPreset(6.9142, 122.0590, 16)}
                  className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] transition-colors cursor-pointer"
                >
                  WMSU Campus
                </button>
              </div>

              {selectedPOI && (
                <button
                  onClick={() => onEditPOI(selectedPOI)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer pointer-events-auto"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Selected</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* C. FULL-SCREEN MAP VIEW */}
      {activeLayout === 'map' && (
        <div className="w-full h-[calc(100vh-210px)] min-h-[580px] relative rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-slate-200">
          {/* Floating Hotspots Toolbar on Map Top */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-3 pointer-events-none">
            <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-slate-200/90 text-[11px] font-bold text-slate-700 pointer-events-auto">
              <span className="px-2 text-slate-400 font-extrabold uppercase text-[10px]">
                Regional Centers:
              </span>
              <button
                onClick={() => focusPreset(6.9580, 122.1400, 16)}
                className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-all cursor-pointer"
              >
                Mercedes Grand Mosque
              </button>
              <button
                onClick={() => focusPreset(6.9142, 122.0590, 16)}
                className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-all cursor-pointer"
              >
                WMSU Campus
              </button>
              <button
                onClick={() => focusPreset(6.9555, 122.1795, 16)}
                className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-all cursor-pointer"
              >
                Taluksangay
              </button>
            </div>

            <div className="pointer-events-auto">
              <button
                onClick={() => onAddNewPOI('worship')}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Place / Mosque</span>
              </button>
            </div>
          </div>

          {/* Full-Bleed Leaflet Canvas */}
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
                    click: () => setSelectedPOI(poi),
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

          {/* Left Slide-Over Card for Selected Landmark */}
          {selectedPOI && (
            <div className="absolute top-20 left-4 z-30 w-84 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-left duration-200">
              <div className="relative">
                <img
                  src={selectedPOI.image}
                  alt={selectedPOI.name}
                  className="w-full h-36 object-cover bg-slate-100"
                />
                <button
                  onClick={() => setSelectedPOI(null)}
                  className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                  aria-label="Close details card"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-2.5 left-2.5">
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg shadow-md bg-emerald-700 text-white">
                    {selectedPOI.tier === 'tier1' ? 'Tier 1: Certified' : 'Tier 2: Muslim-Owned'}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-snug">
                    {selectedPOI.name}
                  </h4>
                  <p className="text-xs text-slate-500 flex items-start gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{selectedPOI.address}</span>
                  </p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-semibold">Coordinates:</span>
                    <span className="font-mono font-bold text-slate-700">
                      {selectedPOI.latitude?.toFixed(4)}, {selectedPOI.longitude?.toFixed(4)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-semibold">Rating:</span>
                    <span className="font-bold text-amber-600 flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {selectedPOI.rating}{' '}
                      ({selectedPOI.reviewCount || 0})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onEditPOI(selectedPOI)}
                    className="flex-1 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
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
                    aria-label={`Delete ${selectedPOI.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Right Minimal Legend */}
          <div className="absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-xl border border-slate-200 flex items-center gap-3 text-xs font-bold text-slate-700">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold">
              Legend:
            </span>
            <span className="flex items-center gap-1 text-emerald-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-700 inline-block" /> Mosques
            </span>
            <span className="flex items-center gap-1 text-amber-800">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" /> Halal Food
            </span>
            <span className="flex items-center gap-1 text-orange-800">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-600 inline-block" /> Markets
            </span>
            <span className="flex items-center gap-1 text-indigo-800">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" /> Cultural
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
