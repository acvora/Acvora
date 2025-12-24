// src/components/AdminDashboard/StudyAbroadHub.jsx
import React from "react";
import {
  FiGlobe,
  FiMap,
  FiShield,
  FiBriefcase,
  FiAlertCircle,
} from "react-icons/fi";

const StudyAbroadHub = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-2 duration-500">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">
          Study Abroad & Global Mobility Hub
        </h2>
        <p className="text-slate-500">
          International Partnerships & Visa Operations
        </p>
      </header>

      {/* Global Mobility Heatmap Placeholder [cite: 73-75] */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <h3 className="text-white font-bold flex items-center gap-2">
              <FiMap className="text-blue-400" /> Applications by Country [cite:
              74]
            </h3>
            <div className="flex justify-around items-end h-40 gap-4 mt-8">
              {[
                { country: "USA", val: "85%" },
                { country: "UK", val: "72%" },
                { country: "Canada", val: "94%" },
                { country: "Germany", val: "68%" },
                { country: "Australia", val: "54%" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div
                    className="w-full bg-blue-500 rounded-t opacity-80"
                    style={{ height: item.val }}
                  ></div>
                  <span className="text-[10px] text-slate-400 font-bold">
                    {item.country}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <FiGlobe className="absolute -right-20 -bottom-20 text-[300px] text-slate-700 opacity-20" />
        </div>

        {/* Partnership & Visa Metrics [cite: 76-80] */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FiBriefcase className="text-blue-600" /> Global Alliances [cite:
              76]
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-500 uppercase">
                    University Partners
                  </span>
                  <span className="text-slate-900">1,180</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-[75%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-500 uppercase">
                    Active Agents [cite: 77]
                  </span>
                  <span className="text-slate-900">420</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full w-[60%]"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6 mt-6 border-t border-slate-100">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">
                Offer-to-Visa Ratio [cite: 75]
              </span>
              <span className="font-bold text-blue-600">68.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visa & Compliance Tracking [cite: 78-81] */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h4 className="font-bold text-slate-800 flex items-center gap-2">
            <FiShield className="text-emerald-600" /> Visa Status Tracking
          </h4>
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Real-Time Sync [cite: 79]
          </span>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                label: "Approved",
                count: 842,
                color: "text-emerald-600 bg-emerald-50 border-emerald-100",
              },
              {
                label: "In Process",
                count: 312,
                color: "text-blue-600 bg-blue-50 border-blue-100",
              },
              {
                label: "Documentation Gap [cite: 81]",
                count: 48,
                color: "text-amber-600 bg-amber-50 border-amber-100",
              },
              {
                label: "Rejected [cite: 80]",
                count: 12,
                color: "text-red-600 bg-red-50 border-red-100",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg border flex flex-col items-center ${stat.color}`}
              >
                <span className="text-2xl font-bold">{stat.count}</span>
                <span className="text-xs font-bold uppercase tracking-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyAbroadHub;
