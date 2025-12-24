// src/components/AdminDashboard/ProgramIntelligence.jsx
import React from "react";
import {
  FiBook,
  FiTrendingUp,
  FiPieChart,
  FiTarget,
  FiActivity,
} from "react-icons/fi";

const ProgramIntelligence = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-700 bg-gray-900 text-gray-100 min-h-screen">
      {/* Header Section  */}
      <header className="flex justify-between items-end border-b border-gray-800 pb-6">
        <div>
          <h2 className="text-3xl font-black text-yellow-500 tracking-tight uppercase">
            Program & Seat Intelligence
          </h2>
          <p className="text-gray-400 font-medium">
            Course Control Center: Intake Capacity vs Demand Intelligence [cite:
            39, 42]
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
          <FiActivity className="text-yellow-500 animate-pulse" />
          Live Intake Tracking
        </div>
      </header>

      {/* Metric Cards [cite: 42, 43, 45, 47] */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl group hover:border-yellow-500/50 transition-all">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 group-hover:text-gray-400">
            Seat Fill Ratio [cite: 43]
          </p>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-black text-yellow-500">82%</p>
            <FiTarget className="text-gray-600 mb-1" />
          </div>
          <div className="w-full bg-gray-900 h-1.5 mt-3 rounded-full overflow-hidden border border-gray-700">
            <div className="bg-yellow-500 h-full w-[82%] shadow-[0_0_8px_rgba(234,179,8,0.4)]"></div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl group hover:border-yellow-500/50 transition-all">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 group-hover:text-gray-400">
            Intake Capacity [cite: 42]
          </p>
          <p className="text-3xl font-black text-gray-100">12.5k</p>
          <p className="text-[10px] text-gray-600 mt-2 uppercase font-bold tracking-tighter">
            Total Allocated Seats
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl group hover:border-yellow-500/50 transition-all">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 group-hover:text-gray-400">
            High-Demand Index [cite: 45]
          </p>
          <p className="text-3xl font-black text-green-500">High</p>
          <p className="text-[10px] text-gray-600 mt-2 uppercase font-bold tracking-tighter">
            Top: Computer Science
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl group hover:border-red-500/50 transition-all">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 group-hover:text-gray-400">
            Drop-off Analysis [cite: 47]
          </p>
          <p className="text-3xl font-black text-red-500">4.2%</p>
          <p className="text-[10px] text-gray-600 mt-2 uppercase font-bold tracking-tighter">
            Application Exit Rate
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Discipline Distribution Chart [cite: 41] */}
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-gray-100 uppercase text-sm tracking-tighter flex items-center gap-2">
              <FiPieChart className="text-yellow-500" /> Discipline Distribution
              (UG/PG) [cite: 41]
            </h3>
            <span className="text-[10px] font-bold text-gray-500 border border-gray-700 px-2 py-0.5 rounded">
              Global Data
            </span>
          </div>

          <div className="aspect-video bg-gray-900 rounded-xl flex flex-col items-center justify-center border border-gray-700 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-50"></div>
            <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4 z-10">
              Data Visualization Layer
            </p>
            <div className="flex gap-4 z-10">
              {["Eng", "Med", "Arts", "Mgmt"].map((label) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-8 bg-gray-800 border border-gray-700 rounded-t-lg transition-all group-hover:border-yellow-500/50`}
                    style={{
                      height: Math.floor(Math.random() * 60) + 40 + "px",
                    }}
                  ></div>
                  <span className="text-[9px] font-bold text-gray-600">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Programs by Level & Emerging Disciplines [cite: 40, 46] */}
        <div className="space-y-8">
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl">
            <h3 className="font-black text-gray-100 uppercase text-sm tracking-tighter mb-6 flex items-center gap-2">
              <FiTrendingUp className="text-yellow-500" /> Emerging Disciplines
            </h3>
            <div className="space-y-4">
              {[
                { name: "AI & Data Science", growth: "+32%" },
                { name: "Renewable Energy", growth: "+18%" },
                { name: "FinTech Law", growth: "+12%" },
                { name: "Global Logistics", growth: "+8%" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-900 rounded-xl border border-gray-700 hover:border-yellow-500/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full group-hover:animate-ping"></div>
                    <span className="text-sm font-bold text-gray-300 group-hover:text-gray-100">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs font-black text-yellow-500 bg-gray-800 px-3 py-1 rounded-lg border border-gray-700">
                    {item.growth} Demand
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl">
            <h3 className="font-black text-gray-100 uppercase text-sm tracking-tighter mb-4 flex items-center gap-2">
              <FiBook className="text-yellow-500" /> Programs by Level
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {["UG", "PG", "Diploma", "PhD"].map((level) => (
                <div
                  key={level}
                  className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-center hover:border-yellow-500/50 transition-all"
                >
                  <p className="text-[10px] font-black text-gray-500 mb-1">
                    {level}
                  </p>
                  <p className="text-lg font-black text-gray-100">
                    {Math.floor(Math.random() * 800) + 200}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramIntelligence;
