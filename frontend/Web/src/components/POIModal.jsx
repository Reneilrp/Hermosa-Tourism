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
} from 'lucide-react';
import InteractiveMapPicker from './InteractiveMapPicker';

export default function POIModal({ isOpen, onClose, onSave, initialData, defaultCategory = 'worship' }) {
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
    amenities: ['wudu_area', 'female_section'],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        image: initialData.image || initialData.image_url || 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
        hours: initialData.hours || initialData.operating_hours || 'Open Daily',
        priceRange: initialData.priceRange || initialData.price_range || '$',
        amenities: initialData.amenities?.map((a) => (typeof a === 'string' ? a : a.id || a.code)) || ['wudu_area'],
      });
    } else {
      setFormData({
        name: '',
        category: defaultCategory || 'worship',
        tier: defaultCategory === 'worship' ? 'tier1' : 'tier2',
        address: '',
        latitude: 6.9580,
        longitude: 122.1400,
        phone: '',
        cuisine: '',
        priceRange: defaultCategory === 'worship' ? 'Free' : '$',
        hours: defaultCategory === 'worship' ? 'Open 24 Hours (All 5 Prayers)' : '08:00 AM - 09:00 PM',
        image: defaultCategory === 'worship'
          ? 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80'
          : defaultCategory === 'dining'
          ? 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
          : 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
        description: '',
        certBody: 'Zamboanga City Islamic Council & NCMF',
        certNumber: 'MOSQ-ZAM-2026-01',
        amenities: defaultCategory === 'worship' ? ['wudu_area', 'female_section'] : ['muslim_owned', 'alcohol_free'],
      });
    }
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
    { code: 'wudu_area', label: '💧 Running Water Wudu Stations', icon: Droplets },
    { code: 'female_section', label: '👥 Separate Female Mezzanine/Hall', icon: Users },
    { code: 'air_conditioned', label: '❄️ Air-Cooled Main Hall', icon: Snowflake },
    { code: 'halal_kitchen', label: '🛡️ 100% Halal Certified Kitchen', icon: ShieldCheck },
    { code: 'alcohol_free', label: '🚫 Strictly Alcohol-Free', icon: Ban },
    { code: 'parking', label: '🚗 Visitor & Bus Parking Lot', icon: Car },
    { code: 'wheelchair', label: '♿ Wheelchair Accessible Ramps', icon: Accessibility },
  ];

  // Dynamic header title based on context
  const getModalTitle = () => {
    if (initialData) return `Edit: ${initialData.name}`;
    if (formData.category === 'worship') return 'Register New Mosque / Masjid';
    if (formData.category === 'dining') return 'Register Halal Food Establishment';
    if (formData.category === 'market') return 'Register Halal Barter Trade Market';
    return 'Register Cultural Heritage Landmark';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200/80 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4.5 bg-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-950/50 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold tracking-tight text-white">{getModalTitle()}</h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Zamboanga City Tourism & Islamic Affairs Registry
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs font-medium">
          {/* Section 1: Basic Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                1. Establishment Details
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Establishment / Mosque Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sadik Grand Mosque (Mercedes)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none cursor-pointer"
                >
                  <option value="worship">🕌 Mosques & Masjids</option>
                  <option value="dining">🍽️ Halal Dining & Food</option>
                  <option value="market">🛍️ Barter Trade Markets</option>
                  <option value="cultural">🏛️ Cultural Heritage & Museums</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Halal Verification Tier */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                2. Halal Verification Tier
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'tier1', label: 'Tier 1: Certified / Mosque', desc: 'NCMF / Islamic Council', color: 'border-emerald-500 bg-emerald-50/80 text-emerald-950 ring-2 ring-emerald-500/30' },
                { id: 'tier2', label: 'Tier 2: Muslim-Owned', desc: '100% Muslim Kitchen', color: 'border-blue-500 bg-blue-50/80 text-blue-950 ring-2 ring-blue-500/30' },
                { id: 'tier3', label: 'Tier 3: Halal Options', desc: 'Certified Halal Ingredients', color: 'border-amber-500 bg-amber-50/80 text-amber-950 ring-2 ring-amber-500/30' },
                { id: 'tier4', label: 'Tier 4: Vegan / Seafood', desc: 'No Meat Products', color: 'border-purple-500 bg-purple-50/80 text-purple-950 ring-2 ring-purple-500/30' },
              ].map((tier) => (
                <button
                  type="button"
                  key={tier.id}
                  onClick={() => setFormData({ ...formData, tier: tier.id })}
                  className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    formData.tier === tier.id
                      ? `${tier.color} font-bold shadow-xs`
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-[11px] font-extrabold leading-tight">{tier.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{tier.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Interactive GIS Coordinate Picker */}
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                3. GIS Coordinates (Click to drop pin in Zamboanga)
              </span>
              <span className="text-[11px] text-slate-600 font-mono font-bold bg-slate-100 px-2 py-0.5 rounded-md">
                {formData.latitude?.toFixed(4)}, {formData.longitude?.toFixed(4)}
              </span>
            </div>

            <InteractiveMapPicker
              latitude={formData.latitude}
              longitude={formData.longitude}
              onCoordinatesChange={(lat, lng) => setFormData({ ...formData, latitude: lat, longitude: lng })}
              height="200px"
            />
          </div>

          {/* Section 4: Address, Contact & Hours */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                4. Location & Contact
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Barangay / Street Address *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. MCLL Highway, Barangay Mercedes, Zamboanga City"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+63 62 991 9900"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Cuisine / Special Highlight</label>
                <input
                  type="text"
                  value={formData.cuisine}
                  onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                  placeholder="e.g. Tiula Itum, Satti, or Largest Grand Mosque"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Operating Hours</label>
                <input
                  type="text"
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  placeholder="e.g. Open 24 Hours (All 5 Prayers)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Facilities & Amenities */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                5. Verified Amenities & Facilities
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {amenityOptions.map((a) => {
                const isChecked = formData.amenities.includes(a.code);
                return (
                  <button
                    key={a.code}
                    type="button"
                    onClick={() => toggleAmenity(a.code)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-50/80 border-emerald-500 text-emerald-950 font-bold'
                        : 'border-slate-200 text-slate-600 bg-slate-50/60 hover:bg-slate-100/60'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                        isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isChecked && <CheckCircle className="w-3 h-3" />}
                    </div>
                    <span className="text-xs truncate">{a.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 6: Description */}
          <div className="space-y-1.5">
            <label className="block text-slate-700 font-bold">Detailed Overview & History</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide background, architecture, prayer space capacities, or culinary heritage..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none leading-relaxed"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-900/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{initialData ? 'Save Changes' : 'Publish to Zamboanga Registry'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
