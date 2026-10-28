import React, { useState } from 'react';
import {
  X,
  Building2,
  ShieldCheck,
  Sliders,
  Save,
  CheckCircle2,
  Bell,
  Globe,
  Compass,
  AlertTriangle,
} from 'lucide-react';

export default function SettingsModal({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
}) {
  const [activeTab, setActiveTab] = useState('agency'); // 'agency' | 'halal' | 'system'
  const [formData, setFormData] = useState({
    agencyName: settings?.agencyName || 'City Tourism & Islamic Affairs Office',
    lguUnit: settings?.lguUnit || 'City Government of Zamboanga',
    officerInCharge: settings?.officerInCharge || 'Engr. Nur-Hassan Ahmad',
    officerTitle: settings?.officerTitle || 'Chief Tourism Operations Officer',
    officialContactEmail: settings?.officialContactEmail || 'tourism@zamboangacity.gov.ph',
    hotlineEmergency: settings?.hotlineEmergency || '+63 62 991 2656',
    defaultHalalTierFilter: settings?.defaultHalalTierFilter || 'all',
    certExpirationWarningDays: settings?.certExpirationWarningDays ?? 30,
    autoApproveVerifiedReviews: settings?.autoApproveVerifiedReviews ?? false,
    mandatoryWaterInspection: settings?.mandatoryWaterInspection ?? true,
    defaultCurrencyDisplay: settings?.defaultCurrencyDisplay || 'PHP',
    prayerCalculationMethod: settings?.prayerCalculationMethod || 'MWL',
    autoSyncIntervalMinutes: settings?.autoSyncIntervalMinutes ?? 5,
  });

  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 700);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Sliders className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>System & Agency Settings</span>
                <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Admin LGU
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Configure Zamboanga City Tourism operational parameters and verification policies
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close settings modal"
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="px-6 pt-3 pb-1 border-b border-slate-100 flex items-center gap-2 bg-white">
          <button
            type="button"
            onClick={() => setActiveTab('agency')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'agency'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Agency Profile</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('halal')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'halal'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Halal & Audit Policies</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('system')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'system'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>System & Localization</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* TAB 1: AGENCY PROFILE */}
          {activeTab === 'agency' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Agency / Department Name
                  </label>
                  <input
                    type="text"
                    value={formData.agencyName}
                    onChange={(e) => handleChange('agencyName', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    LGU / Municipal Authority
                  </label>
                  <input
                    type="text"
                    value={formData.lguUnit}
                    onChange={(e) => handleChange('lguUnit', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Chief Officer in Charge
                  </label>
                  <input
                    type="text"
                    value={formData.officerInCharge}
                    onChange={(e) => handleChange('officerInCharge', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Title / Designation
                  </label>
                  <input
                    type="text"
                    value={formData.officerTitle}
                    onChange={(e) => handleChange('officerTitle', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Contact Email
                  </label>
                  <input
                    type="email"
                    value={formData.officialContactEmail}
                    onChange={(e) => handleChange('officialContactEmail', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    24/7 Tourism Hotline
                  </label>
                  <input
                    type="text"
                    value={formData.hotlineEmergency}
                    onChange={(e) => handleChange('hotlineEmergency', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                <Compass className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950">
                  <div className="font-bold">Official Seal & Region IX Accreditation Active</div>
                  <div className="text-emerald-800 text-[11px] mt-0.5">
                    These credentials appear on all generated PDF registry reports, inspection notices, and MSME endorsement certificates.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HALAL & AUDIT POLICIES */}
          {activeTab === 'halal' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Certification Expiry Alert Warning (Days in Advance)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="7"
                    max="90"
                    value={formData.certExpirationWarningDays}
                    onChange={(e) => handleChange('certExpirationWarningDays', Number(e.target.value))}
                    className="w-32 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                  />
                  <span className="text-xs text-slate-500 font-medium">
                    Days before NCMF certificate expiration to flag establishment in audit queue
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Default Halal Tier Directory Filter
                </label>
                <select
                  value={formData.defaultHalalTierFilter}
                  onChange={(e) => handleChange('defaultHalalTierFilter', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                >
                  <option value="all">🌐 Show All Tiers (Tier 1, Tier 2, Tier 3)</option>
                  <option value="tier1">🟢 Tier 1 Only: Official NCMF Halal Certified</option>
                  <option value="tier2">🟡 Tier 2: 100% Muslim-Owned Kitchens</option>
                  <option value="tier3">⚪ Tier 3: Verified Pork-Free / Alcohol-Free</option>
                </select>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-3">
                <label className="flex items-start gap-3 p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.mandatoryWaterInspection}
                    onChange={(e) => handleChange('mandatoryWaterInspection', e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-800">
                      Mandatory Running Water Inspection for Masjids
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Enforce dedicated running wudu water and separate female prayer areas before approving a mosque listing.
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.autoApproveVerifiedReviews}
                    onChange={(e) => handleChange('autoApproveVerifiedReviews', e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-800">
                      Auto-Approve Verified Pilgrim Check-In Reviews
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Automatically publish reviews submitted by tourists whose GPS check-in matches the certified POI radius.
                    </div>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* TAB 3: SYSTEM & LOCALIZATION */}
          {activeTab === 'system' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Currency Display
                  </label>
                  <select
                    value={formData.defaultCurrencyDisplay}
                    onChange={(e) => handleChange('defaultCurrencyDisplay', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                  >
                    <option value="PHP">₱ Philippine Peso (PHP)</option>
                    <option value="MYR">RM Malaysian Ringgit (MYR)</option>
                    <option value="USD">$ US Dollar (USD)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Prayer Times Calculation Standard
                  </label>
                  <select
                    value={formData.prayerCalculationMethod}
                    onChange={(e) => handleChange('prayerCalculationMethod', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                  >
                    <option value="MWL">Muslim World League (MWL) - Standard</option>
                    <option value="JAKIM">JAKIM (Malaysia / BIMP-EAGA Regional)</option>
                    <option value="UmmAlQura">Umm al-Qura University (Makkah)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Background Auto-Sync Frequency
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={formData.autoSyncIntervalMinutes}
                    onChange={(e) => handleChange('autoSyncIntervalMinutes', Number(e.target.value))}
                    className="w-32 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                  />
                  <span className="text-xs text-slate-500 font-medium">
                    Minutes between background synchronization with regional satellite ports
                  </span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950">
                  <div className="font-bold">Offline Island Sync Cache Ready</div>
                  <div className="text-amber-800 text-[11px] mt-0.5">
                    All updates to tour packages, cultural sites, and Halal establishments are packaged into compact SQLite JSON bundles for offline access.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {savedNotice ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" /> Settings saved successfully!
              </span>
            ) : (
              <span className="text-[11px] text-slate-400">
                Changes persist locally to this administrative workstation.
              </span>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
