import React from 'react';
import { FileSpreadsheet, Download, Printer, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export default function RegistryExport({ pois, onExportJSON, onPrint }) {
  return (
    <div className="space-y-4">
      {/* Printable Official Registry Card */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-6 flex items-start justify-between">
          <div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Republic of the Philippines</div>
            <h1 className="text-xl font-extrabold text-slate-950 mt-1">
              City Government of Zamboanga — City Tourism Office
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Official Halal Tourism, Mosque & Culinary Heritage Directory (2026 Edition)
            </p>
          </div>
          <div className="text-right text-xs">
            <div className="font-bold text-slate-800">Generated Date</div>
            <div className="text-slate-500">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
            <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" /> NCMF Compliant
            </div>
          </div>
        </div>

        {/* Summary Metric Stats for Tourism Office */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div>
            <div className="text-[11px] font-semibold text-slate-500">Total Registered</div>
            <div className="text-base font-extrabold text-slate-900">{pois.length} Venues</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-500">Mosques & Masjids</div>
            <div className="text-base font-extrabold text-emerald-700">{pois.filter(p => p.category === 'worship').length} Masjids</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-500">Tier 1 Halal Certified</div>
            <div className="text-base font-extrabold text-amber-700">{pois.filter(p => p.tier === 'tier1').length} Places</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-500">Muslim-Owned Dining</div>
            <div className="text-base font-extrabold text-blue-700">{pois.filter(p => p.category === 'dining').length} Eateries</div>
          </div>
        </div>

        {/* Directory Table Preview */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700 font-extrabold text-[11px]">
              <tr>
                <th className="p-3 border-b border-slate-200">#</th>
                <th className="p-3 border-b border-slate-200">Establishment / Mosque</th>
                <th className="p-3 border-b border-slate-200">Category</th>
                <th className="p-3 border-b border-slate-200">Halal Verification Tier</th>
                <th className="p-3 border-b border-slate-200">Address in Zamboanga</th>
                <th className="p-3 border-b border-slate-200">GPS Coordinates</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {pois.map((poi, idx) => (
                <tr key={poi.id}>
                  <td className="p-3 font-bold text-slate-400">{idx + 1}</td>
                  <td className="p-3 font-extrabold text-slate-900">{poi.name}</td>
                  <td className="p-3 capitalize">{poi.category}</td>
                  <td className="p-3 font-bold text-emerald-800">
                    {poi.tier === 'tier1' ? 'Tier 1: Certified / Mosque' : poi.tier === 'tier2' ? 'Tier 2: Muslim-Owned' : 'Tier 3: Halal Options'}
                  </td>
                  <td className="p-3 text-slate-600">{poi.address}</td>
                  <td className="p-3 font-mono text-slate-500">{poi.latitude?.toFixed(4)}, {poi.longitude?.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
