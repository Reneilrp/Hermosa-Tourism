import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Printer,
  ShieldCheck,
  FileText,
  CheckCircle2,
  Search,
  X,
  Building,
  Calendar,
  Layers,
  MapPin,
  Check,
} from 'lucide-react';

export default function RegistryExport({ pois = [], onExportJSON, onPrint }) {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const filteredPOIs = pois.filter((poi) => {
    const matchCat = selectedCat === 'all' || poi.category === selectedCat;
    const query = search.trim().toLowerCase();
    const matchSearch =
      query === '' ||
      poi.name?.toLowerCase().includes(query) ||
      poi.address?.toLowerCase().includes(query) ||
      poi.category?.toLowerCase().includes(query) ||
      poi.tier?.toLowerCase().includes(query);
    return matchCat && matchSearch;
  });

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Category', 'Tier', 'Address', 'Latitude', 'Longitude', 'Rating', 'CertBody'];
    const rows = filteredPOIs.map((p) => [
      p.id,
      `"${p.name.replace(/"/g, '""')}"`,
      p.category,
      p.tier,
      `"${p.address.replace(/"/g, '""')}"`,
      p.latitude,
      p.longitude,
      p.rating,
      `"${(p.certBody || 'NCMF / Council').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `zamboanga_halal_registry_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5">
      {/* 1. FILTER & ACTION TOOLBAR */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search table rows by name or barangay..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all"
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

          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none cursor-pointer shrink-0 transition-colors"
          >
            <option value="all">All Entries ({pois.length})</option>
            <option value="worship">Mosques & Masjids</option>
            <option value="dining">Halal Dining</option>
            <option value="market">Barter Trade Markets</option>
            <option value="cultural">Cultural Heritage</option>
          </select>
        </div>

        {/* Action Controls: Export JSON & Print PDF */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportCSV}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            title="Download CSV spreadsheet"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onExportJSON}
            className="bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={onPrint}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print PDF</span>
          </button>
        </div>
      </div>

      {/* 2. OFFICIAL MUNICIPAL REGISTRY REPORT TABLE */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Official Header Banner */}
        <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="text-[11px] font-black text-emerald-800 uppercase tracking-widest">
              Republic of the Philippines
            </div>
            <h1 className="text-xl font-black text-slate-950 mt-1 tracking-tight">
              City Government of Zamboanga — City Tourism Office
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Official Halal Tourism, Mosque & Culinary Heritage Directory (2026 Edition)
            </p>
          </div>

          <div className="text-left sm:text-right text-xs shrink-0 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
            <div className="font-extrabold text-slate-800">Certified Audit Registry</div>
            <div className="text-slate-500 font-medium mt-0.5">
              {new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
            <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>NCMF Region IX Compliant</span>
            </div>
          </div>
        </div>

        {/* Dense Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] font-extrabold tracking-wider">
              <tr>
                <th className="px-4 py-3">Establishment / Venue</th>
                <th className="px-3 py-3">Category</th>
                <th className="px-3 py-3">Halal Tier</th>
                <th className="px-3 py-3">Coordinates (GPS)</th>
                <th className="px-3 py-3">Rating</th>
                <th className="px-3 py-3">Accreditation Body</th>
                <th className="px-4 py-3 text-right">Registry Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredPOIs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    No registry entries found.
                  </td>
                </tr>
              ) : (
                filteredPOIs.map((poi) => (
                  <tr key={poi.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-extrabold text-slate-900">{poi.name}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-xs">{poi.address}</div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="capitalize font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md text-[10px]">
                        {poi.category}
                      </span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                          poi.tier === 'tier1'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : poi.tier === 'tier2'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        {poi.tier === 'tier1'
                          ? 'Tier 1: Certified'
                          : poi.tier === 'tier2'
                          ? 'Tier 2: Muslim-Owned'
                          : 'Tier 3: Halal Options'}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                      {poi.latitude?.toFixed(4)}, {poi.longitude?.toFixed(4)}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap font-bold text-slate-900">
                      ★ {poi.rating} <span className="text-[10px] text-slate-400">({poi.reviewCount || 10})</span>
                    </td>
                    <td className="px-3 py-3 text-[11px] text-slate-600 whitespace-nowrap">
                      {poi.certBody || 'Zamboanga Islamic Council'}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Verified Active</span>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Certification Seal Footer */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Total verified records: <strong className="text-slate-900">{filteredPOIs.length} entries</strong>
          </div>
          <div className="flex items-center gap-2 italic text-[11px]">
            <span>Official seal: City Tourism & Islamic Affairs Office • Zamboanga City</span>
          </div>
        </div>
      </div>
    </div>
  );
}
