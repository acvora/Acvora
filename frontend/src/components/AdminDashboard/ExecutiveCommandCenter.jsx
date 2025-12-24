// src/components/AdminDashboard/ExecutiveCommandCenter.jsx
import React from "react";
import {
  FiGlobe,
  FiAlertCircle,
  FiTrendingUp,
  FiActivity,
} from "react-icons/fi";

const StatCard = ({ label, value, subValue, trend }) => (
  <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg hover:border-yellow-500/50 transition-all group">
    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1 group-hover:text-gray-400">
      {label}
    </p>
    <h3 className="text-3xl font-bold text-gray-100">{value}</h3>
    <div className="flex items-center gap-2 mt-2">
      <span
        className={`text-xs font-bold px-2 py-0.5 rounded ${
          trend === "up"
            ? "bg-green-900/30 text-green-400"
            : "bg-gray-900 text-gray-500"
        }`}
      >
        {subValue}
      </span>
    </div>
  </div>
);

const ExecutiveCommandCenter = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 bg-gray-900 min-h-screen text-gray-100">
      <header className="flex justify-between items-end border-b border-gray-800 pb-6">
        <div>
          <h2 className="text-3xl font-black text-yellow-500 tracking-tight">
            EXECUTIVE COMMAND CENTER
          </h2>
          <p className="text-gray-400 font-medium">Global Real-Time Snapshot</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
          <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
          Live Intelligence Feed
        </div>
      </header>

      {/* Primary Metrics [cite: 6, 9, 11, 13, 14] */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Institutes"
          value="4,280"
          subValue="India: 3,100 | Int: 1,180"
          trend="up"
        />
        <StatCard
          label="Registered Students"
          value="842.5k"
          subValue="DAU: 42k | MAU: 128k"
          trend="up"
        />
        <StatCard
          label="Active Counselling"
          value="12,402"
          subValue="Domestic: 65% | Abroad: 35%"
          trend="up"
        />
        <StatCard
          label="Total Revenue (YTD)"
          value="$12.4M"
          subValue="CVR: 4.8%"
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Alerts & Flags [cite: 15-20] */}
        <div className="lg:col-span-1 bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl">
          <div className="p-5 bg-gray-900/50 border-b border-gray-700 flex items-center justify-between">
            <h4 className="font-black text-yellow-500 text-sm uppercase tracking-tighter flex items-center gap-2">
              <FiAlertCircle /> Critical System Flags
            </h4>
            <span className="text-[10px] bg-red-900 text-red-200 px-2 py-0.5 rounded-full font-bold">
              Action Required
            </span>
          </div>
          <div className="divide-y divide-gray-700/50">
            {[
              {
                type: "Pending Verifications",
                count: 12,
                status: "High Priority",
              },
              { type: "Accreditation Expiry", count: 5, status: "Risk" },
              { type: "Compliance Issues", count: 8, status: "Legal" },
              { type: "Payment Failures", count: 24, status: "Financial" },
              {
                type: "SLA Breaches (Counsellors)",
                count: 3,
                status: "Critical",
              },
            ].map((alert, i) => (
              <div
                key={i}
                className="p-5 flex justify-between items-center hover:bg-gray-700/30 transition-all cursor-pointer group"
              >
                <div>
                  <span className="text-sm font-bold text-gray-200 block group-hover:text-yellow-500 transition-colors">
                    {alert.type}
                  </span>
                  <span className="text-[10px] uppercase font-black text-gray-500 tracking-widest">
                    {alert.status}
                  </span>
                </div>
                <span className="text-xl font-black text-gray-100 bg-gray-900 px-3 py-1 rounded-lg border border-gray-700 group-hover:border-yellow-500/50">
                  {alert.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Global Traffic & Behavioral Hub [cite: 178] */}
        <div className="lg:col-span-2 bg-gray-800 rounded-2xl border border-gray-700 p-8 flex flex-col justify-center items-center relative overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-50"></div>
          <div className="text-center relative z-10">
            <FiGlobe className="text-7xl mx-auto mb-6 text-yellow-500 group-hover:scale-110 transition-transform duration-500" />
            <h4 className="text-2xl font-black text-gray-100 mb-2 uppercase tracking-tighter">
              Global Engagement Intelligence
            </h4>
            <p className="text-gray-400 font-medium max-w-md mx-auto mb-6">
              Visualizing high-traffic nodes and regional demand heatmaps across
              12+ international markets.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["India", "USA", "UK", "Germany", "Canada"].map((country) => (
                <span
                  key={country}
                  className="px-4 py-1.5 bg-gray-900 border border-gray-700 rounded-full text-xs font-bold text-gray-300"
                >
                  {country}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveCommandCenter;
