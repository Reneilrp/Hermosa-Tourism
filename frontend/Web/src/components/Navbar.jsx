import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Calendar,
  Menu,
  Settings,
  LogOut,
  ChevronDown,
  Search,
  Sun,
  Moon,
  Compass,
} from 'lucide-react';

export default function Navbar({
  activeTab = 'dashboard',
  poiCount = 27,
  onToggleSidebar,
  adminUser,
  onOpenSettings,
  onLogout,
  onOpenCommandPalette,
  onOpenPublicMsme,
  theme = 'light',
  onToggleTheme,
  onViewLandingPage,
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Package A Booking (2 Pax)',
      description: 'Ahmad bin Abdullah (Malaysia) requested booking confirmation.',
      time: '5m ago',
      unread: true,
      type: 'package',
    },
    {
      id: 2,
      title: 'New MSME Halal Self-Declaration',
      description: 'Al-Mubarak Satti (Basilan) submitted kitchen affidavit.',
      time: '15m ago',
      unread: true,
      type: 'msme',
    },
    {
      id: 3,
      title: 'Ablution Water Audit Passed',
      description: 'Masjid Baliwasan WMSU running water & female hall verified.',
      time: '1h ago',
      unread: false,
      type: 'mosque',
    },
  ]);

  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Unified Tab Metadata contract
  const TAB_META = {
    dashboard: {
      title: 'Executive Overview',
      subtitle: 'Unified Command & Telemetry for Zamboanga City',
      badge: 'Live Operations',
    },
    pois: {
      title: 'Place & Mosque Directory',
      subtitle: `${poiCount} verified locations across Zamboanga City`,
      badge: `${poiCount} Places`,
    },
    msme: {
      title: 'MSME Halal Onboarding',
      subtitle: 'Local restaurant & food stall self-declaration review queue',
      badge: 'Intake Queue',
    },
    packages: {
      title: 'Tour Packages & Guide Operations',
      subtitle: 'Tour Package A, B, C reservations & bilingual guide rosters',
      badge: 'Experience Hub',
    },
    certificates: {
      title: 'Halal Certificate Audits',
      subtitle: 'NCMF certification validity & early expiration alerts',
      badge: 'NCMF Audits',
    },
    mosques: {
      title: 'Mosque & Facilities',
      subtitle: 'Wudu running water and female prayer hall verification',
      badge: 'Mosque Facilities Verified',
    },
    reviews: {
      title: 'Community Reviews',
      subtitle: 'Pilgrim check-ins and verified visit ratings moderation',
      badge: 'Community Review',
    },
    reports: {
      title: 'Registry Export & Reports',
      subtitle: 'Official LGU & DOT Region IX compliance registries',
      badge: 'Official Registry',
    },
  };

  const currentMeta = TAB_META[activeTab] || TAB_META.dashboard;

  return (
    <header className="h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-xs z-40 relative">
      {/* 1. LEFT: Breadcrumb & Contextual Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2 truncate">
              <span>{currentMeta.title}</span>
            </h1>

            {currentMeta.badge && (
              <span className="hidden sm:inline-flex items-center text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                {currentMeta.badge}
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate hidden md:block mt-0.5">
            {currentMeta.subtitle}
          </p>
        </div>
      </div>

      {/* 2. MIDDLE: Quick Command Search & Contextual Action */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200/90 dark:border-slate-700 px-3.5 py-1.5 rounded-xl text-xs text-slate-500 dark:text-slate-300 font-medium transition-all cursor-pointer shadow-2xs group"
          title="Open global search (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-400" />
          <span>Search places, masjids, bookings...</span>
          <kbd className="ml-1.5 font-mono text-[10px] bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 px-1.5 py-0.5 rounded-md text-slate-600 dark:text-slate-300 shadow-2xs">
            ⌘K
          </kbd>
        </button>

        {activeTab === 'msme' && onOpenPublicMsme && (
          <button
            onClick={onOpenPublicMsme}
            className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <span>+ Open Public Form</span>
          </button>
        )}

        <div className="hidden 2xl:flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>
            14 Safar 1448 AH •{' '}
            {new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>

      {/* 3. RIGHT: Unified Personal Cockpit (Notification Bell + Profile Group) */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {onViewLandingPage && (
          <button
            onClick={onViewLandingPage}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            title="View Public Zamboanga Tourism Landing Page"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Visitor Portal</span>
          </button>
        )}

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all relative cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden"
            aria-label="View system notifications"
            aria-expanded={showNotifications}
            aria-haspopup="true"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-2 right-2 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-3 z-50 ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold px-1.5 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 text-xs hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors ${
                      notif.unread ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="font-bold text-slate-800 dark:text-slate-200">{notif.title}</span>
                      <span className="text-[10px] text-slate-400 shrink-0">{notif.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-tight">
                      {notif.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="px-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                <span className="text-[10px] font-bold text-slate-400">
                  Zamboanga City Tourism & Islamic Affairs Notice Board
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Vertical Divider separating Utility from Profile */}
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-0.5 hidden xs:block" />

        {/* Admin User Profile Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden"
            aria-label="User account menu"
            aria-expanded={showUserMenu}
            aria-haspopup="true"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-extrabold text-[11px] flex items-center justify-center shadow-xs shrink-0">
              {adminUser?.name
                ? adminUser.name
                    .split(' ')
                    .map((n) => n[0])
                    .filter((c) => c && c.match(/[A-Z]/i))
                    .slice(0, 2)
                    .join('')
                : 'TO'}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 leading-tight truncate max-w-[130px]">
                {adminUser?.name || 'Engr. Nur-Hassan Ahmad'}
              </div>
              <div className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold leading-tight">
                {adminUser?.role ? 'Chief Tourism Officer' : 'Session Active'}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {/* Profile Popover */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50 ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <div className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                  {adminUser?.name || 'Engr. Nur-Hassan Ahmad'}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {adminUser?.email || 'admin@vintago.ph'}
                </div>
                <span className="inline-block mt-1 text-[9px] font-extrabold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md">
                  {adminUser?.department || 'Zamboanga City Gov'}
                </span>
              </div>

              <div className="p-1.5 space-y-1">
                {/* Theme Selector inside Profile Popover */}
                {onToggleTheme && (
                  <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold">
                      {theme === 'dark' ? (
                        <Moon className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Sun className="w-4 h-4 text-amber-500" />
                      )}
                      <span>Theme</span>
                    </div>
                    <button
                      type="button"
                      onClick={onToggleTheme}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] font-extrabold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer shadow-2xs"
                      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                      <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
                      <span className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-emerald-400' : 'bg-amber-500'}`} />
                    </button>
                  </div>
                )}

                {onViewLandingPage && (
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onViewLandingPage();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>View Visitor Landing Page</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    if (onOpenSettings) onOpenSettings();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span>System & Agency Settings</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    if (onLogout) onLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-500 dark:text-red-400" />
                  <span>Sign Out of Command Center</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
