import React, { useState } from 'react';
import {
  Store,
  CheckCircle2,
  X,
  ShieldCheck,
  Building,
  Phone,
  Mail,
  MapPin,
  Utensils,
  Sparkles,
  Check,
  AlertCircle,
  Moon,
} from 'lucide-react';

export default function PublicMsmeModal({ isOpen, onClose, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    business_name: '',
    owner_name: '',
    contact_phone: '',
    email: '',
    region: 'BARMM',
    province: 'Basilan',
    city_municipality: 'Isabela City',
    address: '',
    target_tier: 'tier2',
    cuisine_specialty: '',
    meat_supplier_name: '',
    strictly_no_pork_alcohol: true,
    has_prayer_corner: true,
    kitchen_practices_description: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.business_name || !formData.owner_name || !formData.contact_phone) {
      setFormError('Please fill in all required fields marked with *');
      return;
    }
    setFormError('');
    setSubmitted(true);
    if (onSubmitSuccess) {
      onSubmitSuccess(formData);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-950/50 shrink-0">
              <Store className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold tracking-tight text-white">
                MSME Halal Self-Declaration Portal
              </h2>
              <p className="text-[11px] text-emerald-300 font-medium mt-0.5">
                Zamboanga Peninsula & Western BARMM Tourism Network
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-all"
            aria-label="close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              Application Submitted Successfully!
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
              Thank you for registering <span className="font-extrabold text-slate-900">{formData.business_name}</span>. Your Halal self-declaration has been forwarded to the City Tourism Office and Regional Islamic Affairs desk for fast-track verification.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl text-xs font-mono font-bold text-slate-800 border border-slate-200">
              Reference ID: MSME-2026-{Math.floor(1000 + Math.random() * 9000)}
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer shadow-xs transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs font-medium">
            {formError && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span className="font-bold">{formError}</span>
              </div>
            )}

            <div className="bg-amber-50/90 border border-amber-200 p-3.5 rounded-2xl text-xs text-amber-950 leading-relaxed flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold">Affordable Halal Inclusivity:</span> Formal Halal certification can be expensive. By completing this verified self-declaration, Muslim-owned micro-businesses in Region IX and BARMM can be listed for free on the VintaGo mobile app.
              </div>
            </div>

            {/* Business Info */}
            <div className="space-y-3">
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                1. Business Identity
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Business Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.business_name}
                    onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                    placeholder="e.g. Al-Mubarak Satti & Native Grill"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Proprietor Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.owner_name}
                    onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
                    placeholder="e.g. Ustadz Ibrahim Sali"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Contact Phone *</label>
                  <input
                    type="text"
                    required
                    value={formData.contact_phone}
                    onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                    placeholder="+63 917 112 3344"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="owner@domain.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                2. Location Details
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Province / Island *</label>
                  <select
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none cursor-pointer transition-all"
                  >
                    <option value="Zamboanga City">Zamboanga City</option>
                    <option value="Basilan">Basilan</option>
                    <option value="Sulu">Sulu</option>
                    <option value="Tawi-Tawi">Tawi-Tawi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Barangay & Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. Barangay Sunrise, Isabela City"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Halal Standards */}
            <div className="space-y-3">
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                3. Halal Sourcing & Kitchen Practices
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Accredited Meat / Poultry Supplier Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.meat_supplier_name}
                  onChange={(e) => setFormData({ ...formData, meat_supplier_name: e.target.value })}
                  placeholder="e.g. Basilan Islamic Abattoir / Local Fishermen Cooperative"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <label className="flex items-center gap-2.5 p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.strictly_no_pork_alcohol}
                    onChange={(e) =>
                      setFormData({ ...formData, strictly_no_pork_alcohol: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600 accent-emerald-700 cursor-pointer"
                  />
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">Zero Pork & Alcohol</div>
                    <div className="text-[10px] text-slate-500">Strictly no pork or alcohol on premises</div>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.has_prayer_corner}
                    onChange={(e) =>
                      setFormData({ ...formData, has_prayer_corner: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600 accent-emerald-700 cursor-pointer"
                  />
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">Prayer Space / Wudu</div>
                    <div className="text-[10px] text-slate-500">Clean musalla or nearby masjid</div>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Kitchen Statement / Affirmation *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.kitchen_practices_description}
                  onChange={(e) =>
                    setFormData({ ...formData, kitchen_practices_description: e.target.value })
                  }
                  placeholder="Describe cookware segregation, clean ingredient storage, and Halal preparation methods..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none leading-relaxed transition-all"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-950/20 cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Self-Declaration</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
