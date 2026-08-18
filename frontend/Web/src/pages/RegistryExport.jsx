import React from 'react';
import { FileSpreadsheet, Download, Printer, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export default function RegistryExport({ pois }) {
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(pois, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'zamboanga_city_halal_registry_2026.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            Official Zamboanga City Halal Tourism Registry & Reports
          </h2>
          <p className="text-xs text-slate-500">
            Generate and export official Halal-verified listings for the City Tourism Office and National Commission on Muslim Filipinos (NCMF)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJSON}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON Registry</span>
          </button>
          <button
            onClick={handlePrint}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

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
