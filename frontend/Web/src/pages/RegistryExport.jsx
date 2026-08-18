import React, { useState } from 'react';
import { FileSpreadsheet, Download, Printer, ShieldCheck, FileText, CheckCircle2, Search, X } from 'lucide-react';

export default function RegistryExport({ pois, onExportJSON, onPrint }) {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const filteredPOIs = pois.filter((poi) => {
    const matchCat = selectedCat === 'all' || poi.category === selectedCat;
    const query = search.trim().toLowerCase();
    const matchSearch =
      query === '' ||
      poi.name.toLowerCase().includes(query) ||
      poi.address.toLowerCase().includes(query) ||
      poi.category.toLowerCase().includes(query) ||
      poi.tier.toLowerCase().includes(query);
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-4">
      {/* Category Filter & Search Query Strip */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-xs font-bold text-slate-500 mr-1">Filter Registry:</span>
          {[
            { id: 'all', label: `All Entries (${filteredPOIs.length})` },
            { id: 'worship', label: 'Mosques' },
            { id: 'dining', label: 'Halal Dining' },
            { id: 'market', label: 'Trade Markets' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCat === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Query placed beside Category Filters */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search table rows..."
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

      {/* Printable Official Registry Card */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-6 flex items-start justify-between">
          <div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Republic of the Philippines</div>
            <h1 className="text-xl font-extrabold text-slate-950 mt-1">
              City Government of Zamboanga — City Tourism Office
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Official Halal Tourism, Mosque & Culinary Heritage Directory (2026 Edition)
            </p>
          </div>
          <div className="text-right text-xs">
            <div className="font-bold text-slate-800">Generated Date</div>
            <div className="text-slate-500">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
            <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" /> NCMF Compliant
            </div>
          </div>
        </div>

        {/* Summary Metric Stats for Tourism Office */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div>
            <div className="text-[11px] font-semibold text-slate-500">Total Registered</div>
            <div className="text-base font-extrabold text-slate-900">{pois.length} Venues</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-500">Mosques & Masjids</div>
            <div className="text-base font-extrabold text-emerald-700">{pois.filter(p => p.category === 'worship').length} Masjids</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-500">Tier 1 Halal Certified</div>
            <div className="text-base font-extrabold text-amber-700">{pois.filter(p => p.tier === 'tier1').length} Places</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-500">Muslim-Owned Dining</div>
            <div className="text-base font-extrabold text-blue-700">{pois.filter(p => p.category === 'dining').length} Eateries</div>
          </div>
        </div>

        {/* Directory Table Preview */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700 font-extrabold text-[11px]">
              <tr>
                <th className="p-3 border-b border-slate-200">#</th>
                <th className="p-3 border-b border-slate-200">Establishment / Mosque</th>
                <th className="p-3 border-b border-slate-200">Category</th>
                <th className="p-3 border-b border-slate-200">Halal Verification Tier</th>
                <th className="p-3 border-b border-slate-200">Address in Zamboanga</th>
                <th className="p-3 border-b border-slate-200">GPS Coordinates</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredPOIs.map((poi, idx) => (
                <tr key={poi.id}>
                  <td className="p-3 font-bold text-slate-400">{idx + 1}</td>
                  <td className="p-3 font-extrabold text-slate-900">{poi.name}</td>
                  <td className="p-3 capitalize">{poi.category}</td>
                  <td className="p-3 font-bold text-emerald-800">
                    {poi.tier === 'tier1' ? 'Tier 1: Certified / Mosque' : poi.tier === 'tier2' ? 'Tier 2: Muslim-Owned' : 'Tier 3: Halal Options'}
                  </td>
                  <td className="p-3 text-slate-600">{poi.address}</td>
                  <td className="p-3 font-mono text-slate-500">{poi.latitude?.toFixed(4)}, {poi.longitude?.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
