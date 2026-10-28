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
  Store,
  Briefcase,
  X,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  counts = {},
  isOpen = false,
  onClose = () => {},
  isCollapsed = false,
  onToggleCollapse = () => {},
  adminUser,
  onOpenSettings,
  onLogout,
}) {
  const navigationGroups = [
    {
      group: 'Operations & Tours',
      items: [
        { id: 'dashboard', label: 'Executive Overview', icon: LayoutDashboard, badge: null },
        {
          id: 'pois',
          label: 'Place & Mosque Directory',
          icon: MapPin,
          badge: counts.pois !== undefined ? `${counts.pois}` : '27',
        },
        {
          id: 'packages',
          label: 'Packages & Bookings',
          icon: Briefcase,
          badge: counts.bookings !== undefined ? `${counts.bookings} Bookings` : '3 Inquiries',
        },
      ],
    },
    {
      group: 'Governance & Compliance',
      items: [
        {
          id: 'msme',
          label: 'MSME Halal Onboarding',
          icon: Store,
          badge: counts.pendingMsme !== undefined ? `${counts.pendingMsme} Pending` : '2 Review',
        },
        { id: 'certificates', label: 'Halal Certificate Audits', icon: FileCheck2, badge: 'Active' },
        {
          id: 'mosques',
          label: 'Mosque & Facilities',
          icon: Moon,
          badge: counts.mosques !== undefined ? `${counts.mosques}` : '9',
        },
      ],
    },
    {
      group: 'Intelligence & Reports',
      items: [
        {
          id: 'reviews',
          label: 'Community Reviews',
          icon: MessageSquare,
          badge: counts.reviews !== undefined ? `${counts.reviews}` : 'New',
        },
        { id: 'reports', label: 'Registry Export & Reports', icon: FileSpreadsheet, badge: null },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex flex-col shrink-0 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-68'}`}
      >
        {/* Brand Header */}
        <div className={`p-4 border-b border-slate-200 dark:border-slate-800 flex items-center ${isCollapsed ? 'flex-col gap-3 justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#BF1F46] via-[#E82955] to-[#FECB00] flex items-center justify-center shadow-md shadow-[#BF1F46]/20 dark:shadow-[#BF1F46]/40 shrink-0">
              <Compass className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <h1 className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 whitespace-nowrap">
                  VintaGo<span className="text-amber-600 dark:text-amber-400">Admin</span>
                </h1>
                <p className="text-[10px] text-[#BF1F46] dark:text-[#FECB00] font-semibold flex items-center gap-1 whitespace-nowrap">
                  <ShieldCheck className="w-3 h-3 text-[#FECB00]" /> Zamboanga City Portal
                </p>
              </div>
            )}
          </div>

          {/* 3 Horizontal Lines (Hamburger) Collapse / Expand Button on Opposite Side */}
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer hidden lg:flex items-center justify-center"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 lg:hidden cursor-pointer"
            aria-label="Close sidebar menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
          {navigationGroups.map((groupSection, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {!isCollapsed ? (
                <div className="px-3 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  {groupSection.group}
                </div>
              ) : (
                <div className="h-px bg-slate-200 dark:bg-slate-800 mx-2 my-2" />
              )}
              {groupSection.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      onClose();
                    }}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#FFF0F8] text-[#BF1F46] font-bold shadow-xs border-l-4 border-[#BF1F46] dark:border-l-0 dark:bg-[#433458] dark:text-[#FECB00] dark:shadow-md'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-[#FFF0F8]/50 font-medium dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/70'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <div className={`flex items-center gap-2.5 min-w-0 ${isCollapsed ? 'justify-center' : 'pr-2'}`}>
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#BF1F46] dark:text-[#FECB00]' : 'text-slate-500 dark:text-slate-400'}`} />
                      {!isCollapsed && (
                        <span className="truncate whitespace-nowrap text-[12px]">{item.label}</span>
                      )}
                    </div>
                    {!isCollapsed && item.badge && (
                      <span
                        className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shrink-0 ${
                          isActive
                            ? 'bg-[#FFDEF6] text-[#BF1F46] dark:bg-[#433458] dark:text-[#FECB00]'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Interactive User & Settings Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-950/70">
          <div className={`flex items-center gap-2 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 dark:bg-amber-400/20 dark:border-amber-400/40 dark:text-amber-300 flex items-center justify-center font-extrabold text-xs shrink-0">
                {adminUser?.name
                  ? adminUser.name
                      .split(' ')
                      .map((n) => n[0])
                      .filter((c) => c && c.match(/[A-Z]/i))
                      .slice(0, 2)
                      .join('')
                  : 'TO'}
              </div>
              {!isCollapsed && (
                <div className="text-xs min-w-0">
                  <div className="font-extrabold text-slate-900 dark:text-slate-200 truncate">
                    {adminUser?.name || 'Tourism Officer'}
                  </div>
                  <div className="text-emerald-700 dark:text-emerald-400 text-[10px] truncate flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                    Online • Command
                  </div>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => {
                    if (onOpenSettings) onOpenSettings();
                    onClose();
                  }}
                  title="System Settings"
                  aria-label="Open system settings"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (onLogout) onLogout();
                    onClose();
                  }}
                  title="Sign Out"
                  aria-label="Sign out of admin"
                  className="p-1.5 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
