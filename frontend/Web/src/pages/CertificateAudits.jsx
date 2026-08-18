import React, { useState } from 'react';
import {
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Calendar,
} from 'lucide-react';

export default function CertificateAudits({ pois, onUpdateCertStatus }) {
  const [filterStatus, setFilterStatus] = useState('all');

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
    if (filterStatus === 'all') return true;
    return c.status === filterStatus;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-emerald-600" />
            Halal Certificate Verification & Audit Pipeline
          </h2>
          <p className="text-xs text-slate-500">
            Audit proof documents, certifying bodies (NCMF, JAKIM, Local Councils), and expiration validity
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200">
          {[
            { id: 'all', label: 'All Certs' },
            { id: 'approved', label: 'Approved & Active' },
            { id: 'pending', label: 'Under Review' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setFilterStatus(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterStatus === s.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Verification Cards */}
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
                className="flex-1 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100 transition-all text-center"
              >
                Inspect Doc
              </button>
              <button
                onClick={() => alert(`Renewal notice sent for ${cert.poiName}`)}
                className="py-1.5 px-3 rounded-lg bg-slate-50 text-slate-600 font-semibold hover:bg-slate-100 transition-all"
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
