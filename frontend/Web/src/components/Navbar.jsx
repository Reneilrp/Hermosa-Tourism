import React from 'react';
import {
  Bell,
  Plus,
  Download,
  Printer,
  Calendar,
  CheckCircle2,
  FileCheck2,
  Moon,
} from 'lucide-react';

export default function Navbar({
  activeTab,
  onAddNewPOI,
  poiCount = 16,
  onExportJSON,
  onPrintReport,
}) {
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
                Halal tourism directory, mosque ablution audit & compliance registry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>14 Safar 1448 AH • {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>

            <button
              onClick={() => onAddNewPOI('worship')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Place / Mosque</span>
            </button>

            <button className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-all relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-2 right-2 ring-2 ring-white" />
            </button>
          </div>
        </>
      )}

      {/* 2. PLACE & MOSQUE DIRECTORY HEADER */}
      {activeTab === 'pois' && (
        <>
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Place & Mosque Directory</span>
                <span className="bg-slate-100 text-slate-700 text-[11px] font-extrabold px-2 py-0.5 rounded-md">
                  {poiCount} Registered
                </span>
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Manage GPS coordinates, categories, and Halal verification tiers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onAddNewPOI('worship')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Place / Mosque</span>
            </button>
          </div>
        </>
      )}

      {/* 3. HALAL CERTIFICATE AUDITS HEADER */}
      {activeTab === 'certificates' && (
        <>
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Halal Certificate Audits</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-emerald-200">
                  NCMF & Islamic Council
                </span>
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Inspect proof documents, certifying authorities, and expiration status
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onAddNewPOI('dining')}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>Add Place for Audit</span>
            </button>
          </div>
        </>
      )}

      {/* 4. MOSQUE FACILITIES HEADER */}
      {activeTab === 'mosques' && (
        <>
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Mosque Facilities & Ablution Audit</span>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-emerald-200">
                  9 Masjids Covered
                </span>
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Wudu water stations, separate female mezzanine halls, and prayer spaces
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onAddNewPOI('worship')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Register New Mosque / Masjid</span>
            </button>
          </div>
        </>
      )}

      {/* 5. REVIEW MODERATION HEADER */}
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
              <p className="text-[11px] text-slate-500 font-medium">
                Verify pilgrim visit checkmarks and maintain authentic reviews
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('All verified visitor reviews approved.')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve All Verified</span>
            </button>
          </div>
        </>
      )}

      {/* 6. REGISTRY EXPORT & REPORTS HEADER */}
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
              <p className="text-[11px] text-slate-500 font-medium">
                City Tourism Office & NCMF official compliance format
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
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
