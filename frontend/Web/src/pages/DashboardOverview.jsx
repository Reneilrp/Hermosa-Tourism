import React, { useState } from 'react';
import {
  Building2,
  Moon,
  Utensils,
  ShieldCheck,
  MapPin,
  ChevronUp,
  ChevronDown,
  X,
  Plus,
  FileSpreadsheet,
  Calendar,
  Compass,
  Star,
  ExternalLink,
} from 'lucide-react';
import InteractiveMapPicker from '../components/InteractiveMapPicker';

export default function DashboardOverview({ pois = [], onAddNewPOI, onSelectTab }) {
  const [bannerState, setBannerState] = useState('expanded'); // 'expanded' | 'minimized' | 'hidden'

  const mosquesCount = pois.filter((p) => p.category === 'worship').length;
  const diningCount = pois.filter((p) => p.category === 'dining').length;
  const certifiedCount = pois.filter((p) => p.tier === 'tier1').length;
  const muslimOwnedCount = pois.filter((p) => p.tier === 'tier2').length;

  const stats = [
    {
      label: 'Verified Halal & Islamic Sites',
      value: pois.length,
      icon: Building2,
      subtext: 'Zamboanga City & Regional Ports',
      accent: 'border-emerald-600',
      iconBg: 'bg-emerald-50 text-emerald-700',
    },
    {
      label: 'Masjids & Campus Mosques',
      value: mosquesCount,
      icon: Moon,
      subtext: 'Includes Sadik Grand & Taluksangay',
      accent: 'border-teal-600',
      iconBg: 'bg-teal-50 text-teal-700',
    },
    {
      label: 'Tier 1 NCMF Halal Certified',
      value: certifiedCount,
      icon: ShieldCheck,
      subtext: 'Official Halal Board Endorsed',
      accent: 'border-amber-500',
      iconBg: 'bg-amber-50 text-amber-700',
    },
    {
      label: 'Muslim-Owned Native Dining',
      value: diningCount,
      icon: Utensils,
      subtext: 'Authentic Moro & Tausug Kitchens',
      accent: 'border-blue-600',
      iconBg: 'bg-blue-50 text-blue-700',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. INSTITUTIONAL COMMAND BRIEFING STRIP (EXPANDED) */}
      {bannerState === 'expanded' && (
        <div className="bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/40 text-slate-900 rounded-3xl p-6 sm:p-7 border border-emerald-200/80 shadow-xs relative overflow-hidden dark:bg-slate-900 dark:text-white dark:border-slate-800 dark:shadow-xl dark:from-transparent dark:to-transparent">
          {/* Subtle Islamic Geometrical Hairline Accent */}
          <div className="absolute right-0 top-0 bottom-0 w-96 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent" />

          {/* Minimize / Close Header Buttons (Kept at z-10 so they never clip Navbar dropdowns) */}
          <div className="absolute top-5 right-5 z-10 flex items-center gap-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xs p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <button
              type="button"
              onClick={() => setBannerState('minimized')}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700 transition-colors cursor-pointer"
              title="Minimize Briefing Strip"
              aria-label="Minimize Briefing Strip"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setBannerState('hidden')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              title="Dismiss Strip"
              aria-label="Dismiss Strip"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative z-0 max-w-3xl space-y-4">
            {/* Telemetry Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300/80 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-700/60">
                <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Zamboanga City Command Center
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white text-slate-700 border border-slate-200 shadow-2xs px-3 py-1 rounded-full text-[11px] font-semibold dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                <Calendar className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                14 Safar 1448 AH • {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white text-emerald-800 border border-emerald-200 shadow-2xs px-3 py-1 rounded-full text-[11px] font-semibold dark:bg-slate-800 dark:text-emerald-400 dark:border-slate-700">
                <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Prayer Times Active • Zamboanga City
              </span>
            </div>

            {/* Official Title (Preserves Test Target) */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Zamboanga City Tourism & Islamic Affairs Dashboard
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed font-normal">
                Unified Halal accreditation registry, mosque ablution audit authority, and cultural tourism packages for Western Mindanao.
              </p>
            </div>

            {/* Operational Action Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onAddNewPOI}
                className="bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-700/20 dark:shadow-emerald-950/40 cursor-pointer flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Register New Place / Mosque</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('reports')}
                className="bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 transition-all cursor-pointer flex items-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Export Official Registry (PDF / JSON)</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('packages')}
                className="bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 transition-all cursor-pointer flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>View Tour Packages & Guides</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. MINIMIZED TELEMETRY BAR */}
      {bannerState === 'minimized' && (
        <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl px-5 py-3 border border-emerald-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-600/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/40 flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="text-xs font-black text-slate-900 dark:text-white tracking-tight mr-2">
                Zamboanga City Tourism & Islamic Affairs Dashboard
              </span>
              <span className="hidden md:inline-block text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                • 14 Safar 1448 AH • Basilan Sea-Lanes Active
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onAddNewPOI}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Register</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('reports')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 font-bold text-xs px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-all cursor-pointer hidden sm:flex items-center gap-1.5"
            >
              <span>Export</span>
            </button>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1" />

            <button
              type="button"
              onClick={() => setBannerState('expanded')}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Expand Briefing Strip"
              aria-label="Expand Briefing Strip"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setBannerState('hidden')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Dismiss Strip"
              aria-label="Dismiss Strip"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. DISMISSED BANNER RESTORE PILL */}
      {bannerState === 'hidden' && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setBannerState('expanded')}
            className="text-[11px] font-extrabold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Show Command Briefing</span>
          </button>
        </div>
      )}

      {/* 4. MONOCHROME PRECISION BENTO STAT TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className={`bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between border-t-4 ${stat.accent}`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </span>
                <div className={`w-9 h-9 rounded-xl ${stat.iconBg} flex items-center justify-center shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4">
                <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight font-mono tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-1 truncate">
                  {stat.subtext}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. GIS MUNICIPAL MAP & CERTIFIED LANDMARKS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Map Coverage */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Zamboanga City GIS Landmark & Mosque Pinpoints</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Hardware-rendered spatial coordinates anchored on WMSU, Taluksangay, and Sadik Grand Mosque
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectTab('pois')}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              <span>Open Full Registry</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="flex-1 min-h-[340px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <InteractiveMapPicker
              latitude={6.9580}
              longitude={122.1400}
              onCoordinatesChange={() => {}}
              height="340px"
            />
          </div>
        </div>

        {/* Right Col: High-Profile Halal Highlights */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Featured Landmarks</h3>
              <span className="text-[10px] font-extrabold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-md">
                Verified
              </span>
            </div>

            <div className="space-y-3">
              {pois.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelectTab('pois')}
                  className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all cursor-pointer"
                >
                  <img
                    src={p.image || 'https://images.unsplash.com/photo-1544025162-d76694265947'}
                    alt={p.name}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-200 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{p.name}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{p.address}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] font-extrabold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-1.5 py-0.5 rounded">
                        {p.tier === 'tier1' ? 'NCMF Tier 1' : 'Muslim-Owned'}
                      </span>
                      {p.rating && (
                        <span className="text-[10px] text-amber-700 dark:text-amber-400 font-extrabold flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {p.rating}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectTab('pois')}
            className="w-full mt-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-extrabold transition-all text-center cursor-pointer"
          >
            Manage All {pois.length} Registered Sites &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
