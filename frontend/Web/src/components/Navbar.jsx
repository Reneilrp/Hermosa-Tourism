import React from 'react';
import {
  Bell,
  Search,
  Plus,
  Download,
  Printer,
  ShieldCheck,
  Calendar,
  Sparkles,
  CheckCircle2,
  Filter,
  FileCheck2,
  Moon,
  MapPin,
  RefreshCw,
  X,
} from 'lucide-react';

export default function Navbar({
  activeTab,
  searchTerm,
  setSearchTerm,
  onAddNewPOI,
  poiCount = 13,
  onExportJSON,
  onPrintReport,
}) {
  const clearSearch = () => setSearchTerm('');

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-6 flex items-center justify-between shrink-0 shadow-xs z-20">
      {/* 1. DASHBOARD OVERVIEW HEADER */}
      {activeTab === 'dashboard' && (
        <>
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Executive Overview</span>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  API Live • Zamboanga City
                </span>
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Halal tourism landmarks, masjids & certification pipeline
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>14 Safar 1448 AH • {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>

            <button
              onClick={onAddNewPOI}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Landmark</span>
            </button>

            <button className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-all relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-2 right-2 ring-2 ring-white" />
            </button>
          </div>
        </>
      )}

      {/* 2. PLACE & MOSQUE DIRECTORY HEADER (Includes Search Query) */}
      {activeTab === 'pois' && (
        <>
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Place & Mosque Directory</span>
                <span className="bg-slate-100 text-slate-700 text-[11px] font-extrabold px-2 py-0.5 rounded-md">
                  {poiCount} Venues
                </span>
              </h2>
              <p className="text-[11px] text-slate-500">
                Manage coordinates, categories, and Halal verification tiers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Query */}
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search places in Zamboanga..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-7 py-1.5 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              />
              {searchTerm.length > 0 && (
                <button onClick={clearSearch} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={onAddNewPOI}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Place / Mosque</span>
            </button>
          </div>
        </>
      )}

      {/* 3. HALAL CERTIFICATE AUDITS HEADER (Includes Search Query) */}
      {activeTab === 'certificates' && (
        <>
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Halal Certificate Audits</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-emerald-200">
                  NCMF & Council
                </span>
              </h2>
              <p className="text-[11px] text-slate-500">
                Inspect proof documents, certifying authorities, and expiration status
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Query */}
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search cert ID, body, or venue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-7 py-1.5 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              />
              {searchTerm.length > 0 && (
                <button onClick={clearSearch} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => alert('Certificate audit registration')}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>Audit New Cert</span>
            </button>
          </div>
        </>
      )}

      {/* 4. MOSQUE FACILITIES HEADER (Includes Search Query) */}
      {activeTab === 'mosques' && (
        <>
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Mosque Facilities & Ablution Audit</span>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-emerald-200">
                  8 Masjids
                </span>
              </h2>
              <p className="text-[11px] text-slate-500">
                Wudu water stations, separate female mezzanine halls, and prayer spaces
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Query for Mosques */}
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search masjids or barangay..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-7 py-1.5 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              />
              {searchTerm.length > 0 && (
                <button onClick={clearSearch} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={onAddNewPOI}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register Masjid</span>
            </button>
          </div>
        </>
      )}

      {/* 5. REVIEW MODERATION HEADER (Includes Search Query) */}
      {activeTab === 'reviews' && (
        <>
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Community Review Moderation</span>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                  Active Queue
                </span>
              </h2>
              <p className="text-[11px] text-slate-500">
                Verify pilgrim visit checkmarks and maintain authentic reviews
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Query for Reviews */}
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search reviewer, venue, feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-7 py-1.5 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              />
              {searchTerm.length > 0 && (
                <button onClick={clearSearch} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => alert('All verified visitor reviews marked as active.')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve All</span>
            </button>
          </div>
        </>
      )}

      {/* 6. REGISTRY EXPORT & REPORTS HEADER (Includes Search Query) */}
      {activeTab === 'reports' && (
        <>
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Official Registry & Reports</span>
                <span className="bg-slate-100 text-slate-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                  2026 Edition
                </span>
              </h2>
              <p className="text-[11px] text-slate-500">
                City Tourism Office & NCMF official compliance format
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Query for Registry table preview */}
            <div className="relative w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter table rows..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-7 py-1.5 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              />
              {searchTerm.length > 0 && (
                <button onClick={clearSearch} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={onExportJSON}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={onPrintReport}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Printer className="w-4 h-4" />
              <span>Print PDF</span>
            </button>
          </div>
        </>
      )}
    </header>
  );
}
