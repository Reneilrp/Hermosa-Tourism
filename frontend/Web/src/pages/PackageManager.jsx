import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Compass,
  CheckCircle2,
  Clock,
  Search,
  X,
  Phone,
  Mail,
  Calendar,
  Globe,
  Award,
  ChevronRight,
  ShieldCheck,
  Star,
  DollarSign,
  UserCheck,
  Check,
  MapPin,
  Car,
  Ship,
  Utensils,
  Moon,
  Sparkles,
  Luggage,
  Edit3,
  Printer,
  FileText,
  AlertTriangle,
  QrCode,
} from 'lucide-react';

export default function PackageManager({
  packages = [],
  bookings = [],
  guides = [],
  onUpdateBookingStatus,
  onUpdatePackage,
}) {
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'packages' | 'guides'
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [assigningBooking, setAssigningBooking] = useState(null);
  const [viewingManifestBooking, setViewingManifestBooking] = useState(null);
  const [viewingVoucherBooking, setViewingVoucherBooking] = useState(null);
  const [verifyingSoaBooking, setVerifyingSoaBooking] = useState(null);
  const [selectedGuideId, setSelectedGuideId] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  // Package editing state
  const [editingPackage, setEditingPackage] = useState(null);
  const [packageFormData, setPackageFormData] = useState({
    title: '',
    tagline: '',
    price_php: 0,
    price_unit: '',
    duration: '',
    badge: '',
    ideal_for: '',
    inclusions_text: '',
    is_prayer_aligned: false,
    matrix_transportation: '',
    matrix_fees: '',
    matrix_activities: '',
    matrix_attractions: '',
  });
  const [isSavingPackage, setIsSavingPackage] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Fallback sample packages
  const samplePackages = packages.length > 0 ? packages : [
    {
      id: 1,
      package_code: 'package_a',
      code_label: 'PACKAGE A',
      title: 'Guided Tour Package (All-Inclusive)',
      tagline: 'VIP Guided Tour with Accredited Guide & Private Transfers',
      badge: 'PRAYER-ALIGNED & ALL-INCLUSIVE',
      price_php: 6500,
      price_unit: '/ person (all-inclusive)',
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
        'Private Air-Conditioned Van across Zamboanga City & Fort Pilar',
        'VIP Cultural Pass to Fort Pilar, National Museum & Historic Sites',
        'Pre-Arranged 3-Course Halal Dining at Baitul Maal & Sinned Coffee',
        'VIP Curator Access at Taluksangay & Sadik Grand Mosques',
        'Travel Insurance & Regional Security Escort Coordination',
      ],
      prayer_itinerary: [
        { time: '04:30 AM', prayer: 'Fajr', location: 'Taluksangay Historic Mosque', activity: 'Dawn prayer & sunrise historical reflection' },
        { time: '11:45 AM', prayer: 'Dhuhr', location: 'Sadik Grand Mosque (Mercedes)', activity: 'Midday prayer & architectural tour of largest mosque' },
        { time: '03:15 PM', prayer: 'Asr', location: 'Masjid Sta. Barbara', activity: 'Afternoon prayer & community dialogue' },
        { time: '06:00 PM', prayer: 'Maghrib', location: 'Masjid Rio Hondo', activity: 'Sunset prayer overlooking stilt waterways' },
        { time: '07:15 PM', prayer: 'Isha', location: 'Masjid Campo Muslim', activity: 'Night prayer followed by celebratory Ralava seafood grill' },
      ],
      ideal_for: 'Families, international pilgrims, senior citizens, and first-time visitors.',
    },
    {
      id: 2,
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
      id: 3,
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

  const sampleGuides = guides.length > 0 ? guides : [
    {
      id: 1,
      name: 'Ustadz Yasser Al-Husseini',
      accreditation_number: 'DOT-IX-TG-2026-088',
      languages: ['English', 'Tausug', 'Chavacano', 'Arabic'],
      contact_phone: '+63 917 882 1100',
      rating: 4.98,
      trips_completed: 142,
      specialties: 'Grand Mosque History & Islamic Architecture',
      status: 'available',
    },
    {
      id: 2,
      name: 'Fatima Marisa Tan',
      accreditation_number: 'DOT-IX-TG-2026-042',
      languages: ['Chavacano', 'English', 'Tagalog', 'Sinama'],
      contact_phone: '+63 920 771 9933',
      rating: 4.95,
      trips_completed: 98,
      specialties: 'ZAMBASULTA Sea Corridors & Malamawi Island',
      status: 'available',
    },
    {
      id: 3,
      name: 'Al-Rashid Abubakar',
      accreditation_number: 'DOT-IX-TG-2026-015',
      languages: ['Tausug', 'English', 'Malay', 'Arabic'],
      contact_phone: '+63 918 334 5522',
      rating: 4.92,
      trips_completed: 176,
      specialties: 'BIMP-EAGA Delegations & Sulu Heritage',
      status: 'on_tour',
    },
    {
      id: 4,
      name: 'Nur-Aina Sali',
      accreditation_number: 'DOT-IX-TG-2026-079',
      languages: ['English', 'Chavacano', 'Tausug'],
      contact_phone: '+63 917 550 4411',
      rating: 4.96,
      trips_completed: 84,
      specialties: 'Halal Moro Gastronomy & Yakan Weaving Culture',
      status: 'available',
    },
  ];

  const sampleBookings = bookings.length > 0 ? bookings : [
    {
      id: 1,
      booking_reference: 'PKG-2026-TU1B',
      package: samplePackages[0],
      assigned_guide_id: 1,
      assigned_guide: sampleGuides[0],
      user_name: 'Ahmad bin Abdullah',
      user_email: 'ahmad.abdullah@gmail.com',
      user_phone: '+60 12 345 6789',
      user_nationality: 'Malaysia / BIMP-EAGA',
      user_role: 'foreign_tourist',
      pax_count: 2,
      tourist_roster: [
        {
          full_name: 'Ahmad bin Abdullah',
          nickname: 'Ahmad',
          age: 45,
          gender: 'Male',
          address: 'Jalan Ampang, Kuala Lumpur, Malaysia',
          id_type: 'Passport',
          id_number: 'MY-A89214732',
          is_pwd: false,
          pwd_details: 'None',
          dietary_allergies: 'None (Strict Halal)',
          emergency_contact_name: 'Dr. Zulaikha Abdullah',
          emergency_contact_phone: '+60 12 998 1234',
        },
        {
          full_name: 'Siti Mariam binti Ismail',
          nickname: 'Mariam',
          age: 42,
          gender: 'Female',
          address: 'Jalan Ampang, Kuala Lumpur, Malaysia',
          id_type: 'Passport',
          id_number: 'MY-A89214733',
          is_pwd: false,
          pwd_details: 'None',
          dietary_allergies: 'Peanut allergy (cautious with cross-contamination)',
          emergency_contact_name: 'Ahmad bin Abdullah',
          emergency_contact_phone: '+60 12 345 6789',
        },
      ],
      travel_date: '2026-10-29',
      currency_preference: 'MYR',
      payment_channel: 'gcash',
      payment_status: 'paid',
      payment_reference: 'GCASH-981048291',
      base_price: 13000,
      gateway_fee: 275,
      total_amount_paid: 13275,
      voucher_code: 'VOUCH-PKG-2026-TU1B',
      auto_confirmed: true,
      estimated_total: 13275,
      guide_language_preference: 'Arabic & English',
      special_requests:
        'Dietary Halal strict check. Arrange Taluksangay historic mosque and Malamawi island.',
      status: 'confirmed',
      admin_notes: 'Private AC van dispatched. Auto-confirmed via GCash. Guide Ustadz Yasser assigned.',
    },
    {
      id: 2,
      booking_reference: 'PKG-2026-9122',
      package: samplePackages[1],
      assigned_guide_id: null,
      assigned_guide: null,
      user_name: 'Tariq Al-Hashimi',
      user_email: 'tariq.hashimi@almanar.ae',
      user_phone: '+971 50 123 4567',
      user_nationality: 'United Arab Emirates',
      user_role: 'foreign_tourist',
      pax_count: 4,
      tourist_roster: [
        {
          full_name: 'Tariq Al-Hashimi',
          nickname: 'Tariq',
          age: 52,
          gender: 'Male',
          address: 'Al-Bateen District, Abu Dhabi, UAE',
          id_type: 'Passport',
          id_number: 'UAE-N782109',
          is_pwd: false,
          pwd_details: 'None',
          dietary_allergies: 'None',
          emergency_contact_name: 'Omar Al-Hashimi',
          emergency_contact_phone: '+971 50 998 8776',
        },
        {
          full_name: 'Fatima Al-Zahra Al-Hashimi',
          nickname: 'Fatima',
          age: 50,
          gender: 'Female',
          address: 'Al-Bateen District, Abu Dhabi, UAE',
          id_type: 'Passport',
          id_number: 'UAE-N782110',
          is_pwd: true,
          pwd_details: 'Senior / Reduced mobility (wheelchair ramp assistance requested at heritage sites)',
          dietary_allergies: 'Gluten sensitivity',
          emergency_contact_name: 'Tariq Al-Hashimi',
          emergency_contact_phone: '+971 50 123 4567',
        },
        {
          full_name: 'Omar Tariq Al-Hashimi',
          nickname: 'Omar',
          age: 24,
          gender: 'Male',
          address: 'Al-Bateen District, Abu Dhabi, UAE',
          id_type: 'Passport',
          id_number: 'UAE-N782111',
          is_pwd: false,
          pwd_details: 'None',
          dietary_allergies: 'None',
          emergency_contact_name: 'Tariq Al-Hashimi',
          emergency_contact_phone: '+971 50 123 4567',
        },
        {
          full_name: 'Layla Tariq Al-Hashimi',
          nickname: 'Layla',
          age: 20,
          gender: 'Female',
          address: 'Al-Bateen District, Abu Dhabi, UAE',
          id_type: 'Passport',
          id_number: 'UAE-N782112',
          is_pwd: false,
          pwd_details: 'None',
          dietary_allergies: 'Lactose intolerance',
          emergency_contact_name: 'Tariq Al-Hashimi',
          emergency_contact_phone: '+971 50 123 4567',
        },
      ],
      travel_date: '2026-11-02',
      currency_preference: 'USD',
      payment_channel: 'landbank_official',
      payment_status: 'pending_verification',
      payment_reference: 'LBP-SOA-2026-90412',
      base_price: 9600,
      gateway_fee: 0,
      total_amount_paid: 9600,
      proof_of_payment_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
      voucher_code: null,
      auto_confirmed: false,
      estimated_total: 9600,
      guide_language_preference: 'English',
      special_requests: 'Requires prayer time reminders for Dhuhr and Asr between city and cultural sites.',
      status: 'pending',
      admin_notes: 'Official LandBank Statement of Account (SOA) uploaded. Pending Treasury verification.',
    },
    {
      id: 3,
      booking_reference: 'PKG-2026-7730',
      package: samplePackages[0],
      assigned_guide_id: 4,
      assigned_guide: sampleGuides[3],
      user_name: 'Hajah Dayang Bolkiah',
      user_email: 'dayang.bolkiah@brunet.bn',
      user_phone: '+673 881 2233',
      user_nationality: 'Brunei Darussalam',
      user_role: 'foreign_tourist',
      pax_count: 3,
      tourist_roster: [
        {
          full_name: 'Hajah Dayang Bolkiah',
          nickname: 'Dayang',
          age: 48,
          gender: 'Female',
          address: 'Bandar Seri Begawan, Brunei Darussalam',
          id_type: 'Passport',
          id_number: 'BN-E2390145',
          is_pwd: false,
          pwd_details: 'None',
          dietary_allergies: 'Crustacean shellfish allergy',
          emergency_contact_name: 'Pengiran Haji Idris',
          emergency_contact_phone: '+673 872 1199',
        },
        {
          full_name: 'Pengiran Haji Idris',
          nickname: 'Idris',
          age: 51,
          gender: 'Male',
          address: 'Bandar Seri Begawan, Brunei Darussalam',
          id_type: 'Passport',
          id_number: 'BN-E2390146',
          is_pwd: false,
          pwd_details: 'None',
          dietary_allergies: 'None',
          emergency_contact_name: 'Hajah Dayang Bolkiah',
          emergency_contact_phone: '+673 881 2233',
        },
        {
          full_name: 'Dayang Anisah Bolkiah',
          nickname: 'Anisah',
          age: 19,
          gender: 'Female',
          address: 'Bandar Seri Begawan, Brunei Darussalam',
          id_type: 'Passport',
          id_number: 'BN-E2390147',
          is_pwd: false,
          pwd_details: 'None',
          dietary_allergies: 'None',
          emergency_contact_name: 'Pengiran Haji Idris',
          emergency_contact_phone: '+673 872 1199',
        },
      ],
      travel_date: '2026-10-21',
      currency_preference: 'PHP',
      payment_channel: 'credit_card',
      payment_status: 'paid',
      payment_reference: 'CARD-AUTH-98310',
      base_price: 19500,
      gateway_fee: 697.50,
      total_amount_paid: 20197.50,
      voucher_code: 'VOUCH-PKG-2026-7730',
      auto_confirmed: true,
      estimated_total: 20197.50,
      guide_language_preference: 'Malay & English',
      special_requests:
        'Focus on indigenous Moro textile art and authentic Halal culinary experiences.',
      status: 'completed',
      admin_notes: 'Tour completed with 5.0 rating feedback. Auto-confirmed via card gateway. Guided by Nur-Aina Sali.',
    },
  ];

  const filteredBookings = sampleBookings.filter((b) => {
    const matchStatus = filterStatus === 'all' || b.status === filterStatus;
    const q = search.trim().toLowerCase();
    const matchSearch =
      q === '' ||
      b.user_name?.toLowerCase().includes(q) ||
      b.booking_reference?.toLowerCase().includes(q) ||
      b.user_nationality?.toLowerCase().includes(q) ||
      b.user_email?.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const handleOpenAssignModal = (booking) => {
    setAssigningBooking(booking);
    setSelectedGuideId(booking.assigned_guide_id ? String(booking.assigned_guide_id) : '');
    setAdminNotes(booking.admin_notes || '');
  };

  const handleConfirmAssignment = async (e) => {
    e.preventDefault();
    if (!assigningBooking) return;
    const guideId = selectedGuideId ? Number(selectedGuideId) : null;
    if (onUpdateBookingStatus) {
      await onUpdateBookingStatus(assigningBooking.id, 'confirmed', guideId, adminNotes);
    }
    setAssigningBooking(null);
  };

  const handleOpenEdit = (pkg) => {
    setEditingPackage(pkg);
    const incs = Array.isArray(pkg.inclusions)
      ? pkg.inclusions
          .map((i) => (typeof i === 'string' ? i : i?.text || i?.label || ''))
          .filter(Boolean)
          .join('\n')
      : '';
    setPackageFormData({
      title: pkg.title || '',
      tagline: pkg.tagline || '',
      price_php: pkg.price_php ?? 0,
      price_unit: pkg.price_unit || '',
      duration: pkg.duration || '',
      badge: pkg.badge || '',
      ideal_for: pkg.ideal_for || '',
      inclusions_text: incs,
      is_prayer_aligned: Boolean(pkg.is_prayer_aligned),
      matrix_transportation: pkg.inclusions_matrix?.transportation || '',
      matrix_fees: pkg.inclusions_matrix?.fees || '',
      matrix_activities: pkg.inclusions_matrix?.activities || '',
      matrix_attractions: pkg.inclusions_matrix?.attractions || '',
    });
    setSaveSuccessMsg('');
  };

  const handleSavePackage = async (e) => {
    e.preventDefault();
    if (!editingPackage) return;
    setIsSavingPackage(true);
    try {
      const rawInclusions = packageFormData.inclusions_text
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const newInclusions = rawInclusions.map((txt, idx) => {
        const prev = Array.isArray(editingPackage.inclusions) ? editingPackage.inclusions[idx] : null;
        return {
          icon: prev && typeof prev === 'object' && prev.icon ? prev.icon : 'checkmark-circle-outline',
          text: txt,
        };
      });

      const payload = {
        title: packageFormData.title,
        tagline: packageFormData.tagline,
        price_php: Number(packageFormData.price_php),
        price_unit: packageFormData.price_unit,
        duration: packageFormData.duration,
        badge: packageFormData.badge,
        ideal_for: packageFormData.ideal_for,
        inclusions: newInclusions,
        is_prayer_aligned: Boolean(packageFormData.is_prayer_aligned),
        inclusions_matrix: {
          transportation: packageFormData.matrix_transportation,
          fees: packageFormData.matrix_fees,
          activities: packageFormData.matrix_activities,
          attractions: packageFormData.matrix_attractions,
        },
      };

      if (onUpdatePackage) {
        await onUpdatePackage(editingPackage.package_code || editingPackage.id, payload);
      }
      setSaveSuccessMsg('Package successfully updated and synced with Mobile app!');
      setTimeout(() => {
        setEditingPackage(null);
        setSaveSuccessMsg('');
      }, 900);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingPackage(false);
    }
  };

  const pendingCount = sampleBookings.filter((b) => b.status === 'pending').length;

  return (
    <div className="space-y-5">
      {/* 1. MUNICIPAL HEADER TELEMETRY STRIP */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Briefcase className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>Packages & Bookings</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage DOT-accredited bilingual guides, package reservations, and visitor logistics across Zamboanga City.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200/80 shrink-0">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'bookings'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            <span>Booking Queue ({sampleBookings.length})</span>
            {pendingCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'packages'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Luggage className="w-3.5 h-3.5 text-emerald-700" />
            <span>Package Catalog ({samplePackages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('guides')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'guides'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-emerald-700" />
            <span>Accredited Guides ({sampleGuides.length})</span>
          </button>
        </div>
      </div>

      {/* 2. TAB CONTENT */}

      {/* TAB A: BOOKINGS DISPATCH QUEUE */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search traveler, reference ID, or country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all"
              />
              {search.length > 0 && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none cursor-pointer transition-colors"
              >
                <option value="all">All Inquiries ({sampleBookings.length})</option>
                <option value="pending">Pending Guide Assignment</option>
                <option value="confirmed">Confirmed & Guide Assigned</option>
                <option value="completed">Completed Trips</option>
              </select>
            </div>
          </div>

          {/* Bookings Ledger Cards */}
          <div className="grid grid-cols-1 gap-4">
            {filteredBookings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                <Briefcase className="w-8 h-8 text-slate-300 stroke-1 mx-auto mb-2" />
                <div className="text-sm font-bold text-slate-700">No bookings match this filter</div>
                <p className="text-xs text-slate-400 mt-1">Try switching status or keywords.</p>
              </div>
            ) : (
              filteredBookings.map((b) => {
                const pkgTitle = b.package?.title || 'Heritage Tour Expedition';
                const pkgCode = b.package?.code_label || 'PACKAGE';
                const guide = b.assigned_guide;

                return (
                  <div
                    key={b.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all space-y-4 group"
                  >
                    {/* Header Strip */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {b.booking_reference}
                          </span>
                          <span className="text-sm font-black text-slate-900">{b.user_name}</span>
                          <span className="text-xs font-bold text-slate-500">({b.user_nationality})</span>
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                              b.status === 'confirmed'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : b.status === 'completed'
                                ? 'bg-slate-100 text-slate-700 border-slate-200'
                                : 'bg-amber-50 text-amber-800 border-amber-200'
                            }`}
                          >
                            {b.status === 'confirmed'
                              ? '✓ Guide Assigned'
                              : b.status === 'completed'
                              ? 'Trip Completed'
                              : 'Pending Assignment'}
                          </span>

                          {/* Payment Channel & Gateway Status Pill */}
                          {b.payment_status === 'paid' ? (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                              💳 {b.payment_channel ? b.payment_channel.toUpperCase() : 'ONLINE'}: Paid ₱{(b.total_amount_paid || b.estimated_total)?.toLocaleString()}
                              {b.auto_confirmed && ' (Auto-Confirmed)'}
                            </span>
                          ) : b.payment_channel === 'landbank_official' ? (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
                              🏦 LandBank SOA Deposit Slip Uploaded
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                              Pending Payment
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-slate-500 flex items-center gap-3 mt-1.5 flex-wrap">
                          <span className="flex items-center gap-1 font-semibold">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" /> {b.travel_date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-semibold">
                            <Users className="w-3.5 h-3.5 text-slate-400" /> {b.pax_count} Travelers
                          </span>
                          <span>•</span>
                          <span className="font-bold text-emerald-700">
                            ₱{b.estimated_total?.toLocaleString()} Total
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                          Booked Tier
                        </span>
                        <span className="text-xs font-bold text-slate-800">{pkgCode}: {pkgTitle}</span>
                      </div>
                    </div>

                    {/* Assigned Guide & Requests Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {/* Guide Box */}
                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1.5">
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                          Accredited Tour Guide
                        </div>
                        {guide ? (
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-extrabold text-slate-900">{guide.name}</div>
                              <div className="text-[11px] text-slate-500 font-mono">
                                {guide.accreditation_number}
                              </div>
                            </div>
                            <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {guide.rating}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <span className="text-amber-700 font-bold">No guide assigned yet</span>
                            <button
                              onClick={() => handleOpenAssignModal(b)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] cursor-pointer"
                            >
                              Dispatch Guide →
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Traveler Request Box */}
                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1.5">
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                          Special Requirements & Diet
                        </div>
                        <p className="text-[11px] text-slate-700 leading-snug truncate">
                          {b.special_requests || 'Standard Halal itinerary requested.'}
                        </p>
                        <div className="text-[11px] text-slate-500 font-medium">
                          Language preference: <strong>{b.guide_language_preference}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] text-slate-500 font-mono">
                          Contact: {b.user_phone} • {b.user_email}
                        </span>
                        {Array.isArray(b.tourist_roster) &&
                          b.tourist_roster.some(
                            (g) => g.is_pwd || (g.dietary_allergies && g.dietary_allergies.toLowerCase() !== 'none')
                          ) && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-rose-600" />
                              <span>Accessibility / Allergy Note</span>
                            </span>
                          )}
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {/* LandBank SOA Verification Button */}
                        {b.payment_channel === 'landbank_official' && b.payment_status === 'pending_verification' && (
                          <button
                            type="button"
                            onClick={() => setVerifyingSoaBooking(b)}
                            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Verify LandBank SOA</span>
                          </button>
                        )}

                        {/* Digital Voucher Button */}
                        {(b.voucher_code || b.payment_status === 'paid' || b.status === 'confirmed') && (
                          <button
                            type="button"
                            onClick={() => setViewingVoucherBooking(b)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-emerald-200"
                          >
                            <QrCode className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Digital Voucher</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setViewingManifestBooking(b)}
                          className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-rose-200"
                        >
                          <Users className="w-3.5 h-3.5 text-rose-600" />
                          <span>Guest Manifest ({b.tourist_roster?.length || b.pax_count} Pax)</span>
                        </button>

                        <button
                          onClick={() => handleOpenAssignModal(b)}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-all cursor-pointer flex items-center gap-1"
                        >
                          <UserCheck className="w-3.5 h-3.5 text-slate-600" />
                          <span>{b.assigned_guide ? 'Reassign Guide' : 'Assign Guide'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB B: PACKAGE CATALOG BENTO */}
      {activeTab === 'packages' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {samplePackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-5 hover:border-emerald-300 hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {pkg.code_label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {pkg.is_prayer_aligned && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200">
                        🕌 Prayer-Aligned
                      </span>
                    )}
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                      {pkg.badge}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-black text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                  {pkg.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">{pkg.tagline}</p>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="text-2xl font-black text-slate-900 font-mono">
                    ₱{Number(pkg.price_php || 0).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-500 font-bold mt-0.5">
                    {pkg.price_unit} • {pkg.duration}
                  </div>
                </div>

                {/* Statutory Matrix Display */}
                {pkg.inclusions_matrix && (
                  <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-1.5 text-xs">
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                      Statutory Inclusions Matrix
                    </div>
                    <div className="space-y-1 text-[11px]">
                      <div><strong className="text-slate-800">🚗 Transit:</strong> <span className="text-slate-600">{pkg.inclusions_matrix.transportation}</span></div>
                      <div><strong className="text-slate-800">🎟️ Fees:</strong> <span className="text-slate-600">{pkg.inclusions_matrix.fees}</span></div>
                      <div><strong className="text-slate-800">🎨 Activities:</strong> <span className="text-slate-600">{pkg.inclusions_matrix.activities}</span></div>
                      <div><strong className="text-slate-800">🏛️ Sites:</strong> <span className="text-slate-600">{pkg.inclusions_matrix.attractions}</span></div>
                    </div>
                  </div>
                )}

                <div className="space-y-2 pt-2">
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    Key Inclusions
                  </div>
                  {Array.isArray(pkg.inclusions) &&
                    pkg.inclusions.map((inc, i) => {
                      const text =
                        typeof inc === 'string'
                          ? inc
                          : inc?.text || inc?.title || inc?.label || '';
                      return (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="leading-snug">{text}</span>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="text-xs text-slate-500 italic">
                  Ideal for: {pkg.ideal_for}
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenEdit(pkg)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-50 hover:bg-emerald-700 hover:text-white text-slate-700 font-bold text-xs transition-all cursor-pointer border border-slate-200/80 shadow-2xs group-hover:border-emerald-300"
                >
                  <Edit3 className="w-3.5 h-3.5 text-emerald-700 group-hover:text-current" />
                  <span>Edit Package & Pricing</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB C: ACCREDITED GUIDES ROSTER */}
      {activeTab === 'guides' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{guide.name}</h3>
                    <p className="font-mono text-[11px] text-slate-500 mt-0.5">
                      {guide.accreditation_number}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${
                      guide.status === 'available'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {guide.status === 'available' ? '● Available' : '● On Tour'}
                  </span>
                </div>

                <div className="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-semibold">Specialization:</span>
                    <span className="font-bold text-slate-800">{guide.specialties}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-semibold">Trips Guided:</span>
                    <span className="font-bold text-slate-800">{guide.trips_completed} Missions</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-semibold">Pilgrim Rating:</span>
                    <span className="font-bold text-amber-600 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {guide.rating} / 5.0
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Languages:
                  </span>
                  {guide.languages.map((lang, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500 font-semibold">📞 {guide.contact_phone}</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  DOT Accredited
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. GUIDE ASSIGNMENT MODAL DRAWER */}
      {assigningBooking && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white">
                  <UserCheck className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold">Assign Accredited Tour Guide</h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {assigningBooking.booking_reference} • {assigningBooking.user_name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAssigningBooking(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmAssignment} className="p-6 space-y-4 text-xs font-medium">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Travel Date:</span>
                  <span className="font-bold text-slate-900">{assigningBooking.travel_date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Group Size:</span>
                  <span className="font-bold text-slate-900">{assigningBooking.pax_count} Pax</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Language Requested:</span>
                  <span className="font-bold text-emerald-700">
                    {assigningBooking.guide_language_preference}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Select Accredited Guide *
                </label>
                <select
                  required
                  value={selectedGuideId}
                  onChange={(e) => setSelectedGuideId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none cursor-pointer"
                >
                  <option value="">-- Choose DOT Accredited Guide --</option>
                  {sampleGuides.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name} ({g.languages.join(', ')}) — Rating: {g.rating}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Operational Logistics Notes
                </label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Van pickup time, fastcraft booking code, or halal dietary instructions..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setAssigningBooking(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-950/20 cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Guide Dispatch</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PACKAGE */}
      {editingPackage && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Edit {editingPackage.code_label || editingPackage.package_code}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Changes sync live with the mobile app and tourist booking flow
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingPackage(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                aria-label="Close package editor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {saveSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSavePackage} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-bold mb-1">
                    Package Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={packageFormData.title}
                    onChange={(e) =>
                      setPackageFormData({ ...packageFormData, title: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-bold mb-1">
                    Tagline / Short Pitch *
                  </label>
                  <input
                    type="text"
                    required
                    value={packageFormData.tagline}
                    onChange={(e) =>
                      setPackageFormData({ ...packageFormData, tagline: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Price (PHP ₱) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    required
                    value={packageFormData.price_php}
                    onChange={(e) =>
                      setPackageFormData({ ...packageFormData, price_php: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-mono font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Price Unit Description
                  </label>
                  <input
                    type="text"
                    value={packageFormData.price_unit}
                    onChange={(e) =>
                      setPackageFormData({ ...packageFormData, price_unit: e.target.value })
                    }
                    placeholder="/ person (all-inclusive)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={packageFormData.duration}
                    onChange={(e) =>
                      setPackageFormData({ ...packageFormData, duration: e.target.value })
                    }
                    placeholder="3 Days / 2 Nights"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={packageFormData.badge}
                    onChange={(e) =>
                      setPackageFormData({ ...packageFormData, badge: e.target.value })
                    }
                    placeholder="MOST POPULAR FOR FAMILIES"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={packageFormData.is_prayer_aligned}
                      onChange={(e) =>
                        setPackageFormData({ ...packageFormData, is_prayer_aligned: e.target.checked })
                      }
                      className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">🕌 Prayer-Aligned Itinerary</div>
                      <div className="text-[11px] text-slate-500">
                        Synchronizes schedule with 5 daily prayers (Fajr, Dhuhr, Asr, Maghrib, Isha) and designated Masjids
                      </div>
                    </div>
                  </label>
                </div>

                {/* Statutory Matrix Inputs */}
                <div className="sm:col-span-2 pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                    Statutory Inclusions Matrix (4 Legal Pillars)
                  </div>
                  <div className="space-y-2.5">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-0.5">
                        1. Transportation
                      </label>
                      <input
                        type="text"
                        value={packageFormData.matrix_transportation}
                        onChange={(e) =>
                          setPackageFormData({ ...packageFormData, matrix_transportation: e.target.value })
                        }
                        placeholder="Private Air-Conditioned Van with dedicated airport transfers"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-0.5">
                        2. Fees & Permits
                      </label>
                      <input
                        type="text"
                        value={packageFormData.matrix_fees}
                        onChange={(e) =>
                          setPackageFormData({ ...packageFormData, matrix_fees: e.target.value })
                        }
                        placeholder="All Entrance Fees, Environmental Fees & Barangay Permits included"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-0.5">
                        3. Activities
                      </label>
                      <input
                        type="text"
                        value={packageFormData.matrix_activities}
                        onChange={(e) =>
                          setPackageFormData({ ...packageFormData, matrix_activities: e.target.value })
                        }
                        placeholder="Curated Yakan Weaving Demonstration, Tiula Itum masterclass"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-0.5">
                        4. Attractions
                      </label>
                      <input
                        type="text"
                        value={packageFormData.matrix_attractions}
                        onChange={(e) =>
                          setPackageFormData({ ...packageFormData, matrix_attractions: e.target.value })
                        }
                        placeholder="Fort Pilar National Museum, Taluksangay Historic Mosque, Sadik Grand Mosque"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-bold mb-1">
                    Ideal For
                  </label>
                  <input
                    type="text"
                    value={packageFormData.ideal_for}
                    onChange={(e) =>
                      setPackageFormData({ ...packageFormData, ideal_for: e.target.value })
                    }
                    placeholder="Families, international pilgrims, senior citizens..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-bold mb-1">
                    Key Inclusions (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={packageFormData.inclusions_text}
                    onChange={(e) =>
                      setPackageFormData({ ...packageFormData, inclusions_text: e.target.value })
                    }
                    placeholder="Accredited Bilingual Tour Guide&#10;Private Air-Conditioned Van&#10;VIP Cultural Passes"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none leading-relaxed"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingPackage(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingPackage}
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-emerald-950/20 cursor-pointer flex items-center gap-1.5"
                >
                  {isSavingPackage ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Save & Sync to Mobile</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PASSENGER MANIFEST & GUEST SAFETY ROSTER */}
      {viewingManifestBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900">
                      Official Passenger Manifest & Safety Roster
                    </h3>
                    <span className="font-mono text-xs font-black px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                      {viewingManifestBooking.booking_reference}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    LGU City Tourism Office & Coast Guard Maritime Safety Compliance
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  title="Print official passenger manifest"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setViewingManifestBooking(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                  aria-label="Close manifest"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tour & Logistics Summary Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Package Tier</span>
                <span className="font-bold text-slate-800">
                  {viewingManifestBooking.package?.title || 'Heritage Tour'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Travel Date</span>
                <span className="font-bold text-slate-800">{viewingManifestBooking.travel_date}</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Total Pax</span>
                <span className="font-bold text-slate-800">
                  {viewingManifestBooking.tourist_roster?.length || viewingManifestBooking.pax_count} Registered
                </span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Assigned Guide</span>
                <span className="font-bold text-emerald-700">
                  {viewingManifestBooking.assigned_guide?.name || 'Pending Guide'}
                </span>
              </div>
            </div>

            {/* Tourist Guest Cards Roster */}
            <div className="space-y-3">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                Registered Guests ({viewingManifestBooking.tourist_roster?.length || 1})
              </div>

              {Array.isArray(viewingManifestBooking.tourist_roster) &&
              viewingManifestBooking.tourist_roster.length > 0 ? (
                viewingManifestBooking.tourist_roster.map((guest, gIdx) => (
                  <div
                    key={gIdx}
                    className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-3 hover:border-rose-200 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 text-xs font-black flex items-center justify-center shrink-0">
                          {gIdx + 1}
                        </span>
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          <span className="text-sm font-black text-slate-900">{guest.full_name}</span>
                          {guest.nickname && (
                            <span className="text-xs text-slate-500 italic">({guest.nickname})</span>
                          )}
                          {gIdx === 0 && (
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                              Lead Traveler
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {guest.is_pwd && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                            ♿ PWD Assistance
                          </span>
                        )}
                        {guest.dietary_allergies &&
                          guest.dietary_allergies.toLowerCase() !== 'none' &&
                          !guest.dietary_allergies.toLowerCase().includes('strict halal') && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                              ⚠️ {guest.dietary_allergies}
                            </span>
                          )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Demographics</span>
                        <span className="text-slate-800 font-medium">
                          {guest.age} years old • {guest.gender || 'Not specified'}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                          ID / Travel Document
                        </span>
                        <span className="font-mono text-slate-800 font-bold">
                          {guest.id_type || 'ID'}: {guest.id_number || 'N/A'}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                          Origin / Address
                        </span>
                        <span className="text-slate-700 font-medium truncate block">
                          {guest.address || viewingManifestBooking.user_nationality || 'ASEAN'}
                        </span>
                      </div>
                    </div>

                    {/* Safety, PWD & Emergency Contact Strip */}
                    <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                        <span className="text-[10px] font-extrabold uppercase text-slate-500 block mb-0.5">
                          Accessibility & Health
                        </span>
                        <div className="text-[11px] text-slate-700">
                          {guest.is_pwd ? (
                            <span className="font-bold text-rose-700">
                              Requires: {guest.pwd_details || 'Mobility Assistance'}
                            </span>
                          ) : (
                            <span className="text-slate-500">Standard mobility</span>
                          )}
                          {' • '}
                          <span className="text-slate-600">
                            Diet: {guest.dietary_allergies || 'Halal'}
                          </span>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                        <span className="text-[10px] font-extrabold uppercase text-slate-500 block mb-0.5">
                          Emergency Contact
                        </span>
                        <div className="text-[11px] text-slate-800 font-semibold">
                          {guest.emergency_contact_name || viewingManifestBooking.user_name}
                          {' ('}
                          <span className="font-mono text-slate-600">
                            {guest.emergency_contact_phone || viewingManifestBooking.user_phone}
                          </span>
                          {')'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600">
                  <div className="font-bold text-slate-800">Primary Lead Guest: {viewingManifestBooking.user_name}</div>
                  <div className="text-slate-500 mt-1">
                    Contact: {viewingManifestBooking.user_phone} • {viewingManifestBooking.user_email}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500 italic">
                Manifest recorded with timestamp & certified under VintaGo Safety Standard.
              </span>
              <button
                type="button"
                onClick={() => setViewingManifestBooking(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer"
              >
                Close Manifest
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: OFFICIAL DIGITAL TOUR VOUCHER */}
      {viewingVoucherBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900">Digital Tour Confirmation Voucher</h3>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {viewingVoucherBooking.auto_confirmed ? '✓ AUTO-CONFIRMED' : 'CLEARANCE VERIFIED'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Official Municipal Tourism E-Voucher Pass</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  title="Print Digital Voucher"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setViewingVoucherBooking(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                  aria-label="Close voucher"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Voucher Card Container */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/90 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                    Voucher Reference Code
                  </span>
                  <span className="font-mono text-base font-black text-emerald-800">
                    {viewingVoucherBooking.voucher_code || `VOUCH-${viewingVoucherBooking.booking_reference}`}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                    Paid Total
                  </span>
                  <span className="font-mono text-base font-black text-slate-900">
                    ₱{(viewingVoucherBooking.total_amount_paid || viewingVoucherBooking.estimated_total)?.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* QR Simulation */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center gap-2">
                <QrCode className="w-20 h-20 text-slate-900" />
                <span className="font-mono text-[10px] text-slate-400">
                  VINTAGO://VERIFY/{viewingVoucherBooking.booking_reference}/AUTH-2026
                </span>
                <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ✓ Verified DOT-IX Encrypted Tourism Pass
                </span>
              </div>

              {/* Departure Reminder Alert */}
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs flex items-center gap-2 text-rose-800">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="font-semibold">
                  Tour scheduled for {viewingVoucherBooking.travel_date}. Please assemble at City Hall Tourism Desk with valid IDs matching the passenger manifest.
                </span>
              </div>

              {/* Logistics Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Expedition Tier</span>
                  <span className="font-bold text-slate-800">{viewingVoucherBooking.package?.title}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Assigned Guide</span>
                  <span className="font-bold text-slate-800">
                    {viewingVoucherBooking.assigned_guide?.name || 'City Tourism Guide'}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Assembly Schedule</span>
                  <span className="font-bold text-slate-800">
                    {viewingVoucherBooking.package?.is_prayer_aligned ? '04:30 AM (Fajr / Sunrise)' : '07:30 AM (Morning Departure)'}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Passenger Manifest</span>
                  <span className="font-bold text-slate-800">
                    {viewingVoucherBooking.tourist_roster?.length || viewingVoucherBooking.pax_count} Verified Guests
                  </span>
                </div>
              </div>

              {/* Zero Cash Notice Footer */}
              <div className="text-[11px] text-slate-500 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100 text-center font-medium">
                🛡️ Verified Zero Cash Policy: Paid via {viewingVoucherBooking.payment_channel ? viewingVoucherBooking.payment_channel.toUpperCase() : 'ONLINE'}. No cash or handling fees permitted on-site.
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setViewingVoucherBooking(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
              >
                Close Voucher
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VERIFY LANDBANK SOA SLIP */}
      {verifyingSoaBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Verify LandBank SOA Deposit Slip</h3>
                  <p className="text-xs text-slate-500">Official Municipal Tourism Trust Account Deposit</p>
                </div>
              </div>
              <button
                onClick={() => setVerifyingSoaBooking(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                aria-label="Close SOA verification"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-blue-50 p-3.5 rounded-2xl border border-blue-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-blue-900">Official Deposit Slip Reference:</span>
                  <span className="font-mono font-bold text-blue-900">
                    {verifyingSoaBooking.payment_reference || 'LBP-SOA-2026-90412'}
                  </span>
                </div>
                <div className="text-[11px] text-blue-700">
                  Beneficiary: City Government of Zamboanga Tourism Trust • LBP Acct: 0192-1082-99
                </div>
                <div className="text-[11px] text-blue-700 font-bold">
                  Amount Deposited: ₱{Number(verifyingSoaBooking.base_price || verifyingSoaBooking.estimated_total).toLocaleString()} (0% Gateway Surcharge)
                </div>
              </div>

              {/* Uploaded Receipt Preview */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">Uploaded Deposit Slip Preview:</label>
                <div className="rounded-xl overflow-hidden border border-slate-200 h-44 bg-slate-100 flex items-center justify-center">
                  <img
                    src={verifyingSoaBooking.proof_of_payment_url || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'}
                    alt="LandBank Deposit Slip"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setVerifyingSoaBooking(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    if (onUpdateBookingStatus) {
                      await onUpdateBookingStatus(
                        verifyingSoaBooking.id,
                        'confirmed',
                        verifyingSoaBooking.assigned_guide_id || 1,
                        'Official LandBank SOA verified & approved by Tourism Treasury. Digital voucher issued.'
                      );
                    }
                    setVerifyingSoaBooking(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-900/20 cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Clearance & Issue Voucher</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
