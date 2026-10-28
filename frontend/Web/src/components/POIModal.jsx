import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  CheckCircle,
  Building,
  Utensils,
  ShoppingBag,
  Landmark,
  Phone,
  Tag,
  Image as ImageIcon,
  FileText,
  Sparkles,
  Droplets,
  Users,
  Snowflake,
  ShieldCheck,
  Ban,
  Car,
  Accessibility,
  ChevronRight,
  ChevronLeft,
  Layers,
  Compass,
} from 'lucide-react';
import InteractiveMapPicker from './InteractiveMapPicker';

export default function POIModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  defaultCategory = 'worship',
}) {
  const [activeStep, setActiveStep] = useState(1); // 1: Identity & Tier, 2: Location & Map, 3: Facilities & Details

  const [formData, setFormData] = useState({
    name: '',
    category: 'worship',
    tier: 'tier1',
    address: '',
    latitude: 6.9580,
    longitude: 122.1400,
    phone: '',
    cuisine: '',
    priceRange: '$',
    hours: 'Open Daily',
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
    description: '',
    certBody: 'Zamboanga City Islamic Council & NCMF',
    certNumber: 'MOSQ-ZAM-2026-01',
    isMuslimFriendly: false,
    hasSeparateCooking: false,
    hasPrayerRoom: false,
    supplierName: '',
    supplierLocation: '',
    accreditationNumber: '',
    mayorsPermitNumber: '',
    dtiSecRegistration: '',
    promotionTier: 'organic',
    isPromoted: false,
    sponsorshipNotes: '',
    amenities: ['wudu_area', 'female_section'],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        isMuslimFriendly: initialData.isMuslimFriendly ?? false,
        hasSeparateCooking: initialData.hasSeparateCooking ?? false,
        hasPrayerRoom: initialData.hasPrayerRoom ?? false,
        supplierName: initialData.supplierName || '',
        supplierLocation: initialData.supplierLocation || '',
        accreditationNumber: initialData.accreditationNumber || '',
        mayorsPermitNumber: initialData.mayorsPermitNumber || '',
        dtiSecRegistration: initialData.dtiSecRegistration || '',
        promotionTier: initialData.promotionTier || (initialData.isPromoted ? 'featured' : 'organic'),
        isPromoted: initialData.isPromoted ?? false,
        sponsorshipNotes: initialData.sponsorshipNotes || '',
        image:
          initialData.image ||
          initialData.image_url ||
          'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
        hours: initialData.hours || initialData.operating_hours || 'Open Daily',
        priceRange: initialData.priceRange || initialData.price_range || '$',
        amenities:
          initialData.amenities?.map((a) => (typeof a === 'string' ? a : a.id || a.code)) || [
            'wudu_area',
          ],
      });
    } else {
      setFormData({
        name: '',
        category: defaultCategory || 'worship',
        tier: defaultCategory === 'worship' ? 'tier1' : 'tier2',
        isMuslimFriendly: defaultCategory === 'dining',
        hasSeparateCooking: defaultCategory === 'dining',
        hasPrayerRoom: defaultCategory === 'worship' || defaultCategory === 'dining',
        supplierName: '',
        supplierLocation: '',
        accreditationNumber: '',
        mayorsPermitNumber: '',
        dtiSecRegistration: '',
        promotionTier: 'organic',
        isPromoted: false,
        sponsorshipNotes: '',
        address: '',
        latitude: 6.9580,
        longitude: 122.1400,
        phone: '',
        cuisine: '',
        priceRange: defaultCategory === 'worship' ? 'Free' : '$',
        hours:
          defaultCategory === 'worship'
            ? 'Open 24 Hours (All 5 Prayers)'
            : '08:00 AM - 09:00 PM',
        image:
          defaultCategory === 'worship'
            ? 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80'
            : defaultCategory === 'dining'
            ? 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
            : 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
        description: '',
        certBody: 'Zamboanga City Islamic Council & NCMF',
        certNumber: 'MOSQ-ZAM-2026-01',
        amenities:
          defaultCategory === 'worship'
            ? ['wudu_area', 'female_section']
            : ['muslim_owned', 'alcohol_free'],
      });
    }
    setActiveStep(1);
  }, [initialData, defaultCategory, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const toggleAmenity = (code) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(code)
        ? prev.amenities.filter((c) => c !== code)
        : [...prev.amenities, code],
    }));
  };

  const amenityOptions = [
    { code: 'wudu_area', label: 'Running Water Wudu Stations', icon: Droplets },
    { code: 'female_section', label: 'Separate Female Mezzanine / Hall', icon: Users },
    { code: 'air_conditioned', label: 'Air-Cooled Main Hall', icon: Snowflake },
    { code: 'halal_kitchen', label: '100% Halal Certified Kitchen', icon: ShieldCheck },
    { code: 'alcohol_free', label: 'Strictly Alcohol-Free Premises', icon: Ban },
    { code: 'parking', label: 'Visitor & Bus Parking Area', icon: Car },
    { code: 'wheelchair', label: 'Wheelchair Accessible Ramps', icon: Accessibility },
  ];

  const getModalTitle = () => {
    if (initialData) return `Edit: ${initialData.name}`;
    if (formData.category === 'worship') return 'Register New Mosque / Masjid';
    if (formData.category === 'dining') return 'Register Halal Food Establishment';
    if (formData.category === 'market') return 'Register Halal Barter Trade Market';
    return 'Register Cultural Heritage Landmark';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-950/50 shrink-0">
              <MapPin className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>{getModalTitle()}</span>
              </h3>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                Zamboanga City Tourism & Islamic Affairs Registry
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Multi-Step Tab Bar */}
        <div className="bg-slate-50 border-b border-slate-200/80 px-6 py-2 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            {[
              { step: 1, label: '1. Identity & Tier', icon: Building },
              { step: 2, label: '2. Location & GIS Map', icon: Compass },
              { step: 3, label: '3. Amenities & Profile', icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeStep === tab.step;
              return (
                <button
                  key={tab.step}
                  type="button"
                  onClick={() => setActiveStep(tab.step)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-emerald-900 shadow-xs border border-slate-200'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider hidden sm:inline">
            Step {activeStep} of 3
          </span>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs font-medium flex-1">
          {/* STEP 1: IDENTITY & HALAL TIER */}
          {activeStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Establishment / Mosque Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sadik Grand Mosque (Mercedes)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none cursor-pointer transition-all"
                  >
                    <option value="worship">Mosques & Masjids</option>
                    <option value="dining">Halal Dining & Food</option>
                    <option value="market">Barter Trade Markets</option>
                    <option value="cultural">Cultural Heritage & Museums</option>
                  </select>
                </div>
              </div>

              {/* Halal Verification Tier Cards */}
              <div className="space-y-2">
                <label className="block text-slate-700 font-bold">Halal Verification Tier *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    {
                      id: 'tier1',
                      title: 'Tier 1: Certified / Mosque',
                      desc: 'Accredited by NCMF or recognized Islamic Council.',
                      color: 'border-emerald-500 bg-emerald-50 text-emerald-950',
                    },
                    {
                      id: 'tier2',
                      title: 'Tier 2: Muslim-Owned Kitchen',
                      desc: '100% Muslim-owned & operated food establishment.',
                      color: 'border-blue-500 bg-blue-50 text-blue-950',
                    },
                    {
                      id: 'tier3',
                      title: 'Tier 3: Halal-Friendly Options',
                      desc: 'Certified halal meat suppliers with segregated preparation.',
                      color: 'border-amber-500 bg-amber-50 text-amber-950',
                    },
                    {
                      id: 'tier4',
                      title: 'Tier 4: Vegan / Seafood',
                      desc: 'Vegetarian or fresh marine catch with no pork/alcohol.',
                      color: 'border-slate-500 bg-slate-50 text-slate-900',
                    },
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setFormData({ ...formData, tier: t.id })}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        formData.tier === t.id
                          ? `${t.color} ring-2 ring-emerald-600/30 font-bold shadow-xs`
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-extrabold">{t.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Image URL & Preview */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Representative Photo URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* STEP 2: LOCATION & GIS MAP */}
          {activeStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-slate-700 font-bold">
                    GIS Pin Drop (Click to update coordinates)
                  </label>
                  <span className="font-mono text-[11px] text-emerald-800 font-extrabold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    {formData.latitude?.toFixed(4)}, {formData.longitude?.toFixed(4)}
                  </span>
                </div>

                <InteractiveMapPicker
                  latitude={formData.latitude}
                  longitude={formData.longitude}
                  onCoordinatesChange={(lat, lng) =>
                    setFormData({ ...formData, latitude: lat, longitude: lng })
                  }
                  height="210px"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Barangay & Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. MCLL Highway, Barangay Mercedes, Zamboanga City"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+63 62 991 9900"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Operating Hours / Prayer Schedule
                  </label>
                  <input
                    type="text"
                    value={formData.hours}
                    onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                    placeholder="e.g. Open 24 Hours (All 5 Daily Prayers)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Price Range / Entry Fee
                  </label>
                  <input
                    type="text"
                    value={formData.priceRange}
                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                    placeholder="Free / $ / $$"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: AMENITIES & DETAILS */}
          {activeStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="space-y-2">
                <label className="block text-slate-700 font-bold">
                  Verified Facilities & Islamic Amenities
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {amenityOptions.map((a) => {
                    const isChecked = formData.amenities.includes(a.code);
                    const Icon = a.icon;
                    return (
                      <button
                        key={a.code}
                        type="button"
                        onClick={() => toggleAmenity(a.code)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                            : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                            isChecked
                              ? 'bg-emerald-700 border-emerald-700 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <CheckCircle className="w-3 h-3" />}
                        </div>
                        <Icon className={`w-3.5 h-3.5 ${isChecked ? 'text-emerald-700' : 'text-slate-400'}`} />
                        <span className="text-xs truncate">{a.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Culinary Specialty / Architectural Highlight
                </label>
                <input
                  type="text"
                  value={formData.cuisine}
                  onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                  placeholder="e.g. Largest Grand Mosque in Zamboanga, Tiula Itum, or Barter Weaving"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all"
                />
              </div>

              {/* Muslim-Friendly & Supplier Transparency Audit */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    Muslim-Friendly & Supplier Transparency
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-md">
                    RA 9593 / Halal Alternative
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isMuslimFriendly}
                      onChange={(e) => setFormData({ ...formData, isMuslimFriendly: e.target.checked })}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="font-bold text-slate-700">Muslim-Friendly</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasSeparateCooking}
                      onChange={(e) => setFormData({ ...formData, hasSeparateCooking: e.target.checked })}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="font-bold text-slate-700">Separate Cooking</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasPrayerRoom}
                      onChange={(e) => setFormData({ ...formData, hasPrayerRoom: e.target.checked })}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="font-bold text-slate-700">Customer Musalla</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Certified Halal Supplier Name
                    </label>
                    <input
                      type="text"
                      value={formData.supplierName}
                      onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                      placeholder="e.g. Mindanao Halal Poultry Corp."
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Supplier Location (Transparency)
                    </label>
                    <input
                      type="text"
                      value={formData.supplierLocation}
                      onChange={(e) => setFormData({ ...formData, supplierLocation: e.target.value })}
                      placeholder="e.g. Barangay San Roque, Zamboanga City"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                {/* RA 9593 Accreditation & Licensing Docket */}
                <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>RA 9593 Licensing & Statutory Compliance</span>
                    </span>
                    {(formData.accreditationNumber?.trim() || formData.mayorsPermitNumber?.trim()) ? (
                      <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                        ✓ RA 9593 ELIGIBLE
                      </span>
                    ) : (
                      <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-300">
                        ORGANIC ONLY (NO PERMIT ON FILE)
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                        DOT Accreditation No.
                      </label>
                      <input
                        type="text"
                        value={formData.accreditationNumber}
                        onChange={(e) => setFormData({ ...formData, accreditationNumber: e.target.value })}
                        placeholder="DOT-RO9-ACC-2026-088"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-medium outline-none focus:bg-white focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                        LGU Mayor's Permit No.
                      </label>
                      <input
                        type="text"
                        value={formData.mayorsPermitNumber}
                        onChange={(e) => setFormData({ ...formData, mayorsPermitNumber: e.target.value })}
                        placeholder="MP-ZC-2026-8819"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-medium outline-none focus:bg-white focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                        DTI / SEC Registration No.
                      </label>
                      <input
                        type="text"
                        value={formData.dtiSecRegistration}
                        onChange={(e) => setFormData({ ...formData, dtiSecRegistration: e.target.value })}
                        placeholder="DTI-BN-2026-00912"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-medium outline-none focus:bg-white focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  {/* Promotion Controls & Statutory Gate */}
                  <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <label className={`flex items-center gap-2 cursor-pointer text-xs font-bold ${
                        (formData.accreditationNumber?.trim() || formData.mayorsPermitNumber?.trim())
                          ? 'text-amber-800'
                          : 'text-slate-400 cursor-not-allowed'
                      }`}>
                        <input
                          type="checkbox"
                          disabled={!formData.accreditationNumber?.trim() && !formData.mayorsPermitNumber?.trim()}
                          checked={formData.isPromoted}
                          onChange={(e) => {
                            if (!formData.accreditationNumber?.trim() && !formData.mayorsPermitNumber?.trim()) {
                              alert('RA 9593 Statutory Gate: An establishment must have a valid DOT Accreditation Number or LGU Mayor\'s Business Permit before it can be featured or promoted.');
                              return;
                            }
                            setFormData({
                              ...formData,
                              isPromoted: e.target.checked,
                              promotionTier: e.target.checked ? (formData.promotionTier === 'organic' ? 'featured' : formData.promotionTier) : 'organic',
                            });
                          }}
                          className="rounded text-amber-600 focus:ring-amber-500"
                        />
                        <span>Feature in "Top Recommended" (Mobile & Web)</span>
                      </label>

                      {formData.isPromoted && (
                        <select
                          value={formData.promotionTier}
                          onChange={(e) => setFormData({ ...formData, promotionTier: e.target.value })}
                          className="text-[11px] font-bold bg-amber-50 border border-amber-200 text-amber-900 rounded-lg px-2 py-1 outline-none"
                        >
                          <option value="featured">Tier: Featured Partner</option>
                          <option value="sponsored">Tier: Sponsored Spot</option>
                        </select>
                      )}
                    </div>

                    {!formData.accreditationNumber?.trim() && !formData.mayorsPermitNumber?.trim() && (
                      <span className="text-[10px] text-amber-700 font-medium italic">
                        * Promotion gate locked per RA 9593 Section 39
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Detailed Overview & History
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide historical context, hall capacities, imam details, or community significance..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none leading-relaxed transition-all"
                />
              </div>
            </div>
          )}

          {/* Modal Actions Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
            <div>
              {activeStep > 1 && (
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => prev - 1)}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs transition-all cursor-pointer"
              >
                Cancel
              </button>

              {activeStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => prev + 1)}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-950/20 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{initialData ? 'Save Changes' : 'Publish to Registry'}</span>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
