import React, { useState } from 'react';
import {
  Building2,
  Moon,
  Utensils,
  ShoppingBag,
  FileCheck,
  Star,
  ArrowUpRight,
  ShieldCheck,
  MapPin,
  Sparkles,
  ChevronUp,
  ChevronDown,
  X,
  Plus,
  FileSpreadsheet,
} from 'lucide-react';
import InteractiveMapPicker from '../components/InteractiveMapPicker';

export default function DashboardOverview({ pois, onAddNewPOI, onSelectTab }) {
  const [bannerState, setBannerState] = useState('expanded'); // 'expanded' | 'minimized' | 'hidden'

  const mosquesCount = pois.filter((p) => p.category === 'worship').length;
  const diningCount = pois.filter((p) => p.category === 'dining').length;
  const certifiedCount = pois.filter((p) => p.tier === 'tier1').length;
  const muslimOwnedCount = pois.filter((p) => p.tier === 'tier2').length;

  const stats = [
    { label: 'Total Verified Places', value: pois.length, icon: Building2, change: '+100% Zamboanga City', color: 'from-emerald-600 to-teal-700' },
    { label: 'Mosques & Masjids', value: mosquesCount, icon: Moon, change: 'Includes Sadik Grand Mosque', color: 'from-emerald-700 to-emerald-900' },
    { label: 'Halal Certified (Tier 1)', value: certifiedCount, icon: ShieldCheck, change: 'NCMF & Islamic Council', color: 'from-amber-600 to-amber-700' },
    { label: 'Muslim-Owned Dining', value: diningCount, icon: Utensils, change: 'Tausug Satti & Tiula Itum', color: 'from-blue-600 to-indigo-700' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. EXPANDED WELCOME HERO BANNER */}
      {bannerState === 'expanded' && (
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden border border-emerald-900/40 shadow-lg transition-all duration-300">
          {/* Top-Right Minimize & Close Controls */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-xs p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setBannerState('minimized')}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              title="Minimize Banner"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => setBannerState('hidden')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/10 transition-all cursor-pointer"
              title="Close Banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Ciudad Hermosa Halal Tourism & Mosque Network
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              Zamboanga City Tourism & Islamic Affairs Dashboard
            </h2>
            <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
              Manage verified Halal food establishments, mosque wudu & female mezzanine facilities, and GPS coordinates centered around WMSU, Mercedes Grand Mosque, and Taluksangay.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onAddNewPOI}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition-all shadow cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Register New Place / Mosque</span>
              </button>
              <button
                onClick={() => onSelectTab('reports')}
                className="bg-white/10 hover:bg-white/15 text-white font-semibold text-xs px-4 py-2 rounded-xl border border-white/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export Official Registry (PDF/Excel)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. MINIMIZED SLIM WELCOME BANNER */}
      {bannerState === 'minimized' && (
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-xl px-4 py-2.5 text-white flex items-center justify-between border border-emerald-900/40 shadow-sm transition-all duration-300">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs font-extrabold tracking-tight">
              Ciudad Hermosa Halal Tourism & Mosque Network
            </span>
            <span className="hidden md:inline-block text-[11px] text-slate-400">
              • Zamboanga City Islamic Affairs
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onAddNewPOI}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              <span>Register</span>
            </button>
            <button
              onClick={() => onSelectTab('reports')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px] px-3 py-1 rounded-lg border border-white/20 transition-all cursor-pointer"
            >
              Export
            </button>

            <div className="h-4 w-px bg-slate-700 mx-1" />

            <button
              onClick={() => setBannerState('expanded')}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              title="Expand Banner"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => setBannerState('hidden')}
              className="p-1 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/10 transition-all cursor-pointer"
              title="Close Banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. CLOSED BANNER RESTORE SHORTCUT */}
      {bannerState === 'hidden' && (
        <div className="flex justify-end">
          <button
            onClick={() => setBannerState('expanded')}
            className="text-[11px] font-bold text-slate-500 hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs"
          >
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>Show Overview Banner</span>
          </button>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">{stat.label}</span>
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${stat.color} flex items-center justify-center text-white shadow-sm`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-extrabold text-slate-900">{stat.value}</div>
                <div className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Map of Zamboanga City + Featured Places */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Map of Zamboanga Landmarks */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                Zamboanga City GIS Coverage (Coordinates & Pinpoints)
              </h3>
              <p className="text-xs text-slate-500">Live hardware-rendered map anchored on WMSU and Mercedes Grand Mosque</p>
            </div>
            <button
              onClick={() => onSelectTab('pois')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer"
            >
              View Full Directory &rarr;
            </button>
          </div>
          <div className="flex-1 min-h-[340px]">
            <InteractiveMapPicker
              latitude={6.9580}
              longitude={122.1400}
              onCoordinatesChange={() => {}}
              height="340px"
            />
          </div>
        </div>

        {/* Right Col: Grand Mosques & Halal Highlights */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-extrabold text-slate-900">Featured Landmarks</h3>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                Zamboanga Top
              </span>
            </div>
            <div className="space-y-3">
              {pois.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all cursor-pointer"
                >
                  <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover bg-slate-200 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{p.name}</h4>
                    <p className="text-[11px] text-slate-500 truncate">{p.address}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                        {p.tier === 'tier1' ? 'Tier 1' : 'Tier 2'}
                      </span>
                      <span className="text-[10px] text-amber-600 font-bold flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {p.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onSelectTab('pois')}
            className="w-full mt-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all text-center cursor-pointer"
          >
            Manage All 13 Places
          </button>
        </div>
      </div>
    </div>
  );
}
