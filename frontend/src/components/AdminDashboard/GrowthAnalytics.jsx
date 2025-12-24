// src/components/AdminDashboard/GrowthAnalytics.jsx
import React from "react";
import {
  FiTrendingUp,
  FiTarget,
  FiSearch,
  FiGlobe,
  FiBarChart2,
  FiPieChart,
} from "react-icons/fi";

const GrowthAnalytics = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 bg-gray-900 text-gray-100">
      <header>
        <h2 className="text-2xl font-bold text-yellow-500">
          Marketing, Growth & Brand Analytics
        </h2>
        <p className="text-gray-400">Campaign ROI & Content Intelligence</p>
      </header>

      {/* Growth Engine Metrics [cite: 110-112] */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
              Campaign ROI
            </span>
            <FiTarget className="text-yellow-500 text-xl" />
          </div>
          <h3 className="text-3xl font-bold text-gray-100">4.2x</h3>
          <p className="text-xs text-green-400 mt-2 font-medium">
            +0.8x vs last month
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
              Lead Quality Index
            </span>
            <FiTrendingUp className="text-yellow-500 text-xl" />
          </div>
          <h3 className="text-3xl font-bold text-gray-100">82/100</h3>
          <p className="text-xs text-gray-500 mt-2 font-medium">
            Based on AI scoring
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
              Organic Growth
            </span>
            <FiSearch className="text-yellow-500 text-xl" />
          </div>
          <h3 className="text-3xl font-bold text-gray-100">+24%</h3>
          <p className="text-xs text-green-400 mt-2 font-medium">
            SEO & Content driven
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources [cite: 110] */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
          <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
            <h4 className="font-bold text-gray-100 flex items-center gap-2">
              <FiGlobe className="text-yellow-500" /> Primary Traffic Sources
            </h4>
          </div>
          <div className="p-6 space-y-5">
            {[
              {
                source: "Search Engine (Google/Bing)",
                val: "45%",
                color: "bg-yellow-500",
              },
              {
                source: "Social Media (Meta/LinkedIn)",
                val: "28%",
                color: "bg-yellow-600",
              },
              { source: "Direct Access", val: "15%", color: "bg-gray-500" },
              {
                source: "Referral/Partnerships",
                val: "12%",
                color: "bg-gray-700",
              },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300 font-medium">
                    {item.source}
                  </span>
                  <span className="text-yellow-500 font-bold">{item.val}</span>
                </div>
                <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
                  <div
                    className={`${item.color} h-full`}
                    style={{ width: item.val }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Content [cite: 115] */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
          <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
            <h4 className="font-bold text-gray-100 flex items-center gap-2">
              <FiBarChart2 className="text-yellow-500" /> Top Content
              Performance
            </h4>
          </div>
          <div className="p-4">
            <table className="w-full text-left">
              <thead className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="pb-3 px-2">Content Title</th>
                  <th className="pb-3 px-2">Leads</th>
                  <th className="pb-3 px-2">Conversion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 text-sm">
                {[
                  {
                    title: "Study in Germany Guide 2025",
                    leads: "1,240",
                    conv: "8.2%",
                  },
                  {
                    title: "Top Engineering Colleges in India",
                    leads: "980",
                    conv: "5.4%",
                  },
                  {
                    title: "Scholarship Application Tips",
                    leads: "850",
                    conv: "12.1%",
                  },
                  {
                    title: "MBA vs PGDM: The Truth",
                    leads: "620",
                    conv: "4.8%",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="py-3 px-2 font-medium text-gray-200">
                      {row.title}
                    </td>
                    <td className="py-3 px-2 text-gray-400">{row.leads}</td>
                    <td className="py-3 px-2 text-yellow-500 font-bold">
                      {row.conv}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthAnalytics;
