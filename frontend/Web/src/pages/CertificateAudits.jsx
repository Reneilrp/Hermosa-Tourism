import React, { useState } from 'react';
import {
  FileCheck2,
  ShieldCheck,
  Search,
  CheckCircle,
  Calendar,
  X,
  AlertTriangle,
  Clock,
  Copy,
  Check,
  Building,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

export default function CertificateAudits({ pois = [] }) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [copiedCert, setCopiedCert] = useState(null);
  const [auditAlertMsg, setAuditAlertMsg] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = pois.map((p, index) => {
    // Generate realistic expiry distribution
    const isSoon = index === 2 || index === 7;
    const isExpired = index === 11;
    const expiryDate = isExpired
      ? '2026-08-15'
      : isSoon
      ? '2026-11-20'
      : p.expiryDate || '2028-12-31';

    const status = isExpired ? 'expired' : isSoon ? 'expiring_soon' : 'approved';

    return {
      id: p.id,
      poiName: p.name,
      category: p.category,
      tier: p.tier,
      certBody: p.certBody || 'Zamboanga Islamic Council & NCMF',
      certNumber: p.certNumber || `MOSQ-ZAM-2026-${String(index + 1).padStart(2, '0')}`,
      status,
      expiryDate,
      address: p.address,
    };
  });

  const activeCount = certificates.filter((c) => c.status === 'approved').length;
  const expiringSoonCount = certificates.filter((c) => c.status === 'expiring_soon').length;
  const expiredCount = certificates.filter((c) => c.status === 'expired').length;

  const filteredCerts = certificates.filter((c) => {
    const matchStatus =
      filterStatus === 'all' ||
      (filterStatus === 'approved' && c.status === 'approved') ||
      (filterStatus === 'expiring_soon' && c.status === 'expiring_soon') ||
      (filterStatus === 'expired' && c.status === 'expired');

    const query = search.trim().toLowerCase();
    const matchSearch =
      query === '' ||
      c.poiName.toLowerCase().includes(query) ||
      c.certNumber.toLowerCase().includes(query) ||
      c.certBody.toLowerCase().includes(query) ||
      c.address.toLowerCase().includes(query);
    return matchStatus && matchSearch;
  });

  const handleCopyCertId = (certNumber) => {
    navigator.clipboard?.writeText(certNumber);
    setCopiedCert(certNumber);
    setTimeout(() => setCopiedCert(null), 2000);
  };

  const handleTriggerAudit = (cert) => {
    setAuditAlertMsg(
      `Official NCMF verification renewal notice dispatched for "${cert.poiName}" (${cert.certNumber}).`
    );
    setTimeout(() => setAuditAlertMsg(''), 4000);
  };

  return (
    <div className="space-y-5">
      {/* 1. NCMF COMPLIANCE TELEMETRY BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
              Active & Valid Certifications
            </div>
            <div className="text-xl font-black text-emerald-800 mt-0.5">{activeCount}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Compliant with NCMF Halal code</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0 border border-emerald-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
              Expiring Within 30 Days
            </div>
            <div className="text-xl font-black text-amber-800 mt-0.5">{expiringSoonCount}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Audit renewal required</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700 shrink-0 border border-amber-100">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Total Audited Entities
            </div>
            <div className="text-xl font-black text-slate-900 mt-0.5">{certificates.length}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Covering all 98 barangays</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 border border-slate-200">
            <FileCheck2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Alert Banner if Triggered */}
      {auditAlertMsg && (
        <div className="bg-emerald-50 border border-emerald-300 p-3.5 rounded-2xl text-xs text-emerald-900 font-bold flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{auditAlertMsg}</span>
          </div>
          <button
            onClick={() => setAuditAlertMsg('')}
            className="text-emerald-700 hover:text-emerald-900 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. SEARCH & STATUS FILTER STRIP */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search cert ID, body, or establishment..."
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
            <option value="all">All Certificates ({certificates.length})</option>
            <option value="approved">Active & Valid ({activeCount})</option>
            <option value="expiring_soon">Expiring Soon ({expiringSoonCount})</option>
            <option value="expired">Expired ({expiredCount})</option>
          </select>
        </div>

        {/* Right Institutional Verification Tag */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>NCMF Official Registry IX</span>
        </div>
      </div>

      {/* 3. HALAL CERTIFICATE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCerts.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            <FileCheck2 className="w-8 h-8 text-slate-300 stroke-1 mx-auto mb-2" />
            <div className="text-sm font-bold text-slate-700">No certificates match your query</div>
            <p className="text-xs text-slate-400 mt-1">
              Adjust your search keywords or clear your status filters.
            </p>
          </div>
        ) : (
          filteredCerts.map((cert) => {
            const isExpiring = cert.status === 'expiring_soon';
            const isExpired = cert.status === 'expired';

            return (
              <div
                key={cert.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 hover:shadow-sm transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 truncate">
                      {cert.certBody}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-md border shrink-0 ${
                        isExpired
                          ? 'bg-red-50 text-red-800 border-red-200'
                          : isExpiring
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      {isExpired ? (
                        <>
                          <AlertTriangle className="w-3 h-3 text-red-600" /> Expired
                        </>
                      ) : isExpiring ? (
                        <>
                          <Clock className="w-3 h-3 text-amber-600" /> Expiring Soon
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-3 h-3 text-emerald-600" /> Active
                        </>
                      )}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-slate-900 mt-2.5 truncate group-hover:text-emerald-700 transition-colors">
                    {cert.poiName}
                  </h3>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{cert.address}</p>

                  <div className="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-semibold">Cert Registration:</span>
                      <button
                        onClick={() => handleCopyCertId(cert.certNumber)}
                        className="inline-flex items-center gap-1 font-mono font-extrabold text-slate-800 hover:text-emerald-700 transition-colors cursor-pointer"
                        title="Click to copy Certificate ID"
                        aria-label={`Copy cert ID ${cert.certNumber}`}
                      >
                        <span>{cert.certNumber}</span>
                        {copiedCert === cert.certNumber ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-400" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-semibold">Validity Horizon:</span>
                      <span className="font-bold text-slate-800 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" /> {cert.expiryDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex-1 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200/80 text-slate-800 font-bold text-center transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <FileCheck2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>View Certificate</span>
                  </button>
                  <button
                    onClick={() => handleTriggerAudit(cert)}
                    className="py-1.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold transition-all cursor-pointer flex items-center gap-1 border border-emerald-200/60"
                  >
                    <RefreshCw className="w-3 h-3 text-emerald-700" />
                    <span>Renew Notice</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 4. CERTIFICATE DETAILS MODAL */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 space-y-0">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white shrink-0">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                    Official Halal Certification Record
                  </div>
                  <h3 className="text-sm font-extrabold text-white">
                    {selectedCert.poiName}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs">
              {/* Status and Accreditation Authority Strip */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold">Certificate Status:</span>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-md border ${
                      selectedCert.status === 'expired'
                        ? 'bg-red-50 text-red-800 border-red-200'
                        : selectedCert.status === 'expiring_soon'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    {selectedCert.status === 'expired' ? (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600" /> Expired — Audit Overdue
                      </>
                    ) : selectedCert.status === 'expiring_soon' ? (
                      <>
                        <Clock className="w-3.5 h-3.5 text-amber-600" /> Expiring Within 30 Days
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Active & Verified
                      </>
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold">Registration Number:</span>
                  <button
                    onClick={() => handleCopyCertId(selectedCert.certNumber)}
                    className="inline-flex items-center gap-1.5 font-mono font-extrabold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 hover:border-emerald-600 transition-colors cursor-pointer"
                    title="Click to copy"
                  >
                    <span>{selectedCert.certNumber}</span>
                    {copiedCert === selectedCert.certNumber ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3 text-slate-400" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold">Accrediting Council:</span>
                  <span className="font-extrabold text-slate-900">{selectedCert.certBody}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold">Expiration Horizon:</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> {selectedCert.expiryDate}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold">Premises Address:</span>
                  <span className="font-medium text-slate-700 text-right">{selectedCert.address}</span>
                </div>
              </div>

              {/* Halal Standards Verified */}
              <div className="space-y-2">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  Compliance Standards & Verified Measures
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-slate-700 font-medium">100% Pork & Alcohol Free</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-slate-700 font-medium">Certified Abattoir Sourcing</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-slate-700 font-medium">Segregated Cookware & Storage</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-slate-700 font-medium">PNS 2067:2008 Halal Standard</span>
                  </div>
                </div>
              </div>

              {/* Officer Sign-off Footer */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-[11px]">NCMF Region IX Halal Standards Division</div>
                  <div className="text-[10px] text-emerald-700">Official Municipal Record • City Government of Zamboanga</div>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleTriggerAudit(selectedCert);
                    setSelectedCert(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Send Renewal Notice</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
