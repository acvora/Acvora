// src/components/AdminDashboard/StudentLifecycle.jsx
import React from "react";
import {
  FiTrendingUp,
  FiMapPin,
  FiActivity,
  FiUserCheck,
  FiTarget,
} from "react-icons/fi";

const StudentLifecycle = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-700 bg-gray-900 text-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="flex justify-between items-end border-b border-gray-800 pb-6">
        <div>
          <h2 className="text-3xl font-black text-yellow-500 tracking-tight uppercase">
            Student Lifecycle Intelligence
          </h2>
          <p className="text-gray-400 font-medium">
            360° View: Preferences, Behavior Tracking & Academic History
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
          <FiUserCheck className="text-yellow-500" />
          Unified Profile Monitoring [cite: 49]
        </div>
      </header>

      {/* Lifecycle Funnel Analytics [cite: 55-57, 59] */}
      <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-50"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-gray-100 uppercase text-sm tracking-tighter flex items-center gap-2">
              <FiTarget className="text-yellow-500" /> Conversion Funnel
              Analytics [cite: 59]
            </h3>
            <span className="text-[10px] font-bold text-gray-500 border border-gray-700 px-2 py-0.5 rounded uppercase">
              Lifecycle Stages [cite: 55]
            </span>
          </div>

          <div className="flex items-end gap-2 h-48">
            {[
              { label: "Visitor", value: "100%", color: "bg-gray-700" }, //
              { label: "Lead", value: "68%", color: "bg-yellow-900/40" }, //
              { label: "Applicant", value: "42%", color: "bg-yellow-700/60" }, //
              { label: "Admitted", value: "12%", color: "bg-yellow-500/80" }, //
              { label: "Alumni", value: "4%", color: "bg-yellow-500" }, //
            ].map((stage, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-3 group/bar"
              >
                <div
                  className={`w-full ${stage.color} rounded-t-xl transition-all duration-500 group-hover/bar:brightness-125 border-t border-yellow-500/20 shadow-lg`}
                  style={{ height: stage.value }}
                ></div>
                <div className="text-center">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block">
                    {stage.label}
                  </span>
                  <span className="text-xs font-black text-yellow-500">
                    {stage.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Retention & Churn Analytics [cite: 57, 58] */}
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl group hover:border-yellow-500/50 transition-all">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-gray-100 uppercase text-sm tracking-tighter flex items-center gap-2">
              <FiActivity className="text-yellow-500" /> Retention & Churn
              [cite: 58]
            </h3>
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center border border-gray-700">
              <FiTrendingUp className="text-green-500" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-gray-900 rounded-xl border border-gray-700 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
                  Active Retention Rate [cite: 58]
                </p>
                <p className="text-2xl font-black text-green-500">84.2%</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
                  Benchmark
                </p>
                <p className="text-xs font-bold text-gray-400">78.0% Global</p>
              </div>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-gray-700 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
                  Monthly Churn Index [cite: 58]
                </p>
                <p className="text-2xl font-black text-red-500">2.1%</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
                  Status
                </p>
                <p className="text-xs font-bold text-green-500">Stable</p>
              </div>
            </div>
          </div>
        </div>

        {/* Region-wise Aspirations  */}
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl group hover:border-yellow-500/50 transition-all">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-gray-100 uppercase text-sm tracking-tighter flex items-center gap-2">
              <FiMapPin className="text-yellow-500" /> Regional Demand Heat
            </h3>
            <span className="text-[10px] font-bold text-gray-500 uppercase">
              Geographic Growth{" "}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { region: "Tier 1 India", growth: "24%" }, //
              { region: "Intl. (EU)", growth: "20%" }, //
              { region: "Tier 2 India", growth: "16%" }, //
              { region: "Intl. (NA)", growth: "12%" }, //
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 bg-gray-900 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-colors"
              >
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
                  {item.region}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-black text-gray-100">
                    {item.growth}
                  </p>
                  <FiTrendingUp className="text-green-500 text-xs" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLifecycle;
