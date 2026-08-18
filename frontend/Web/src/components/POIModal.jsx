import React, { useState, useEffect } from 'react';
import { X, MapPin, CheckCircle, ShieldAlert, Sparkles, Building, Utensils, ShoppingBag, Landmark } from 'lucide-react';
import InteractiveMapPicker from './InteractiveMapPicker';

export default function POIModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'worship',
    tier: 'tier1',
    address: '',
    latitude: 6.9580,
    longitude: 122.1400,
    phone: '',
    cuisine: '',
    price_range: '$',
    operating_hours: 'Open Daily',
    image_url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
    description: '',
    certBody: 'Zamboanga City Islamic Council & NCMF',
    certNumber: 'MOSQ-ZAM-2026-01',
    amenities: ['wudu_area', 'female_section'],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        amenities: initialData.amenities?.map((a) => (typeof a === 'string' ? a : a.id || a.code)) || ['wudu_area'],
      });
    } else {
      setFormData({
        name: '',
        category: 'worship',
        tier: 'tier1',
        address: '',
        latitude: 6.9580,
        longitude: 122.1400,
        phone: '',
        cuisine: '',
        price_range: '$',
        operating_hours: 'Open Daily',
        image_url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
        description: '',
        certBody: 'Zamboanga City Islamic Council & NCMF',
        certNumber: 'MOSQ-ZAM-2026-01',
        amenities: ['wudu_area', 'female_section'],
      });
    }
  }, [initialData, isOpen]);

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
    { code: 'wudu_area', label: 'Wudu Ablution Facility' },
    { code: 'female_section', label: 'Separate Female Prayer Section/Mezzanine' },
    { code: 'air_conditioned', label: 'Air-Conditioned / Air-Cooled' },
    { code: 'halal_kitchen', label: '100% Halal Kitchen' },
    { code: 'alcohol_free', label: 'Strictly No Alcohol' },
    { code: 'parking', label: 'Visitor Parking' },
    { code: 'wheelchair', label: 'Wheelchair Accessible' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold">{initialData ? 'Edit Landmark / Place' : 'Add New Place in Zamboanga City'}</h3>
              <p className="text-xs text-slate-400">Halal Verification & GIS Coordinate Mapping</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs font-medium">
          {/* Name & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Place / Mosque Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Sadik Grand Mosque (Mercedes)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              >
                <option value="worship">Mosques & Places of Worship</option>
                <option value="dining">Halal Dining & Food</option>
                <option value="market">Halal Trade & Barter Market</option>
                <option value="cultural">Cultural Heritage & Museum</option>
              </select>
            </div>
          </div>

          {/* Halal Verification Tier */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Halal Verification Tier *</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'tier1', label: 'Tier 1: Certified / Mosque', color: 'border-emerald-500 bg-emerald-50 text-emerald-900' },
                { id: 'tier2', label: 'Tier 2: Muslim-Owned', color: 'border-blue-500 bg-blue-50 text-blue-900' },
                { id: 'tier3', label: 'Tier 3: Halal Options', color: 'border-amber-500 bg-amber-50 text-amber-900' },
                { id: 'tier4', label: 'Tier 4: Vegan / Seafood', color: 'border-purple-500 bg-purple-50 text-purple-900' },
              ].map((tier) => (
                <button
                  type="button"
                  key={tier.id}
                  onClick={() => setFormData({ ...formData, tier: tier.id })}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    formData.tier === tier.id ? `${tier.color} font-bold ring-2 ring-emerald-500/30` : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-[11px] leading-tight">{tier.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Map Pinpoint Picker */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-slate-700 font-bold">Interactive Map Pinpoint (Zamboanga City) *</label>
              <span className="text-[11px] text-slate-500 font-mono">
                Lat: {formData.latitude}, Lng: {formData.longitude}
              </span>
            </div>
            <InteractiveMapPicker
              latitude={formData.latitude}
              longitude={formData.longitude}
              onCoordinatesChange={(lat, lng) => setFormData({ ...formData, latitude: lat, longitude: lng })}
              height="220px"
            />
          </div>

          {/* Address & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Full Address in Zamboanga City *</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="e.g. MCLL Highway, Barangay Mercedes, Zamboanga City"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Contact Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+63 62 991 9900"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Cuisine / Landmark description & Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Cuisine / Subtitle</label>
              <input
                type="text"
                value={formData.cuisine}
                onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                placeholder="e.g. Largest Grand Mosque in Zamboanga City"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Image URL</label>
              <input
                type="text"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Amenities Checkbox Group */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Prayer & Mosque Amenities Available</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {amenityOptions.map((a) => {
                const isChecked = formData.amenities.includes(a.code);
                return (
                  <button
                    key={a.code}
                    type="button"
                    onClick={() => toggleAmenity(a.code)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${
                      isChecked ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold' : 'border-slate-200 text-slate-600 bg-slate-50'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'}`}>
                      {isChecked && <CheckCircle className="w-3 h-3" />}
                    </div>
                    <span className="text-[11px] truncate">{a.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Detailed Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide background, history, and facilities..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
            />
          </div>

          {/* Footer Save Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-900/20 transition-all"
            >
              {initialData ? 'Save Changes' : 'Publish to Zamboanga Directory'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
