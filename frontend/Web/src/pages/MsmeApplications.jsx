import React, { useState } from 'react';
import {
  Store,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Search,
  X,
  Phone,
  MapPin,
  FileText,
  AlertCircle,
  ExternalLink,
  Check,
  ChevronRight,
  Sparkles,
  Utensils,
  Moon,
  Ban,
  Building,
  Calendar,
  UserCheck,
} from 'lucide-react';

export default function MsmeApplications({
  applications = [],
  onUpdateStatus,
  onOpenPublicForm,
}) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [auditModalApp, setAuditModalApp] = useState(null);
  const [auditNotes, setAuditNotes] = useState('');

  const sampleApps = applications.length > 0 ? applications : [
    {
      id: 1,
      application_number: 'MSME-2026-001',
      business_name: 'Al-Mubarak Satti & Tausug Native Grill',
      owner_name: 'Ustadz Ibrahim Sali',
      contact_phone: '+63 917 112 3344',
      email: 'almubarak.satti@gmail.com',
      region: 'BARMM',
      province: 'Basilan',
      city_municipality: 'Isabela City',
      address: 'Barangay Sunrise, Isabela City, Basilan',
      target_tier: 'tier2',
      cuisine_specialty: 'Tausug Satti & Charcoal Grilled Chicken Skewers',
      meat_supplier_name: 'Basilan Islamic Abattoir & Halal Meat Cooperative',
      strictly_no_pork_alcohol: true,
      has_prayer_corner: true,
      kitchen_practices_description:
        '100% Muslim-owned and operated kitchen. All chicken and beef sourced exclusively from accredited Halal meat suppliers with daily slaughter certificates. Cookware and utensils strictly segregated from non-Halal ingredients. No alcohol permitted anywhere on premises.',
      status: 'pending',
      created_at: '2026-08-20T10:00:00Z',
    },
    {
      id: 2,
      application_number: 'MSME-2026-002',
      business_name: 'Simunul Island Buko & Fresh Seafood Rest Stop',
      owner_name: 'Hadja Fatima Abubakar',
      contact_phone: '+63 920 887 6655',
      email: 'fatima.simunul@yahoo.com',
      region: 'BARMM',
      province: 'Tawi-Tawi',
      city_municipality: 'Simunul',
      address: 'Near Sheik Makhdum Mosque, Tubig Indangan, Simunul, Tawi-Tawi',
      target_tier: 'tier2',
      cuisine_specialty: 'Fresh Catch Seafood, Grilled Tuna & Cassava Cakes',
      meat_supplier_name: 'Local Simunul Fishermen Association (Fresh Marine Catch)',
      strictly_no_pork_alcohol: true,
      has_prayer_corner: true,
      kitchen_practices_description:
        'Operates adjacent to the historic Sheik Makhdum Mosque. Serves freshly harvested sea produce and plant-based traditional cakes with zero animal fats or non-Halal seasonings.',
      status: 'approved',
      created_at: '2026-08-19T14:30:00Z',
    },
    {
      id: 3,
      application_number: 'MSME-2026-003',
      business_name: 'Dennis Coffee Garden Halal Pastry Hub',
      owner_name: 'Nur-Insiang Mohammad',
      contact_phone: '+63 62 992 5588',
      email: 'dennis.coffee@gmail.com',
      region: 'Region IX',
      province: 'Zamboanga City',
      city_municipality: 'Zamboanga City',
      address: 'San Jose Road, Baliwasan, Zamboanga City',
      target_tier: 'tier2',
      cuisine_specialty: 'Sulu Kahawa Sug Coffee, Juvana, and Native Tausug Bangbang',
      meat_supplier_name: 'Zamboanga Halal Poultry Growers Alliance',
      strictly_no_pork_alcohol: true,
      has_prayer_corner: true,
      kitchen_practices_description:
        'Traditional Moro coffee house serving authentic Kahawa Sug and artisanal delicacies prepared under strict Islamic dietary standards with segregated baking ware.',
      status: 'pending',
      created_at: '2026-10-22T08:15:00Z',
    },
  ];

  const pendingCount = sampleApps.filter((a) => a.status === 'pending').length;
  const approvedCount = sampleApps.filter((a) => a.status === 'approved').length;
  const rejectedCount = sampleApps.filter((a) => a.status === 'rejected').length;

  const filtered = sampleApps.filter((app) => {
    const matchStatus = filterStatus === 'all' || app.status === filterStatus;
    const q = search.trim().toLowerCase();
    const matchSearch =
      q === '' ||
      app.business_name.toLowerCase().includes(q) ||
      app.owner_name.toLowerCase().includes(q) ||
      app.province.toLowerCase().includes(q) ||
      app.application_number.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const handleOpenAuditModal = (app) => {
    setAuditModalApp(app);
    setAuditNotes('');
  };

  const handleAuditDecision = (status) => {
    if (auditModalApp && onUpdateStatus) {
      onUpdateStatus(auditModalApp.id, status);
    }
    setAuditModalApp(null);
  };

  return (
    <div className="space-y-5">
      {/* 1. INTAKE METRIC TELEMETRY STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Total Affidavits
            </div>
            <div className="text-xl font-black text-slate-900 mt-0.5">{sampleApps.length}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
            <Store className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600">
              Pending Audit
            </div>
            <div className="text-xl font-black text-amber-700 mt-0.5">{pendingCount}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
              Verified & Listed
            </div>
            <div className="text-xl font-black text-emerald-700 mt-0.5">{approvedCount}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Disqualified
            </div>
            <div className="text-xl font-black text-slate-700 mt-0.5">{rejectedCount}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
            <XCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2. SEARCH & ACTION TOOLBAR */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search vendor, owner, or application ID..."
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

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none cursor-pointer shrink-0 transition-colors"
          >
            <option value="all">All Statuses ({sampleApps.length})</option>
            <option value="pending">Pending Review ({pendingCount})</option>
            <option value="approved">Approved & Listed ({approvedCount})</option>
            <option value="rejected">Rejected ({rejectedCount})</option>
          </select>
        </div>

        {/* Action Button: Open Public Form */}
        <button
          onClick={onOpenPublicForm}
          className="bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
        >
          <Store className="w-4 h-4" />
          <span>+ Open Public Form</span>
        </button>
      </div>

      {/* 3. MSME APPLICATION CARDS GRID */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            <Store className="w-8 h-8 text-slate-300 stroke-1 mx-auto mb-2" />
            <div className="text-sm font-bold text-slate-700">No applications match your filter</div>
            <p className="text-xs text-slate-400 mt-1">
              Try switching your search query or status filter.
            </p>
          </div>
        ) : (
          filtered.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all space-y-4"
            >
              {/* Application Header Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-black text-slate-900 tracking-tight">
                      {app.business_name}
                    </h3>
                    <span className="font-mono text-[11px] font-extrabold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                      {app.application_number}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border ${
                        app.status === 'approved'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : app.status === 'rejected'
                          ? 'bg-red-50 text-red-800 border-red-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {app.status === 'approved' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      {app.status === 'rejected' && <XCircle className="w-3 h-3 text-red-600" />}
                      {app.status === 'pending' && <Clock className="w-3 h-3 text-amber-600" />}
                      <span>
                        {app.status === 'approved'
                          ? 'Certified & Listed'
                          : app.status === 'rejected'
                          ? 'Disqualified'
                          : 'Pending Audit'}
                      </span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>
                      {app.address} ({app.city_municipality}, {app.province})
                    </span>
                  </p>
                </div>

                <div className="text-xs text-slate-600 sm:text-right bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80 shrink-0">
                  <div className="font-bold text-slate-900">
                    Owner: <span className="font-extrabold">{app.owner_name}</span>
                  </div>
                  <div className="text-slate-500 text-[11px] font-mono mt-0.5">
                    📞 {app.contact_phone}
                  </div>
                </div>
              </div>

              {/* Halal Verification Declarations Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 space-y-1">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Target Halal Tier
                  </div>
                  <div className="font-extrabold text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{app.target_tier === 'tier2' ? 'Tier 2: Muslim-Owned' : 'Tier 3: Halal Options'}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{app.cuisine_specialty}</div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 space-y-1">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Accredited Meat Abattoir
                  </div>
                  <div className="font-bold text-slate-800 truncate">
                    {app.meat_supplier_name || 'Accredited Halal Source'}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>100% Pork & Alcohol Free</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 space-y-1">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Customer Prayer Facility
                  </div>
                  <div className="font-bold text-slate-800 flex items-center gap-1">
                    <Moon className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{app.has_prayer_corner ? 'On-Premises Musalla' : 'Nearby Masjid Used'}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">Continuous wudu water verified</div>
                </div>
              </div>

              {/* Sworn Kitchen Practice Statement */}
              <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                <span className="font-extrabold text-slate-900">Kitchen Practices Declaration: </span>
                <span className="italic">"{app.kitchen_practices_description}"</span>
              </div>

              {/* Action Strip */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
                <div className="text-[11px] text-slate-400 font-medium">
                  Intake Pipeline • Zamboanga City Islamic Affairs Division
                </div>

                <div className="flex items-center gap-2">
                  {app.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleOpenAuditModal(app)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-600" />
                        <span>Review Application</span>
                      </button>
                      <button
                        onClick={() => onUpdateStatus && onUpdateStatus(app.id, 'approved')}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve & Publish to Map</span>
                      </button>
                      <button
                        onClick={() => onUpdateStatus && onUpdateStatus(app.id, 'rejected')}
                        className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </>
                  )}
                  {app.status === 'approved' && (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Published to Verified Registry</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 4. AUDIT & VERIFICATION MODAL DRAWER */}
      {auditModalApp && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold">Halal Verification Audit Review</h3>
                  <p className="text-[11px] text-slate-400">
                    {auditModalApp.application_number} • {auditModalApp.business_name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAuditModalApp(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-medium">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold">Registered Entity:</span>
                  <span className="font-extrabold text-slate-900">{auditModalApp.business_name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold">Proprietor:</span>
                  <span className="font-bold text-slate-800">{auditModalApp.owner_name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold">Abattoir Source:</span>
                  <span className="font-bold text-emerald-700">{auditModalApp.meat_supplier_name}</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Inspection Officer Audit Notes & Justification
                </label>
                <textarea
                  rows={3}
                  value={auditNotes}
                  onChange={(e) => setAuditNotes(e.target.value)}
                  placeholder="Record verification of supplier invoices, kitchen utensil segregation, and sanitary permits..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setAuditModalApp(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleAuditDecision('rejected')}
                  className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs cursor-pointer"
                >
                  Disqualify
                </button>
                <button
                  type="button"
                  onClick={() => handleAuditDecision('approved')}
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-950/20 cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Certify & Publish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
