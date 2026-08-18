import React from 'react';
import {
  LayoutDashboard,
  MapPin,
  FileCheck2,
  Moon,
  MessageSquare,
  FileSpreadsheet,
  Compass,
  ShieldCheck,
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard, badge: null },
    { id: 'pois', label: 'Place & Mosque Directory', icon: MapPin, badge: '16' },
    { id: 'certificates', label: 'Halal Certificate Audits', icon: FileCheck2, badge: '3 Active' },
    { id: 'mosques', label: 'Mosque & Prayer Facilities', icon: Moon, badge: '8' },
    { id: 'reviews', label: 'Community Review Moderation', icon: MessageSquare, badge: 'New' },
    { id: 'reports', label: 'Registry Export & Reports', icon: FileSpreadsheet, badge: null },
  ];

  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col shrink-0 border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-900/50 shrink-0">
          <Compass className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <h1 className="text-sm font-extrabold tracking-tight text-white flex items-center gap-1.5 whitespace-nowrap">
            Hermosa<span className="text-amber-400">Admin</span>
          </h1>
          <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 whitespace-nowrap">
            <ShieldCheck className="w-3 h-3" /> Zamboanga City Portal
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-3.5 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">
          Main Administration
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70 font-medium'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate whitespace-nowrap text-[12px]">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shrink-0 ${
                    isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-xs shrink-0">
            TO
          </div>
          <div className="text-xs min-w-0">
            <div className="font-bold text-slate-200 truncate">Tourism Officer</div>
            <div className="text-slate-500 text-[10px] truncate">Zamboanga City Gov</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
