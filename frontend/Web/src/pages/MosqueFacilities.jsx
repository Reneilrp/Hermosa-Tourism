import React from 'react';
import { Moon, CheckCircle2, XCircle, Droplets, Users, Snowflake, Sparkles, Building } from 'lucide-react';

export default function MosqueFacilities({ pois }) {
  const mosques = pois.filter((p) => p.category === 'worship');

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <Moon className="w-5 h-5 text-emerald-600" />
          Mosque & Prayer Facilities Audit Checklist
        </h2>
        <p className="text-xs text-slate-500">
          Verify ablution (wudu) stations, dedicated female mezzanines, and climate control across Zamboanga City masjids
        </p>
      </div>

      {/* Mosque Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mosques.map((mosque) => (
          <div key={mosque.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-3">
                <img src={mosque.image} alt={mosque.name} className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0" />
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">{mosque.name}</h3>
                  <p className="text-xs text-slate-500">{mosque.address}</p>
                </div>
              </div>

              {/* Amenity Checklist */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span>Running Wudu Stations</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Separate Female Hall</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700">
                  <Snowflake className="w-4 h-4 text-teal-500" />
                  <span>Air-Cooled Main Hall</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>All 5 Daily Prayers</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                Verified by Islamic Council
              </span>
              <button
                onClick={() => alert(`Auditing facilities for ${mosque.name}`)}
                className="font-bold text-slate-700 hover:text-emerald-700 transition-colors"
              >
                Update Amenities &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
