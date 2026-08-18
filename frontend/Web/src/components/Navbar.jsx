import React from 'react';
import { Bell, Search, Globe, ShieldCheck, MapPin } from 'lucide-react';

export default function Navbar({ searchTerm, setSearchTerm, onAddNewPOI }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-xs">
      {/* Search Input */}
      <div className="flex items-center gap-3 w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search verified mosques, restaurants, certificates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-800">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>Zamboanga City (6.93° N, 122.10° E)</span>
        </div>

        <button
          onClick={onAddNewPOI}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>+ Add New Place / Mosque</span>
        </button>

        <div className="h-6 w-px bg-slate-200" />

        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-all relative">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-2 right-2 ring-2 ring-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
