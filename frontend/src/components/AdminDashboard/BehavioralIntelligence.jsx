// src/components/AdminDashboard/BehavioralIntelligence.jsx
import React from "react";
import {
  FiSearch,
  FiMapPin,
  FiActivity,
  FiMousePointer,
  FiTarget,
  FiPieChart,
} from "react-icons/fi";

const BehavioralIntelligence = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 bg-gray-900 text-gray-100">
      <header>
        <h2 className="text-2xl font-bold text-yellow-500">
          Advanced Behavioral Intelligence
        </h2>
        <p className="text-gray-400">
          User Intent Signals & Behavioral Pattern Mapping
        </p>
      </header>

      {/* Real-time Intent Snapshot [cite: 156, 170, 204] */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <p className="text-gray-500 text-[10px] font-bold uppercase mb-2">
            Total Search Volume (MTD)
          </p>
          <h3 className="text-3xl font-bold text-gray-100">1.84M</h3>
          <p className="text-xs text-yellow-500 mt-2">Top: "MBA in Germany"</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <p className="text-gray-500 text-[10px] font-bold uppercase mb-2">
            Search-to-Click Ratio
          </p>
          <h3 className="text-3xl font-bold text-gray-100">64.2%</h3>
          <p className="text-xs text-green-400 mt-2">+4.8% Efficiency</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <p className="text-gray-500 text-[10px] font-bold uppercase mb-2">
            Avg Admission Probability
          </p>
          <h3 className="text-3xl font-bold text-gray-100">72/100</h3>
          <p className="text-xs text-gray-400 mt-2">AI Intent Scoring</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Search & Keyword Intelligence [cite: 157-159] */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
          <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
            <h4 className="font-bold text-gray-100 flex items-center gap-2">
              <FiSearch className="text-yellow-500" /> Keyword Intelligence
            </h4>
            <span className="text-[10px] text-gray-500 font-bold uppercase">
              Zero-Result Gap Analysis
            </span>
          </div>
          <div className="p-4">
            <table className="w-full text-left text-sm">
              <thead className="text-gray-500 text-[10px] font-bold uppercase">
                <tr>
                  <th className="pb-3 px-2">Top Keywords</th>
                  <th className="pb-3 px-2">Volume</th>
                  <th className="pb-3 px-2">Conv. Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {[
                  {
                    key: "Low fees engineering Karnataka",
                    vol: "124k",
                    conv: "14.2%",
                  },
                  { key: "Nursing colleges in UK", vol: "98k", conv: "11.8%" },
                  { key: "Data Science PhD Stipend", vol: "82k", conv: "9.4%" },
                  { key: "MBA without GMAT", vol: "64k", conv: "18.1%" },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-900/50 transition-colors"
                  >
                    <td className="py-3 px-2 text-gray-200">{row.key}</td>
                    <td className="py-3 px-2 text-gray-400">{row.vol}</td>
                    <td className="py-3 px-2 text-yellow-500 font-bold">
                      {row.conv}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Location & Geo-Behavior [cite: 174-178] */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
          <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
            <h4 className="font-bold text-gray-100 flex items-center gap-2">
              <FiMapPin className="text-yellow-500" /> Geo-Behavior Heatmap
            </h4>
          </div>
          <div className="p-6 space-y-5">
            {[
              {
                region: "Metro/Tier 1 (India)",
                val: "52%",
                color: "bg-yellow-500",
              },
              {
                region: "International (Global)",
                val: "28%",
                color: "bg-yellow-600",
              },
              { region: "Tier 2/3 (India)", val: "20%", color: "bg-gray-600" },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-medium">
                    {item.region}
                  </span>
                  <span className="text-yellow-500 font-bold">
                    {item.val} Demand
                  </span>
                </div>
                <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`${item.color} h-full`}
                    style={{ width: item.val }}
                  ></div>
                </div>
              </div>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-700">
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">
                Preferred vs Actual Location Gap
              </p>
              <div className="flex items-center gap-2 text-sm">
                <FiActivity className="text-yellow-500" />
                <span className="text-gray-300">
                  84% of Urban users prefer International study abroad.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BehavioralIntelligence;
