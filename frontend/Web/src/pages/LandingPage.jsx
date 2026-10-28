import React, { useState, useMemo } from 'react';
import ScrollShowcase from '../components/ScrollShowcase';
import {
  Compass,
  Ship,
  MapPin,
  Moon,
  Utensils,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Phone,
  ExternalLink,
  Sparkles,
  Sun,
  X,
  FileCheck2,
  Lock,
  Download,
  Star,
  Users,
  Briefcase,
  AlertCircle,
} from 'lucide-react';

export default function LandingPage({
  pois = [],
  packages = [],
  onOpenAdmin,
  onOpenMsme,
  theme = 'light',
  onToggleTheme,
  isAuthenticated = false,
}) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all'); // 'all' | 'worship' | 'dining'
  const [selectedBookingPkg, setSelectedBookingPkg] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    pax: 2,
    date: '',
    notes: '',
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Filtered POIs for Places & Mosques Section
  const filteredPois = useMemo(() => {
    if (activeCategoryFilter === 'all') return pois.slice(0, 6);
    if (activeCategoryFilter === 'promoted') {
      return pois.filter((p) => p.isPromoted || p.accreditationNumber || p.ra9593Compliant).slice(0, 6);
    }
    return pois.filter((p) => p.category === activeCategoryFilter).slice(0, 6);
  }, [pois, activeCategoryFilter]);

  // Fallback packages if not yet loaded
  const displayPackages = useMemo(() => {
    if (packages.length > 0) return packages;
    return [
      {
        package_code: 'package_a',
        code_label: 'PACKAGE A',
        title: 'Guided Tour Package (All-Inclusive)',
        tagline: 'VIP Guided Tour with Accredited Bilingual Guide & Private Transfers',
        badge: 'PRAYER-ALIGNED & ALL-INCLUSIVE',
        price_php: 6500,
        price_unit: '/ person',
        duration: '3 Days / 2 Nights',
        is_prayer_aligned: true,
        inclusions_matrix: {
          transportation: 'Private Air-Conditioned Van with dedicated airport transfers & city circuit navigation',
          fees: 'All Entrance Fees, Environmental Fees & Barangay Cultural Permits included',
          activities: 'Curated Yakan Weaving Demonstration, Tiula Itum masterclass, and Islamic Heritage Q&A',
          attractions: 'Fort Pilar National Museum, Taluksangay Historic Mosque (1885), and Sadik Grand Mosque',
        },
        inclusions: [
          'Accredited Bilingual Tour Guide (English / Chavacano / Tausug / Arabic)',
          'Private Air-Conditioned Van in Zamboanga City',
          'VIP Cultural Pass to Fort Pilar, National Museum & Historic Sites',
          'Pre-Arranged 3-Course Halal Dining at Baitul Maal & Sinned Coffee',
          'VIP Access & History Tour at Taluksangay & Sadik Grand Mosques',
          'Travel Insurance & Regional Security Escort Coordination',
        ],
        prayer_itinerary: [
          { time: '04:30 AM', prayer: 'Fajr', location: 'Taluksangay Historic Mosque', activity: 'Dawn prayer & sunrise historical reflection' },
          { time: '11:45 AM', prayer: 'Dhuhr', location: 'Sadik Grand Mosque (Mercedes)', activity: 'Midday prayer & architectural tour of largest mosque' },
          { time: '03:15 PM', prayer: 'Asr', location: 'Masjid Sta. Barbara', activity: 'Afternoon prayer & community dialogue' },
          { time: '06:00 PM', prayer: 'Maghrib', location: 'Masjid Rio Hondo', activity: 'Sunset prayer overlooking stilt waterways' },
          { time: '07:15 PM', prayer: 'Isha', location: 'Masjid Campo Muslim', activity: 'Night prayer followed by Ralava seafood grill feast' },
        ],
        ideal_for: 'Families, international pilgrims, senior citizens, and first-time visitors.',
      },
      {
        package_code: 'package_b',
        code_label: 'PACKAGE B',
        title: 'Flexible Tour Pass',
        tagline: 'Recommended Itinerary & Pre-Arranged City Logistics',
        badge: 'PRAYER-AWARE & FLEXIBLE',
        price_php: 2400,
        price_unit: '/ person',
        duration: '2-3 Days Flexible',
        is_prayer_aligned: true,
        inclusions_matrix: {
          transportation: 'Hop-on hop-off accredited coaster pass & mapped tricycle fare vouchers',
          fees: 'Heritage conservation stamp pass & express terminal clearance voucher',
          activities: 'Curated self-paced audioguide & artisan workshop coupon',
          attractions: 'Fort Pilar, Canelar Souk Heritage Market, and Pasonanca Natural Park',
        },
        inclusions: [
          'Curated 3-Day Zamboanga Smart Itinerary with Turn-by-Turn GPS',
          'Priority Admission Passes to Heritage Sites & Cultural Centers',
          '15% Exclusive Food Discounts at Partner MSME Halal Eateries',
          'Geo-Triggered Digital Voice Audio Guide at Historic Markers',
          'Real-Time Prayer Times & Qibla Direction Alerts (5 Daily Alarms)',
        ],
        ideal_for: 'Couples, young travelers, and weekend explorers wanting freedom with hassle-free transit.',
      },
      {
        package_code: 'package_c',
        code_label: 'PACKAGE C',
        title: 'Self-Guided DIY Tour',
        tagline: '100% Free & Self-Guided Route Planner',
        badge: '100% FREE / COMMUNITY',
        price_php: 0,
        price_unit: 'Free Platform Access',
        duration: 'Custom / Anytime',
        is_prayer_aligned: false,
        inclusions_matrix: {
          transportation: 'Public transit guide & jeepney line map included in app',
          fees: 'Direct pay-as-you-go at municipal ticket booths',
          activities: 'Independent exploration & community crowd-sourced trails',
          attractions: 'Access to public heritage parks, coastal promenades, and public markets',
        },
        inclusions: [
          'Custom Itinerary Builder: Pin any Mosque, Halal cafe, or landmark',
          '1-Click Offline Data Download for zero-connectivity navigation',
          'Zamboanga City Commuter Transit & Jeepney/Tricycle Route Guide',
          'Direct MSME Stalls Contact Directory (No middleman booking fees)',
          'Community Reviews, Pilgrim Ratings & Verification checkmarks',
        ],
        ideal_for: 'Backpackers, budget solo travelers, students, and autonomous locals.',
      },
    ];
  }, [packages]);

  const showcaseLandmarks = useMemo(() => [
    {
      id: 'sadik-grand-mosque',
      name: 'Sadik Grand Mosque (Mercedes)',
      subtitle: 'Zamboanga City’s Majestic Islamic Sanctuary',
      tag: 'Grand Landmark • All 5 Daily Prayers & Jumu’ah',
      badge: '★ Regional Grand Mosque',
      image: '/SadikGrandMosque.webp',
      altImage: '/SadikGrandMosque2.jpg',
      category: 'worship',
      tier: 'tier1',
      description:
        'Standing gracefully in Barangay Mercedes along the eastern coastal highway, Sadik Grand Mosque is the largest and most architecturally breathtaking Islamic house of worship in Zamboanga City. Featuring soaring twin minarets, radiant golden-green domes, and an expansive multi-tiered prayer hall capable of hosting over 3,500 worshippers, it serves as the spiritual heart of the local Muslim community.',
      stats: [
        { label: 'Qibla Bearing', value: '291° WNW' },
        { label: 'Ablution Area', value: 'Running Water Wudu' },
        { label: 'Women’s Musalla', value: 'Dedicated Mezzanine' },
        { label: 'Coordinates', value: '6.9580° N, 122.1400° E' },
      ],
      highlights: [
        'Friday Congregational Jumu’ah & Eid Assembly',
        'State-of-the-Art Gender-Separated Wudu Stations',
        'Air-Cooled Main Hall with Acoustic Prayer Amplification',
        'Visitor & Group Tour Parking with Wheelchair Access',
      ],
    },
    {
      id: 'taluksangay-mosque',
      name: 'Taluksangay Historic Mosque (1885)',
      subtitle: 'Oldest Islamic Sanctuary in Western Mindanao',
      tag: 'Historical Landmark • Est. 1885 AD',
      badge: 'NHCP Historical Marker',
      image: '/TaluksangayMosque.jpg',
      category: 'worship',
      tier: 'tier1',
      description:
        'Built in 1885 by Hadji Abdullah Maas Nuno, Taluksangay Mosque is the earliest documented center of Islamic propagation in the Zamboanga Peninsula and Western Mindanao. Built over scenic mangrove waterways where colorful vintas once moored, its tranquil green domes and century-old timber foundations have welcomed pilgrims and cultural visitors for nearly 140 years.',
      stats: [
        { label: 'Historical Age', value: '140+ Years (1885)' },
        { label: 'Setting', value: 'Coastal Mangrove Village' },
        { label: 'Ablution', value: 'Traditional Wudu Wells' },
        { label: 'Coordinates', value: '6.9555° N, 122.1795° E' },
      ],
      highlights: [
        'National Historical Commission of the Philippines Marker',
        'Historic Sama Banguingui Heritage Settlement',
        'Scenic Tidal Lagoon & Mangrove Ecosystem',
        'Peaceful Women’s Musalla with Waterfront Breeze',
      ],
    },
    {
      id: 'baitul-maal-bistro',
      name: 'Baitul Maal Native Halal Bistro',
      subtitle: 'Legendary Tausug Tiula Itum & Charcoal Satti',
      tag: 'Certified Halal Dining • Muslim-Owned',
      badge: 'Tier 1 Certified Halal',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      category: 'dining',
      tier: 'tier1',
      description:
        'The culinary pride of Mayor Jaldon Street, Baitul Maal delivers an unforgettable feast of authentic Moro dishes. Master chefs slow-simmer the royal black beef soup Tiula Itum with roasted coconut meat (pamapa itum), alongside flame-grilled spicy beef satti skewers and rich coconut-infused curries. 100% halal ingredients sourced directly from verified local Muslim butchers.',
      stats: [
        { label: 'Signature Dish', value: 'Tiula Itum & Satti' },
        { label: 'Supply Source', value: 'Al-Barakah Halal Meat' },
        { label: 'Amenities', value: 'Musalla & Wudu On-Site' },
        { label: 'Coordinates', value: '6.9125° N, 122.0720° E' },
      ],
      highlights: [
        'Strict Non-Pork & Non-Alcohol Verified Kitchen',
        'Private Customer Prayer Room (Musalla) Upstairs',
        'Charcoal-Grilled Fresh Daily Skewers with Sweet-Spicy Dip',
        'Accredited DOT Halal Gastronomy Partner',
      ],
    },
    {
      id: 'fort-pilar-shrine',
      name: 'Real Fuerte de Nuestra Señora del Pilar (1635)',
      subtitle: '17th-Century Marine Bastion on Basilan Strait',
      tag: 'National Cultural Treasure • Est. 1635',
      badge: 'RA 9593 DOT Heritage',
      image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80',
      category: 'cultural',
      tier: 'tier2',
      description:
        'Erected in 1635 using cut coral blocks from nearby Santa Cruz Island, Fort Pilar has guarded the maritime crossroads of Western Mindanao for nearly four centuries. Now home to the National Museum Western Mindanao branch, it showcases priceless Moro weaponry, ethnological brassware, and traditional Subanen and Sama seafaring artifacts alongside an open-air historical esplanade.',
      stats: [
        { label: 'Age', value: '390+ Years (1635)' },
        { label: 'Status', value: 'National Cultural Treasure' },
        { label: 'Museum', value: 'National Museum of the PH' },
        { label: 'Coordinates', value: '6.9015° N, 122.0818° E' },
      ],
      highlights: [
        'Authentic 17th-Century Cut Coral Stone Ramparts',
        'Marine Cultural Gallery with Full-Scale Vinta Boats',
        'Adjacent to Paseo del Mar Seaside Promenade',
        'Bilingual DOT-Accredited Historical Guide Service',
      ],
    },
    {
      id: 'santa-cruz-island',
      name: 'Great Santa Cruz Island Pink Sand Beach',
      subtitle: 'World-Famous Pink Coral Shores & Protected Lagoon',
      tag: 'Eco-Tourism Sanctuary • Coral Sand',
      badge: 'Protected Marine Sanctuary',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      category: 'cultural',
      tier: 'tier1',
      description:
        'Globally celebrated for its pastel pink shoreline formed by millions of pulverized red organ-pipe coral fragments (Tubipora musica) gently blended with powdery white sand. Visitors can ride iconic hand-carved Vinta sailboats, glide through stingless jellyfish lagoons in paddle boats, and savor freshly grilled seafood prepared by accredited Sama-Banguingui community hosts.',
      stats: [
        { label: 'Eco Limit', value: 'Strict 400 Guests / Day' },
        { label: 'Transit', value: '15 Mins by Motorized Banca' },
        { label: 'Sand Type', value: 'Natural Red Coral Dust' },
        { label: 'Coordinates', value: '6.8683° N, 122.0620° E' },
      ],
      highlights: [
        'Regulated Protected Ecotourism Reserve & Protected Area',
        'Stingless Yellow Jellyfish Lagoon Guided Boat Tour',
        'Iconic Multi-Colored Vinta Sailboat Photo Experience',
        'Accredited Halal Seafood Grilling Pavilions',
      ],
    },
  ], []);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setSelectedBookingPkg(null);
      setBookingSuccess(false);
      setBookingForm({ name: '', email: '', phone: '', pax: 2, date: '', notes: '' });
    }, 2200);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFF0F8] dark:bg-slate-950 text-[#433458] dark:text-slate-100 font-sans selection:bg-[#FFDEF6] selection:text-[#433458] transition-colors duration-200 m-0 p-0" style={{ margin: 0, padding: 0 }}>
      {/* 1. TOP ANCHOR NAVBAR (100% Flush to top with zero space above) */}
      <header
        className="sticky top-0 left-0 right-0 w-full z-50 bg-white/95 dark:bg-[#433458]/95 backdrop-blur-md shadow-xs transition-colors m-0 p-0 border-none"
        style={{ top: 0, marginTop: 0, paddingTop: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-[#BF1F46] via-[#8E1632] to-[#433458] flex items-center justify-center text-[#FECB00] shadow-md shadow-[#BF1F46]/30 border border-[#FECB00]/40">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-black tracking-tight flex items-center gap-1 leading-none">
                <span className="text-[#BF1F46] dark:text-[#FFDEF6]">Vinta</span>
                <span className="text-[#FECB00]">Go</span>
              </div>
            </div>
          </div>

          {/* Center Navigation Links (Hidden on mobile) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-700 dark:text-slate-200">
            <button
              onClick={() => scrollTo('places')}
              className="hover:text-[#C11944] dark:hover:text-[#FECB00] transition-colors cursor-pointer"
            >
              Places & Mosques
            </button>
            <button
              onClick={() => scrollTo('dining')}
              className="hover:text-[#C11944] dark:hover:text-[#FECB00] transition-colors cursor-pointer"
            >
              Halal Food
            </button>
            <button
              onClick={() => scrollTo('packages')}
              className="hover:text-[#C11944] dark:hover:text-[#FECB00] transition-colors cursor-pointer"
            >
              Tour Packages
            </button>
            <button
              onClick={() => scrollTo('companion')}
              className="hover:text-[#C11944] dark:hover:text-[#FECB00] transition-colors cursor-pointer"
            >
              Mobile App
            </button>
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Live Operational Status Indicator */}
            <div className="hidden sm:flex items-center gap-2 bg-[#FFDEF6]/60 dark:bg-[#433458] border border-[#C11944]/30 dark:border-[#FECB00]/30 px-3 py-1.5 rounded-full text-[11px] font-extrabold text-[#C11944] dark:text-[#FECB00]">
              <span className="w-2 h-2 rounded-full bg-[#C11944] dark:bg-[#FECB00] animate-pulse" />
              <span>Operations: Active</span>
            </div>

            {/* Theme Toggle */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-[#FFDEF6]/30 dark:hover:bg-slate-800 transition-all cursor-pointer"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-[#FECB00]" />
                ) : (
                  <Moon className="w-4 h-4 text-[#433458]" />
                )}
              </button>
            )}

            {/* Admin Command Center Link */}
            <button
              onClick={onOpenAdmin}
              className="bg-[#433458] hover:bg-[#2E2240] dark:bg-[#C11944] dark:hover:bg-[#8E1632] text-white font-extrabold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md shadow-[#433458]/30 border border-[#FECB00]/40 cursor-pointer flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-[#FECB00]" />
              <span className="hidden sm:inline">
                {isAuthenticated ? 'Admin Dashboard' : 'Officer Sign In'}
              </span>
              <span className="sm:hidden">Portal</span>
            </button>
          </div>
        </div>
        {/* Festive Vinta Sail Geometric Accent Line (At bottom edge of navbar) */}
        <div className="h-1 w-full bg-linear-to-r from-[#BF1F46] via-[#FECB00] via-[#69EBFE] via-[#FFDEF6] to-[#433458]" />
      </header>

      {/* 2. CINEMATIC HERO: SOFT PINK SUN-DRENCHED COASTAL CANVAS */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF0F8] via-[#FFDEF6]/50 to-[#FFF0F8] text-[#433458] transition-colors">
        {/* Soft Pink & Sun Gold Coastal Ambient Light */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85"
            alt="Zamboanga Masjid and Sulu Waters"
            className="w-full h-full object-cover object-center opacity-20 scale-105 transition-transform duration-10000 hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFF0F8] via-[#FFDEF6]/60 to-[#FFF0F8]/80" />
          <div className="absolute top-0 right-10 w-96 h-96 bg-[#FECB00]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#69EBFE]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#FFDEF6]/70 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl space-y-6">
            {/* Festive Telemetry Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-[#BF1F46] text-[#FFDEF6] border border-[#FECB00]/40 px-3.5 py-1 rounded-full text-[11px] font-black tracking-wide uppercase shadow-sm">
                <Compass className="w-3.5 h-3.5 text-[#FECB00]" />
                Asia's Latin City • Ciudad Hermosa
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#433458] text-[#FECB00] border border-[#FECB00]/40 px-3.5 py-1 rounded-full text-[11px] font-extrabold shadow-sm">
                <Calendar className="w-3.5 h-3.5 text-[#69EBFE]" />
                14 Safar 1448 AH • Zamboanga Port & Straits
              </span>
            </div>

            {/* Architectural Display Headline */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-[#433458]">
                Where the Coral Sea Meets the Minarets.
              </h1>
              <div className="mt-2 text-base sm:text-xl font-black bg-gradient-to-r from-[#BF1F46] via-[#E82955] to-[#D97706] bg-clip-text text-transparent">
                A Symphony of Vinta Colors, Living Heritage & Faith.
              </div>
            </div>

            {/* Grounded Subtitle */}
            <p className="text-[#433458]/85 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal">
              <span className="text-[#BF1F46] font-bold italic">“Donde el Mar y la Fe se Encuentran — Orgullo de Zamboanga!”</span> — The official tourism and heritage directory for Zamboanga City. Featuring certified NCMF Halal dining, historic masjids, accredited local tour guides, and pink sand shores across Asia's Latin City.
            </p>

            {/* Hero CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollTo('places')}
                className="bg-[#BF1F46] hover:bg-[#8E1632] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-[#BF1F46]/30 border border-[#FECB00]/40 cursor-pointer flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#FECB00]" />
                <span>Explore Places & Mosques</span>
              </button>

              <button
                onClick={() => scrollTo('packages')}
                className="bg-[#433458] hover:bg-[#2D223B] text-[#FECB00] font-black text-xs sm:text-sm px-5 py-3.5 rounded-xl border border-[#FECB00]/60 transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#69EBFE]" />
                <span>Tour Packages & Guides</span>
              </button>

              <button
                onClick={() => scrollTo('dining')}
                className="bg-[#69EBFE] hover:bg-[#38BDF8] text-[#433458] font-black text-xs sm:text-sm px-5 py-3.5 rounded-xl border border-white/60 transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <Utensils className="w-4 h-4 text-[#BF1F46]" />
                <span>Halal Food & Gastronomy</span>
              </button>
            </div>
          </div>

          {/* Real Operational Telemetry HUD Strip */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-[#FFDEF6] shadow-xl shadow-[#F8CCDE]/40">
            <div className="p-3.5 rounded-2xl bg-[#FFF0F8] border border-[#FFDEF6]">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#0369A1]">
                City Coordinates
              </div>
              <div className="text-sm font-black text-[#433458] font-mono mt-0.5">
                6.9214° N, 122.0790° E
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FFF0F8] border border-[#FFDEF6]">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#BF1F46]">
                Halal Dining Registry
              </div>
              <div className="text-sm font-black text-[#BF1F46] mt-0.5">
                NCMF & MSME Audited
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FFF0F8] border border-[#FFDEF6]">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#433458]">
                Verified Masjids & Sites
              </div>
              <div className="text-sm font-black text-[#433458] mt-0.5">
                {pois.length > 0 ? `${pois.length} Sites Audited` : '27 Sites Audited'}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FFF0F8] border border-[#FFDEF6]">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#D97706]">
                City Tourism Hotline
              </div>
              <div className="text-sm font-black text-[#433458] font-mono mt-0.5">
                +63 62 991 2656
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5. SCROLL-DRIVEN MOSQUE & HERITAGE SHOWCASE SPOTLIGHT */}
      <ScrollShowcase
        landmarks={showcaseLandmarks}
        onViewRegistry={(cat) => {
          scrollTo('places');
          setActiveCategoryFilter(cat);
        }}
      />

      {/* 3. SECTION: PLACES & MOSQUES - WARM SANTA CRUZ PINK SAND & FESTIVE TIERS */}
      <section id="places" className="py-20 bg-[#FFDEF6]/25 dark:bg-[#241A32] border-y border-[#FFDEF6] dark:border-[#433458] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#C11944] dark:text-[#FD43A8] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#FECB00]" />
                Places to Visit • Ciudad de Flores
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#433458] dark:text-white tracking-tight mt-1.5">
                Places & Mosques
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                Explore audited masjids, historic landmarks, and Muslim-friendly cafes across Zamboanga City and the straits. Every location is audited for prayer rooms, verified qibla, and halal compliance.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/80 dark:bg-[#433458]/80 border border-[#FFDEF6] dark:border-[#5B447A] text-xs font-bold text-[#433458] dark:text-[#FFDEF6] shadow-xs shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#0B6E4F] animate-pulse" />
              <span>Showing {filteredPois.length} Audited Venues</span>
            </div>
          </div>

          {/* Unified Single-Row Filter Tabs (Taste-Skill Anti-Slop Directive) */}
          <div className="mb-10 w-full overflow-x-auto no-scrollbar">
            <div className="inline-flex items-center gap-2 p-1.5 bg-white/95 dark:bg-[#433458]/90 rounded-2xl border-2 border-[#FFDEF6] dark:border-[#5B447A] shadow-md min-w-full sm:min-w-0">
              <button
                type="button"
                onClick={() => setActiveCategoryFilter('all')}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${activeCategoryFilter === 'all'
                  ? 'bg-[#C11944] text-white shadow-md shadow-[#C11944]/30'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#C11944] hover:bg-[#FFDEF6]/40 dark:hover:bg-[#5B447A]/40'
                  }`}
              >
                <span>All Places</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeCategoryFilter === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-black/30 text-slate-500'
                  }`}>
                  {pois.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategoryFilter('worship')}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${activeCategoryFilter === 'worship'
                  ? 'bg-[#433458] text-[#FECB00] shadow-md shadow-[#433458]/40 border border-[#FECB00]/30'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#433458] dark:hover:text-[#FECB00] hover:bg-[#FFDEF6]/40 dark:hover:bg-[#5B447A]/40'
                  }`}
              >
                <span>🕌</span>
                <span>Mosques Only</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeCategoryFilter === 'worship' ? 'bg-[#FECB00]/20 text-[#FECB00]' : 'bg-slate-100 dark:bg-black/30 text-slate-500'
                  }`}>
                  {pois.filter((p) => p.category === 'worship').length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategoryFilter('dining')}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${activeCategoryFilter === 'dining'
                  ? 'bg-[#FECB00] text-[#433458] shadow-md shadow-[#FECB00]/30 font-black'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#C11944] hover:bg-[#FFDEF6]/40 dark:hover:bg-[#5B447A]/40'
                  }`}
              >
                <span>🍽️</span>
                <span>Cafes & Dining</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeCategoryFilter === 'dining' ? 'bg-[#433458]/20 text-[#433458]' : 'bg-slate-100 dark:bg-black/30 text-slate-500'
                  }`}>
                  {pois.filter((p) => p.category === 'dining').length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategoryFilter('promoted')}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${activeCategoryFilter === 'promoted'
                  ? 'bg-linear-to-r from-[#C11944] to-[#433458] text-[#FECB00] shadow-md'
                  : 'text-[#C11944] dark:text-[#FECB00] bg-[#FFDEF6]/40 dark:bg-black/30 hover:bg-[#FFDEF6] border border-[#C11944]/30'
                  }`}
              >
                <span>★ RA 9593 DOT Verified</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeCategoryFilter === 'promoted' ? 'bg-white/20 text-[#FECB00]' : 'bg-white/60 dark:bg-black/40 text-[#C11944]'
                  }`}>
                  {pois.filter((p) => p.isPromoted || p.accreditationNumber || p.ra9593Compliant).length}
                </span>
              </button>
            </div>
          </div>

          {/* RA 9593 Accreditation & Quality Assurance Trust Seal */}
          <div className="mb-10 p-5 rounded-3xl bg-linear-to-r from-[#433458] via-[#8E1632] to-[#433458] text-white border border-[#FECB00]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-[#FECB00]/40 flex items-center justify-center text-rose-300 shrink-0 shadow-md">
                <ShieldCheck className="w-6 h-6 text-[#FECB00]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#FECB00]">
                    Republic Act No. 9593 Statutory Compliance
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#69EBFE] text-[#0369A1] border border-white/40">
                    DOT Verified Directory
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-black mt-0.5 text-white">
                  Department of Tourism (DOT) & LGU Business Permitted Establishments
                </h3>
                <p className="text-xs text-slate-200 mt-1 max-w-2xl leading-relaxed">
                  Featured establishments, Muslim-friendly suppliers, and tour guides carry verified DOT accreditations and Mayor's Business Permits. Non-accredited establishments are strictly barred from official promotion.
                </p>
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#FECB00] bg-black/40 px-3 py-1.5 rounded-xl border border-[#FECB00]/30">
                Tourism Act of 2009 Compliant
              </span>
            </div>
          </div>

          {/* Mosque Standards Bar - Colorful Cards */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#C11944] dark:text-[#FFDEF6] bg-[#FFDEF6] dark:bg-[#433458] border border-[#C11944]/30 px-2.5 py-1 rounded-md">
                Mosque Audit Standards
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                Verified amenities required for registered prayer facilities
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-3xl bg-white dark:bg-[#2E2240] border-2 border-[#69EBFE]/60 dark:border-[#69EBFE]/40 shadow-xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#69EBFE]/30 text-[#0369A1] dark:text-[#69EBFE] flex items-center justify-center font-black text-sm mb-3 border border-[#69EBFE]/50">
                  01
                </div>
                <h3 className="text-sm font-black text-[#433458] dark:text-white">
                  Running Water for Wudu
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Tested clean running water stations available during prayer windows, from Fajr dawn to Isha night.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-[#2E2240] border-2 border-[#C11944]/40 dark:border-[#FD43A8]/40 shadow-xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#FFDEF6] text-[#C11944] dark:text-[#FD43A8] flex items-center justify-center font-black text-sm mb-3 border border-[#C11944]/30">
                  02
                </div>
                <h3 className="text-sm font-black text-[#433458] dark:text-white">
                  Women's Prayer Area (Musalla)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Dedicated prayer space for women travelers, complete with ablution taps and clean privacy partition.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-[#2E2240] border-2 border-[#FECB00]/60 dark:border-[#FECB00]/40 shadow-xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#FECB00]/30 text-[#854D0E] dark:text-[#FECB00] flex items-center justify-center font-black text-sm mb-3 border border-[#FECB00]/50">
                  03
                </div>
                <h3 className="text-sm font-black text-[#433458] dark:text-white">
                  Verified Qibla Direction
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Solar and compass calibrated direction facing the Kaaba, verified by local scholars and community imams.
                </p>
              </div>
            </div>
          </div>

          {/* POI Cards Grid - Colorful Treatments */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPois.map((poi, idx) => (
              <div
                key={poi.id ?? `poi-${idx}`}
                className={`bg-white dark:bg-[#2E2240] rounded-3xl border transition-all overflow-hidden flex flex-col group shadow-xs hover:shadow-lg ${poi.isPromoted
                  ? 'border-[#FECB00] ring-2 ring-[#FECB00]/40 dark:ring-[#FECB00]/30'
                  : 'border-[#FFDEF6] dark:border-[#433458] hover:border-[#C11944]'
                  }`}
              >
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={poi.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'}
                    alt={poi.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                    {poi.isPromoted && (
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-[#FECB00] text-[#433458] shadow-md border border-white/40">
                        ★ Top Recommended
                      </span>
                    )}
                    <span
                      className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md shadow-xs ${poi.category === 'worship'
                        ? 'bg-[#433458] text-[#FECB00] border border-[#FECB00]/40'
                        : 'bg-[#C11944] text-white border border-[#FFDEF6]/40'
                        }`}
                    >
                      {poi.category === 'worship' ? 'Masjid' : 'Halal Dining'}
                    </span>
                    {(poi.accreditationNumber || poi.ra9593Compliant) && (
                      <span className="text-[9px] font-extrabold bg-[#69EBFE] text-[#0369A1] px-2 py-0.5 rounded-md border border-[#0284C7]/40 shadow-xs" title={`DOT Accreditation: ${poi.accreditationNumber || 'Verified'}`}>
                        RA 9593 DOT
                      </span>
                    )}
                    <span className="text-[9px] font-extrabold bg-[#FFDEF6] text-[#C11944] px-2 py-0.5 rounded-md border border-[#C11944]/20 shadow-xs">
                      {poi.tier === 'tier1' ? 'Tier 1 Certified' : 'Muslim-Owned'}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-black text-[#433458] dark:text-white group-hover:text-[#C11944] dark:group-hover:text-[#FECB00] transition-colors">
                      {poi.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {poi.address || 'Zamboanga City, Western Mindanao'}
                    </p>
                    {poi.supplierName && (
                      <div className="mt-2 text-[10px] font-semibold text-[#8E1632] dark:text-[#FFDEF6] bg-[#FFDEF6]/50 dark:bg-black/30 px-2 py-1 rounded-lg border border-[#FFDEF6] dark:border-[#433458] truncate" title={`Supplier: ${poi.supplierName}`}>
                        📦 Halal Meat: <span className="font-bold">{poi.supplierName}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-[#D97706] font-black text-[11px]">
                      <Star className="w-3.5 h-3.5 fill-[#FECB00] text-[#D97706]" />
                      <span>{poi.rating || '4.9'}</span>
                      <span className="text-slate-400 font-normal">({poi.reviewCount || '180'})</span>
                    </div>

                    <span className="text-[#C11944] dark:text-[#FECB00] font-black text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C11944] dark:text-[#FECB00]" />
                      <span>Verified</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION: HALAL FOOD & DINING - FESTIVE GASTRONOMY PALETTE */}
      <section id="dining" className="py-20 bg-linear-to-br from-[#433458] via-[#8E1632] to-[#2E2240] text-white border-y border-[#FFDEF6]/20 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#FECB00] flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-[#69EBFE]" />
              Sabores de Zamboanga • Culinary Heritage
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1.5">
              Popular Halal Food in Zamboanga
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm mt-2 leading-relaxed">
              Zamboanga cuisine is an explosion of Moro spices, charcoal-grilled delights, and fresh marine bounty. Explore verified halal kitchens, native satti houses, and heritage cafes with strict non-pork / non-alcohol audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dish 1: Pilar Street Morning Satti */}
            <div className="p-6 rounded-3xl bg-white/95 text-slate-900 border-2 border-[#C11944]/50 shadow-xl flex flex-col justify-between group hover:scale-[1.02] transition-all">
              <div>
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-[#C11944] text-white border border-[#FFDEF6]/40 shadow-xs">
                  Morning Satti • Downtown Heritage
                </span>
                <h3 className="text-base font-black text-[#433458] mt-3 group-hover:text-[#C11944] transition-colors">
                  Pilar Street Morning Satti
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                  Skewered beef and chicken simmered over coconut charcoal, drenched in thick, sweet-spicy crimson chili-peanut broth and served over square diamond ta’mu rice cakes.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-semibold">Served at: Ymmij Satti Haus</span>
                <span className="font-black text-[#C11944] bg-[#FFDEF6] px-2 py-0.5 rounded-md">100% Halal Meat</span>
              </div>
            </div>

            {/* Dish 2: Tiulah Itum */}
            <div className="p-6 rounded-3xl bg-white/95 text-slate-900 border-2 border-[#FECB00]/70 shadow-xl flex flex-col justify-between group hover:scale-[1.02] transition-all">
              <div>
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-[#433458] text-[#FECB00] border border-[#FECB00]/40 shadow-xs">
                  Royal Moro Beef Stew • NCMF Certified
                </span>
                <h3 className="text-base font-black text-[#433458] mt-3 group-hover:text-[#8E1632] transition-colors">
                  Tiulah Itum (Black Braised Beef)
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                  An iconic Moro ceremonial soup. Tender beef shank braised in lemongrass, turmeric, and blackened pounded coconut meat (*pamapa itum*), yielding a velvety, herbal broth.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-semibold">Served at: Baitul Maal Bistro</span>
                <span className="font-black text-[#0369A1] bg-[#69EBFE]/30 px-2 py-0.5 rounded-md">NCMF Certified</span>
              </div>
            </div>

            {/* Dish 3: Curacha in Ralava Sauce */}
            <div className="p-6 rounded-3xl bg-white/95 text-slate-900 border-2 border-[#69EBFE]/70 shadow-xl flex flex-col justify-between group hover:scale-[1.02] transition-all">
              <div>
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-[#69EBFE] text-[#0369A1] border border-[#0284C7]/40 shadow-xs">
                  Spanner Red Crab • Muslim-Friendly
                </span>
                <h3 className="text-base font-black text-[#433458] mt-3 group-hover:text-[#0369A1] transition-colors">
                  Curacha in Ralava Sauce
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                  Deep-sea spanner red crab native only to the waters around Zamboanga, smothered in rich coconut cream infused with ginger and secret heirloom Moro spices.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-semibold">Served at: Ralava Seafood Grill</span>
                <span className="font-black text-[#854D0E] bg-[#FECB00]/40 px-2 py-0.5 rounded-md">Supplier Verified</span>
              </div>
            </div>
          </div>

          {/* MSME Public Intake Callout - Festive Card */}
          <div className="mt-10 p-6 rounded-3xl bg-white/10 backdrop-blur-md border-2 border-[#FECB00]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#FECB00] text-[#433458] flex items-center justify-center shrink-0 shadow-md">
                <Utensils className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-white">
                  Are you a Muslim food vendor or local eatery owner in Zamboanga?
                </h3>
                <p className="text-xs text-slate-200 mt-0.5">
                  Submit a free, zero-cost self-declaration to earn the green Tier 2 Verified badge on the official tourist map and mobile app.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenMsme}
              className="bg-[#FECB00] hover:bg-[#E5B600] text-[#433458] font-black text-xs px-5 py-3 rounded-xl transition-all shadow-lg shadow-[#FECB00]/30 cursor-pointer shrink-0 border border-white/40"
            >
              Open MSME Self-Declaration Form &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 5. SECTION: TOUR PACKAGES & GUIDES - FESTIVE TIERS */}
      <section id="packages" className="py-20 bg-[#FFF5FD] dark:bg-[#1F172C] border-y border-[#FFDEF6] dark:border-[#433458] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#C11944] dark:text-[#FD43A8] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FECB00]" />
              Official Expeditions & Accredited Guides
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#433458] dark:text-white tracking-tight mt-1.5">
              Tour Packages & Guides
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
              Explore Zamboanga City with bilingual DOT-accredited tour guides or choose a self-guided route. Every itinerary includes our mandatory 4-part statutory matrix and verified 5-prayer windows.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {displayPackages.map((pkg) => (
              <div
                key={pkg.package_code}
                className={`p-7 rounded-3xl bg-white dark:bg-[#2E2240] border flex flex-col justify-between shadow-md transition-all ${pkg.package_code === 'package_a'
                  ? 'border-2 border-[#C11944] ring-4 ring-[#C11944]/20 shadow-xl shadow-[#C11944]/15'
                  : 'border-[#FFDEF6] dark:border-[#433458] hover:border-[#433458]'
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-[#FFDEF6] dark:bg-black/40 text-[#C11944] dark:text-[#FFDEF6] border border-[#C11944]/30">
                      {pkg.code_label}
                    </span>
                    {pkg.is_prayer_aligned && (
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-[#FECB00] text-[#433458] shadow-xs">
                        🕌 Prayer-Aligned
                      </span>
                    )}
                    {pkg.badge && !pkg.is_prayer_aligned && (
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-[#69EBFE] text-[#0369A1]">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-[#433458] dark:text-white mt-3">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-300 mt-1 font-medium">
                    {pkg.tagline}
                  </p>

                  <div className="mt-5 pb-5 border-b border-slate-100 dark:border-slate-700/60">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-black text-[#C11944] dark:text-[#FD43A8] font-mono">
                        {pkg.price_php > 0 ? `₱${pkg.price_php.toLocaleString()}` : 'Free'}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                        {pkg.price_unit || '/ person'}
                      </span>
                    </div>
                    <div className="text-[11px] font-extrabold text-[#0369A1] dark:text-[#69EBFE] mt-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Duration: {pkg.duration}</span>
                    </div>
                  </div>

                  {/* Statutory Inclusions Matrix */}
                  {pkg.inclusions_matrix && (
                    <div className="mt-4 p-3.5 bg-[#FFF5FD] dark:bg-black/30 rounded-2xl border border-[#FFDEF6] dark:border-[#433458] space-y-2">
                      <div className="text-[10px] font-black uppercase tracking-wider text-[#C11944] dark:text-[#FFDEF6]">
                        Statutory Inclusions Matrix
                      </div>
                      <div className="grid grid-cols-1 gap-1.5 text-[11px]">
                        <div><span className="font-bold text-[#433458] dark:text-slate-200">🚗 Transit:</span> <span className="text-slate-600 dark:text-slate-300">{pkg.inclusions_matrix.transportation}</span></div>
                        <div><span className="font-bold text-[#433458] dark:text-slate-200">🎟️ Fees:</span> <span className="text-slate-600 dark:text-slate-300">{pkg.inclusions_matrix.fees}</span></div>
                        <div><span className="font-bold text-[#433458] dark:text-slate-200">🎨 Activities:</span> <span className="text-slate-600 dark:text-slate-300">{pkg.inclusions_matrix.activities}</span></div>
                        <div><span className="font-bold text-[#433458] dark:text-slate-200">🏛️ Sites:</span> <span className="text-slate-600 dark:text-slate-300">{pkg.inclusions_matrix.attractions}</span></div>
                      </div>
                    </div>
                  )}

                  {/* Prayer Itinerary Highlights */}
                  {pkg.prayer_itinerary && pkg.prayer_itinerary.length > 0 && (
                    <div className="mt-4 p-3.5 bg-[#433458]/10 dark:bg-black/40 rounded-2xl border border-[#433458]/20 space-y-2">
                      <div className="text-[10px] font-black uppercase tracking-wider text-[#433458] dark:text-[#FECB00] flex items-center gap-1.5">
                        <span>🕌 5 Daily Prayer Stops (Fajr to Isha)</span>
                      </div>
                      <div className="space-y-1.5 text-[11px]">
                        {pkg.prayer_itinerary.slice(0, 3).map((st, sIdx) => (
                          <div key={sIdx} className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                            <span className="font-mono text-[#C11944] dark:text-[#FFDEF6] font-bold">{st.time}</span>
                            <span className="font-black text-[#433458] dark:text-white">{st.prayer ? `[${st.prayer}]` : ''} {st.location}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Inclusions List */}
                  <div className="mt-5 space-y-2.5">
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      What's Included:
                    </div>
                    {pkg.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C11944] dark:text-[#FECB00] shrink-0 mt-0.5" />
                        <span>{typeof inc === 'string' ? inc : inc.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-700/60">
                  <button
                    onClick={() => setSelectedBookingPkg(pkg)}
                    className={`w-full py-3 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${pkg.package_code === 'package_a'
                      ? 'bg-[#C11944] hover:bg-[#8E1632] text-white shadow-lg shadow-[#C11944]/30 border border-[#FECB00]/40'
                      : pkg.package_code === 'package_b'
                        ? 'bg-[#433458] hover:bg-[#2E2240] text-[#FECB00] shadow-md border border-[#FECB00]/30'
                        : 'bg-[#FFDEF6] hover:bg-[#FFDEF6]/80 text-[#C11944] dark:bg-slate-800 dark:text-slate-200 border border-[#C11944]/30'
                      }`}
                  >
                    <span>{pkg.price_php > 0 ? 'Book This Expedition' : 'Get Free Route Access'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SECTION: MOBILE APP (WORKS OFFLINE) - MIDNIGHT INDIGO & MERLOQUET AQUA */}
      <section id="companion" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-linear-to-br from-[#433458] via-[#2E2240] to-[#1F172C] text-white border-2 border-[#FECB00]/30 relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-96 pointer-events-none opacity-20 bg-radial-gradient from-[#69EBFE] via-transparent to-transparent" />
          <div className="absolute left-0 bottom-0 w-96 h-96 pointer-events-none opacity-20 bg-radial-gradient from-[#BF1F46] via-transparent to-transparent" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#69EBFE] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#FECB00]" />
                Map-First Offline Companion
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                VintaGo Mobile App (Works Offline)
              </h2>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                Cellular signal can fluctuate while exploring historic fortifications and outer barangays. The VintaGo companion app lets you download offline guides, prayer times, and the complete halal directory directly to your phone.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-100">
                  <div className="w-7 h-7 rounded-lg bg-[#BF1F46]/40 border border-[#BF1F46]/60 flex items-center justify-center text-[#FECB00] shrink-0">
                    <Download className="w-4 h-4" />
                  </div>
                  <span><strong>1-Click Offline Data Bundle:</strong> Complete registry of masjids, prayer times, halal eateries, and emergency tourist hotlines.</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-100">
                  <div className="w-7 h-7 rounded-lg bg-[#69EBFE]/30 border border-[#69EBFE]/50 flex items-center justify-center text-[#69EBFE] shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span><strong>Astronomical Qibla Compass HUD:</strong> Built-in GPS compass calibrated to Mecca coordinates even in airplane mode.</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-100">
                  <div className="w-7 h-7 rounded-lg bg-[#FECB00]/30 border border-[#FECB00]/50 flex items-center justify-center text-[#FECB00] shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <span><strong>Tour Guide Dispatch Cockpit:</strong> Accredited guides see their tour manifest and tourist headcounts directly on mobile.</span>
                </div>
              </div>
            </div>

            {/* Mock Phone Visual Card */}
            <div className="bg-[#181122] p-6 rounded-3xl border-2 border-[#FECB00]/40 max-w-sm mx-auto shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[11px]">
                <span className="font-black text-[#69EBFE]">VintaGo Mobile App</span>
                <span className="text-[#FECB00] font-mono font-bold bg-[#FECB00]/20 px-2 py-0.5 rounded">100% Offline</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#2E2240] border border-white/10">
                <div className="text-[10px] uppercase font-bold text-slate-300">Upcoming Prayer Stop</div>
                <div className="text-lg font-black text-[#FECB00] mt-0.5">Asr • 03:15 PM</div>
                <div className="text-[11px] text-[#FFDEF6] font-semibold mt-1">
                  Masjid Sta. Barbara • Zamboanga Calibrated
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#2E2240] border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#69EBFE]/30 text-[#69EBFE] flex items-center justify-center font-bold shrink-0">
                  <Ship className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-white truncate">Santa Cruz Island Pink Beach Boat</div>
                  <div className="text-[11px] text-slate-300">Paseo del Mar Wharf Dispatch</div>
                </div>
              </div>

              <button
                type="button"
                className="w-full py-3 rounded-xl bg-[#BF1F46] hover:bg-[#8E1632] text-white font-black text-xs transition-all text-center shadow-lg shadow-[#BF1F46]/40 border border-[#FECB00]/30"
              >
                Download VintaGo Companion (APK / Expo) &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. MUNICIPAL FOOTER & CREDENTIALS - ROYAL INDIGO WITH VINTA RIBBON */}
      <div className="h-1.5 w-full bg-linear-to-r from-[#BF1F46] via-[#FECB00] via-[#69EBFE] via-[#FFDEF6] to-[#433458]" />
      <footer className="bg-[#241A32] text-slate-300 border-t border-[#433458] py-16 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1 */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#BF1F46] text-[#FECB00] flex items-center justify-center shadow-md">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-base font-black text-white">VintaGo • Ciudad de Zamboanga</span>
              </div>
              <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                The official Islamic tourism and cultural heritage directory for Zamboanga City, established under Republic Act No. 9593 (Tourism Act of 2009). Supporting local MSMEs, accredited tour guides, and Muslim-friendly travelers worldwide.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-[#FECB00] font-bold">
                <span>📍 City Tourism Office, Paseo del Mar, Zamboanga City</span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <div className="font-black text-[#FECB00] text-xs uppercase tracking-wider mb-3">
                Tourism Portals
              </div>
              <ul className="space-y-2 text-slate-300">
                <li><button onClick={() => scrollTo('places')} className="hover:text-[#FECB00] cursor-pointer">Places & Mosques</button></li>
                <li><button onClick={() => scrollTo('dining')} className="hover:text-[#FECB00] cursor-pointer">Halal Dining Directory</button></li>
                <li><button onClick={() => scrollTo('packages')} className="hover:text-[#FECB00] cursor-pointer">Tour Packages & Matrix</button></li>
                <li><button onClick={onOpenMsme} className="hover:text-[#FECB00] cursor-pointer">MSME Self-Declaration</button></li>
              </ul>
            </div>

            {/* Col 3: Admin Link */}
            <div>
              <div className="font-black text-[#FECB00] text-xs uppercase tracking-wider mb-3">
                Official Administration
              </div>
              <p className="text-xs text-slate-300 mb-3">
                Authorized tourism officers, halal compliance inspectors, and guide dispatchers:
              </p>
              <button
                onClick={onOpenAdmin}
                className="w-full bg-[#433458] hover:bg-[#1F172C] border border-[#FECB00]/40 text-[#FECB00] font-black text-xs py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
              >
                <Lock className="w-3.5 h-3.5 text-[#FECB00]" />
                <span>Command Center Sign In</span>
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              © 2026 City Government of Zamboanga. All rights reserved.
            </div>
            <div className="text-[#FECB00] font-bold">
              Powered by VintaGo Color Scheme & Laravel 11 REST API.
            </div>
          </div>
        </div>
      </footer>

      {/* 9. BOOKING INQUIRY MODAL - HERMOSA COLOR THEME */}
      {selectedBookingPkg && (
        <div
          className="fixed inset-0 z-50 bg-[#241A32]/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedBookingPkg(null)}
        >
          <div
            className="bg-white dark:bg-[#2E2240] rounded-3xl max-w-lg w-full p-6 sm:p-7 border-2 border-[#C11944]/40 dark:border-[#FECB00]/30 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBookingPkg(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-[#C11944] dark:hover:text-[#FECB00] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="py-8 text-center space-y-3 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-2xl bg-[#FFDEF6] dark:bg-[#C11944]/30 text-[#C11944] dark:text-[#FECB00] flex items-center justify-center mx-auto shadow-md border border-[#C11944]/30">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-black text-[#433458] dark:text-white">
                  Booking Inquiry Dispatched!
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xs mx-auto">
                  Your request has been routed to the City Tourism Office. An accredited guide will contact you shortly with confirmation.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-[#FFDEF6] text-[#C11944] border border-[#C11944]/30">
                    {selectedBookingPkg.code_label}
                  </span>
                  <span className="text-xs font-black text-[#C11944] dark:text-[#FECB00]">
                    ₱{selectedBookingPkg.price_php > 0 ? selectedBookingPkg.price_php.toLocaleString() : 'Free'}
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#433458] dark:text-white">
                  Book: {selectedBookingPkg.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Connects directly to the regional tour guide dispatch queue. Zero on-site cash policy strictly enforced.
                </p>

                <form onSubmit={handleBookingSubmit} className="mt-5 space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Lead Traveler Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      placeholder="e.g. Ahmad bin Abdullah"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-[#C11944]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Contact Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        placeholder="+63 9... or +60..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-[#C11944]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Valid ID / Passport No.
                      </label>
                      <input
                        type="text"
                        value={bookingForm.id_number || ''}
                        onChange={(e) => setBookingForm({ ...bookingForm, id_number: e.target.value })}
                        placeholder="e.g. Passport / PhilID"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-[#C11944] font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Traveler Headcount (Pax) *
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        required
                        value={bookingForm.pax}
                        onChange={(e) => setBookingForm({ ...bookingForm, pax: parseInt(e.target.value) || 1 })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-[#C11944] font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Preferred Travel Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-[#C11944]"
                      />
                    </div>
                  </div>

                  {/* Accessibility & Dietary Safety */}
                  <div className="p-3 bg-[#FFF5FD] dark:bg-black/30 rounded-2xl border border-[#FFDEF6] dark:border-[#433458] space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-wider text-[#C11944] dark:text-[#FFDEF6]">
                      Guest Safety & Special Inclusions (LGU Manifest)
                    </div>
                    <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={bookingForm.is_pwd || false}
                        onChange={(e) => setBookingForm({ ...bookingForm, is_pwd: e.target.checked })}
                        className="w-4 h-4 text-[#C11944] rounded border-slate-300 focus:ring-[#C11944]"
                      />
                      <span className="font-semibold text-xs">PWD / Elderly Mobility Assistance Needed</span>
                    </label>
                    <input
                      type="text"
                      value={bookingForm.dietary_allergies || ''}
                      onChange={(e) => setBookingForm({ ...bookingForm, dietary_allergies: e.target.value })}
                      placeholder="Dietary allergies (e.g. peanuts, shellfish, gluten, or none)"
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-[#C11944] text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Special Requirements or Language Preference
                    </label>
                    <input
                      type="text"
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      placeholder="e.g. Arabic or Tausug guide, early morning airport pick-up"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-[#C11944]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 bg-[#C11944] hover:bg-[#8E1632] text-white font-black text-xs py-3 rounded-xl transition-all cursor-pointer shadow-lg shadow-[#C11944]/30 border border-[#FECB00]/40"
                  >
                    Confirm & Send Booking to Dispatch
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
