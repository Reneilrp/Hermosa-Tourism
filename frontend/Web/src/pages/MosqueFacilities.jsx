import React, { useState } from 'react';
import { Moon, Droplets, Users, Snowflake, Sparkles, Building, CheckCircle2, Search, X } from 'lucide-react';

export default function MosqueFacilities({ pois }) {
  const mosques = pois.filter((p) => p.category === 'worship');
  const [filterAmenity, setFilterAmenity] = useState('all');
  const [search, setSearch] = useState('');

  const filteredMosques = mosques.filter((m) => {
    const query = search.trim().toLowerCase();
    const matchSearch =
      query === '' ||
      m.name.toLowerCase().includes(query) ||
      m.address.toLowerCase().includes(query) ||
      (m.cuisine && m.cuisine.toLowerCase().includes(query));
    return matchSearch;
  });

  return (
    <div className="space-y-4">
      {/* Facility Highlights Filter & Search Query Strip */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Facility Highlights Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-xs font-bold text-slate-500 mr-1">Highlights:</span>
          {[
            { id: 'all', label: `All Masjids (${filteredMosques.length})` },
            { id: 'wudu', label: '💧 Running Wudu' },
            { id: 'female', label: '👥 Female Mezzanine' },
            { id: 'ac', label: '❄️ Air-Cooled' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterAmenity(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterAmenity === f.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Search Query placed directly beside filter pills */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search masjids or barangay..."
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
        </div>
      </div>

      {/* Mosque Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMosques.map((mosque) => (
          <div key={mosque.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-all">
            <div>
              <div className="flex items-center gap-3">
                <img src={mosque.image} alt={mosque.name} className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0" />
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">{mosque.name}</h3>
                  <p className="text-xs text-slate-500">{mosque.address}</p>
                </div>
              </div>

              {/* Amenity Checklist */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span>Running Wudu Stations</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Separate Female Hall</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700">
                  <Snowflake className="w-4 h-4 text-teal-500" />
                  <span>Air-Cooled Main Hall</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>All 5 Daily Prayers</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                Verified by Islamic Council
              </span>
              <button
                onClick={() => alert(`Auditing facilities for ${mosque.name}`)}
                className="font-bold text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                Update Amenities &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
