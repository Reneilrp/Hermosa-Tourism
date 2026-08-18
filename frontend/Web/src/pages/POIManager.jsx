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
} from 'lucide-react';

export default function POIManager({ pois, onAddNewPOI, onEditPOI, onDeletePOI }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = pois.filter((p) => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchTier = selectedTier === 'all' || p.tier === selectedTier;
    const matchSearch =
      search.trim() === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase()) ||
      (p.cuisine && p.cuisine.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchTier && matchSearch;
  });

  return (
    <div className="space-y-5">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            Place & Mosque Directory Management
          </h2>
          <p className="text-xs text-slate-500">
            Audit and publish verified Halal venues, masjids, and cultural landmarks across Zamboanga City
          </p>
        </div>

        <button
          onClick={onAddNewPOI}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Place / Mosque</span>
        </button>
      </div>

      {/* Filter Controls Strip */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
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
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tier Filter & Search */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none"
          >
            <option value="all">All Halal Tiers</option>
            <option value="tier1">Tier 1: Certified / Mosque</option>
            <option value="tier2">Tier 2: Muslim-Owned</option>
            <option value="tier3">Tier 3: Halal Options</option>
            <option value="tier4">Tier 4: Vegan/Seafood</option>
          </select>

          <div className="relative flex-1 sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search places..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs font-medium text-slate-800 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Places Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] font-extrabold tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Place / Landmark</th>
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
  );
}
