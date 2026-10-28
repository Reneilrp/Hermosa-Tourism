import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  MapPin,
  Briefcase,
  Store,
  FileCheck2,
  Moon,
  MessageSquare,
  FileSpreadsheet,
  LayoutDashboard,
  ArrowRight,
  CornerDownLeft,
} from 'lucide-react';

export default function CommandPaletteModal({
  isOpen,
  onClose,
  onNavigate,
  pois = [],
  msmeApps = [],
  bookings = [],
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global keyboard shortcut to open/close
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent, but if triggered here
          onClose(true); // signal to toggle open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Index searchable items
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();

    // 1. Navigation Pages
    const pages = [
      { id: 'dashboard', title: 'Executive Overview', category: 'Navigation', icon: LayoutDashboard, tab: 'dashboard' },
      { id: 'pois', title: 'Place & Mosque Directory', category: 'Navigation', icon: MapPin, tab: 'pois' },
      { id: 'packages', title: 'Packages & Bookings', category: 'Navigation', icon: Briefcase, tab: 'packages' },
      { id: 'msme', title: 'MSME Halal Onboarding Queue', category: 'Navigation', icon: Store, tab: 'msme' },
      { id: 'certificates', title: 'Halal Certificate Audits', category: 'Navigation', icon: FileCheck2, tab: 'certificates' },
      { id: 'mosques', title: 'Mosque & Facilities Inspector', category: 'Navigation', icon: Moon, tab: 'mosques' },
      { id: 'reviews', title: 'Pilgrim Review Moderation', category: 'Navigation', icon: MessageSquare, tab: 'reviews' },
      { id: 'reports', title: 'Official Registry Export & Reports', category: 'Navigation', icon: FileSpreadsheet, tab: 'reports' },
    ];

    // 2. POIs & Masjids
    const poiItems = pois.slice(0, 15).map((p) => ({
      id: `poi-${p.id}`,
      title: p.name,
      subtitle: `${p.category || 'Location'} • ${p.address || 'Zamboanga City'}`,
      category: 'Places & Masjids',
      icon: MapPin,
      tab: 'pois',
    }));

    // 3. MSME Applications
    const msmeItems = msmeApps.slice(0, 8).map((m) => ({
      id: `msme-${m.id}`,
      title: m.business_name,
      subtitle: `Owner: ${m.owner_name} • ${m.application_number}`,
      category: 'MSME Halal Applications',
      icon: Store,
      tab: 'msme',
    }));

    // 4. Bookings
    const bookingItems = bookings.slice(0, 8).map((b) => ({
      id: `book-${b.id}`,
      title: `${b.booking_reference} • ${b.user_name || 'Traveler'}`,
      subtitle: `${b.pax_count || 2} Pax • ${b.package?.title || 'Heritage Tour'}`,
      category: 'Package Reservations',
      icon: Briefcase,
      tab: 'packages',
    }));

    const all = [...pages, ...poiItems, ...msmeItems, ...bookingItems];

    if (!q) {
      return pages; // show main pages when query is empty
    }

    return all.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSub = item.subtitle ? item.subtitle.toLowerCase().includes(q) : false;
      const matchCat = item.category.toLowerCase().includes(q);
      return matchTitle || matchSub || matchCat;
    }).slice(0, 12);
  }, [query, pois, msmeApps, bookings]);

  // Arrow key navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (searchResults.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + searchResults.length) % (searchResults.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = searchResults[selectedIndex];
      if (selected && onNavigate) {
        onNavigate(selected.tab);
        onClose();
      }
    }
  };

  const handleSelectItem = (item) => {
    if (onNavigate) {
      onNavigate(item.tab);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a service, masjid, package, or booking..."
            className="w-full text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block font-mono text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 shrink-0">
            ESC to close
          </span>
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {searchResults.length === 0 ? (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-xs">
              <Search className="w-6 h-6 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <div className="font-bold text-slate-700 dark:text-slate-300">No results found for "{query}"</div>
              <p className="text-slate-400 dark:text-slate-500 mt-0.5">Try searching for "Mosque", "Aleson", "MSME", or "Basilan".</p>
            </div>
          ) : (
            searchResults.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 shadow-2xs'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-black truncate">{item.title}</div>
                      {item.subtitle ? (
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {item.subtitle}
                        </div>
                      ) : (
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-0.5">
                          {item.category}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {item.category}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer Keyboard Legend */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 px-1.5 py-0.5 rounded-md shadow-2xs text-[10px]">
                ↑
              </kbd>
              <kbd className="font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 px-1.5 py-0.5 rounded-md shadow-2xs text-[10px]">
                ↓
              </kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 px-1.5 py-0.5 rounded-md shadow-2xs text-[10px] flex items-center">
                <CornerDownLeft className="w-2.5 h-2.5" />
              </kbd>
              <span>to select</span>
            </span>
          </div>

          <span className="text-emerald-800 dark:text-emerald-400 font-bold">
            Zamboanga City Command Index
          </span>
        </div>
      </div>
    </div>
  );
}
