// src/components/AdminDashboard/PartnershipsAlliances.jsx
import React from "react";
import {
  FiLink,
  FiGlobe,
  FiBriefcase,
  FiTrendingUp,
  FiActivity,
  FiUserPlus,
} from "react-icons/fi";

const PartnershipsAlliances = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 bg-gray-900 text-gray-100">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-yellow-500">
            Partnerships & Alliances
          </h2>
          <p className="text-gray-400">
            Global University MOUs & Corporate Tie-ups
          </p>
        </div>
        <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-400 transition-all flex items-center gap-2">
          <FiUserPlus /> Add New Partner
        </button>
      </header>

      {/* Alliance Metrics [cite: 117-120] */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "University MOUs",
            value: "428",
            icon: <FiGlobe />,
            sub: "Active worldwide",
          },
          {
            label: "Corporate Tie-ups",
            value: "156",
            icon: <FiBriefcase />,
            sub: "Placement partners",
          },
          {
            label: "Int. Agents",
            value: "840",
            icon: <FiLink />,
            sub: "Verified recruiters",
          },
          {
            label: "Revenue Share",
            value: "$2.4M",
            icon: <FiTrendingUp />,
            sub: "Accrued MTD",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-lg hover:border-yellow-500 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-yellow-500 text-xl group-hover:scale-110 transition-transform">
                {stat.icon}
              </span>
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-tight">
                {stat.label}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-100">{stat.value}</p>
            <p className="text-[10px] text-gray-500 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Tracking [cite: 121-123] */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
          <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
            <h4 className="font-bold text-gray-100 flex items-center gap-2">
              <FiActivity className="text-yellow-500" /> Partner Lead
              Contribution
            </h4>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-gray-500 text-[10px] font-bold uppercase">
                <tr>
                  <th className="pb-3 px-2">Partner Name</th>
                  <th className="pb-3 px-2">Type</th>
                  <th className="pb-3 px-2">Leads (MTD)</th>
                  <th className="pb-3 px-2">Revenue Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {[
                  {
                    name: "Global Edu Services",
                    type: "Int. Agent",
                    leads: "1,240",
                    share: "$42k",
                  },
                  {
                    name: "TCS iON",
                    type: "Corporate",
                    leads: "850",
                    share: "$18k",
                  },
                  {
                    name: "Oxford University",
                    type: "MOU Partner",
                    leads: "120",
                    share: "$95k",
                  },
                  {
                    name: "Reliance Foundation",
                    type: "Grant Partner",
                    leads: "440",
                    share: "$12k",
                  },
                ].map((p, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-900/50 transition-colors"
                  >
                    <td className="py-3 px-2 font-medium text-gray-100">
                      {p.name}
                    </td>
                    <td className="py-3 px-2 text-gray-400">{p.type}</td>
                    <td className="py-3 px-2 font-bold text-yellow-500">
                      {p.leads}
                    </td>
                    <td className="py-3 px-2 text-gray-300 font-medium">
                      {p.share}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Agent Coverage */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h3 className="font-bold text-gray-100 mb-6">
            Regional Alliance Spread
          </h3>
          <div className="space-y-5">
            {[
              { region: "South Asia", val: "45%", color: "bg-yellow-500" },
              { region: "Middle East", val: "22%", color: "bg-yellow-600" },
              { region: "North America", val: "18%", color: "bg-gray-600" },
              { region: "Europe", val: "15%", color: "bg-gray-700" },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300">{item.region}</span>
                  <span className="text-yellow-500 font-bold">{item.val}</span>
                </div>
                <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`${item.color} h-full`}
                    style={{ width: item.val }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnershipsAlliances;
