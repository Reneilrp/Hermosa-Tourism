import React, { useState } from 'react';
import {
  FileCheck2,
  ShieldCheck,
  Search,
  CheckCircle,
  Calendar,
  X,
} from 'lucide-react';

export default function CertificateAudits({ pois }) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');

  const certificates = pois.map((p) => ({
    id: p.id,
    poiName: p.name,
    category: p.category,
    tier: p.tier,
    certBody: p.certBody || 'Zamboanga Islamic Council & NCMF',
    certNumber: p.certNumber || 'MOSQ-ZAM-2026',
    status: p.status || 'approved',
    expiryDate: p.expiryDate || '2028-12-31',
    address: p.address,
  }));

  const filteredCerts = certificates.filter((c) => {
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    const query = search.trim().toLowerCase();
    const matchSearch =
      query === '' ||
      c.poiName.toLowerCase().includes(query) ||
      c.certNumber.toLowerCase().includes(query) ||
      c.certBody.toLowerCase().includes(query) ||
      c.address.toLowerCase().includes(query);
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-4">
      {/* Single-Row Filter Strip with Search on the LEFT */}
      <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        {/* Left Side: Search (First on Left) + Status Filter */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          {/* 🔍 Search Input on the LEFT */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search cert ID, body, or venue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-7 py-2 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
            />
            {search.length > 0 && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Dropdown */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none cursor-pointer shrink-0 transition-colors"
          >
            <option value="all">📜 All Certs ({certificates.length})</option>
            <option value="approved">✅ Approved & Active</option>
            <option value="pending">⏳ Under Review</option>
          </select>
        </div>

        {/* Right Compliance Tag */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>NCMF & Council Verified</span>
        </div>
      </div>

      {/* Verification Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCerts.map((cert) => (
          <div
            key={cert.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-all"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {cert.certBody}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <CheckCircle className="w-3.5 h-3.5" /> Active
                </span>
              </div>

              <h3 className="text-sm font-extrabold text-slate-900 mt-2.5">{cert.poiName}</h3>
              <p className="text-xs text-slate-500 truncate mt-0.5">{cert.address}</p>

              <div className="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-semibold">Cert ID:</span>
                  <span className="font-mono font-bold text-slate-800">{cert.certNumber}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-semibold">Valid Until:</span>
                  <span className="font-semibold text-slate-700 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" /> {cert.expiryDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
              <button
                onClick={() => alert(`Certificate ${cert.certNumber} verified by Zamboanga Islamic Council.`)}
                className="flex-1 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100 transition-all text-center cursor-pointer"
              >
                Inspect Doc
              </button>
              <button
                onClick={() => alert(`Renewal notice sent for ${cert.poiName}`)}
                className="py-1.5 px-3 rounded-lg bg-slate-50 text-slate-600 font-semibold hover:bg-slate-100 transition-all cursor-pointer"
              >
                Audit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
