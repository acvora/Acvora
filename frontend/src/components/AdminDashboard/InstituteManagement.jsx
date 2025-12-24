// src/components/AdminDashboard/InstituteManagement.jsx
import React from "react";
import { FiPlus, FiSearch, FiFilter, FiMoreVertical } from "react-icons/fi";

const InstituteManagement = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-700 bg-gray-900 text-gray-100 min-h-screen">
      <div className="flex justify-between items-end border-b border-gray-800 pb-6">
        <header>
          <h2 className="text-3xl font-black text-yellow-500 tracking-tight">
            INSTITUTE ECOSYSTEM
          </h2>
          <p className="text-gray-400 font-medium">
            Master Panel: Universities, Colleges & International Partners [cite:
            22, 23]
          </p>
        </header>
        <button className="bg-yellow-500 text-gray-900 px-5 py-2.5 rounded-xl font-black text-sm shadow-lg shadow-yellow-500/20 hover:bg-yellow-400 transition-all flex items-center gap-2">
          <FiPlus className="text-lg" /> ADD NEW INSTITUTE
        </button>
      </div>

      {/* Advanced Controls & Summary [cite: 29-33] */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-xl group hover:border-yellow-500/50 transition-all">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 group-hover:text-gray-400">
            Institute Trust Score [cite: 31]
          </p>
          <p className="text-3xl font-black text-yellow-500">8.4/10</p>
          <p className="text-[10px] text-gray-600 mt-2 uppercase font-bold tracking-tighter text-right">
            Auto-Manual Verified
          </p>
        </div>
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-xl group hover:border-yellow-500/50 transition-all">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 group-hover:text-gray-400">
            Featured / Sponsored [cite: 32]
          </p>
          <p className="text-3xl font-black text-gray-100">142 Units</p>
          <p className="text-[10px] text-gray-600 mt-2 uppercase font-bold tracking-tighter text-right">
            Across All Verticals
          </p>
        </div>
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-xl group hover:border-red-500/50 transition-all">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 group-hover:text-gray-400">
            Blacklist / Compliance Hold [cite: 33]
          </p>
          <p className="text-3xl font-black text-red-500">18 Institutes</p>
          <p className="text-[10px] text-gray-600 mt-2 uppercase font-bold tracking-tighter text-right">
            Statutory Breaches
          </p>
        </div>
      </div>

      {/* Institute Database [cite: 24-28] */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
        <div className="p-5 bg-gray-900/50 border-b border-gray-700 flex justify-between items-center">
          <h4 className="font-black text-gray-100 text-sm uppercase tracking-tighter">
            Institute Registry
          </h4>
          <div className="flex gap-3">
            <button className="p-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-400 hover:text-yellow-500 transition-colors">
              <FiSearch />
            </button>
            <button className="p-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-400 hover:text-yellow-500 transition-colors">
              <FiFilter />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-900/80 text-gray-500 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="p-5">Institute Name [cite: 23]</th>
                <th className="p-5">Type [cite: 24]</th>
                <th className="p-5">Location [cite: 25]</th>
                <th className="p-5">Accreditations [cite: 26]</th>
                <th className="p-5">Validity [cite: 27]</th>
                <th className="p-5">Status [cite: 30]</th>
                <th className="p-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50 text-sm">
              {[
                {
                  name: "IIT Delhi",
                  type: "Govt",
                  loc: "New Delhi, India",
                  acc: "NAAC A++ / NIRF 2",
                  valid: "Jan 2028",
                  status: "Verified",
                },
                {
                  name: "Stanford University",
                  type: "International",
                  loc: "CA, USA",
                  acc: "WASC / Ivy League",
                  valid: "Dec 2030",
                  status: "Verified",
                },
                {
                  name: "Private Deemed Univ",
                  type: "Deemed",
                  loc: "Pune, India",
                  acc: "NAAC B",
                  valid: "Mar 2024",
                  status: "Flagged",
                },
                {
                  name: "Global Institute Hub",
                  type: "International",
                  loc: "Berlin, Germany",
                  acc: "EQUIS / AMBA",
                  valid: "Aug 2026",
                  status: "Verified",
                },
              ].map((inst, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-900/30 transition-all group"
                >
                  <td className="p-5">
                    <p className="font-bold text-gray-100 group-hover:text-yellow-500 transition-colors">
                      {inst.name}
                    </p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                      Reputation: High [cite: 28]
                    </p>
                  </td>
                  <td className="p-5 text-gray-400 font-medium">{inst.type}</td>
                  <td className="p-5 text-gray-400 font-medium">{inst.loc}</td>
                  <td className="p-5">
                    <span className="text-yellow-500/80 font-black text-xs">
                      {inst.acc}
                    </span>
                  </td>
                  <td className="p-5 text-gray-500 font-bold">{inst.valid}</td>
                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                        inst.status === "Verified"
                          ? "bg-green-900/30 text-green-400 border border-green-900/50"
                          : "bg-red-900/30 text-red-400 border border-red-900/50"
                      }`}
                    >
                      {inst.status}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center">
                      <button className="p-2 text-gray-500 hover:text-yellow-500 hover:bg-gray-900 rounded-lg transition-all">
                        <FiMoreVertical />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-5 bg-gray-900/30 border-t border-gray-700 flex justify-between items-center text-[10px] font-black text-gray-500 uppercase tracking-widest">
          <span>Showing 4 of 4,280 Institutes [cite: 6]</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-gray-900 border border-gray-700 rounded hover:text-yellow-500 transition-colors">
              Prev
            </button>
            <button className="px-3 py-1 bg-gray-900 border border-gray-700 rounded hover:text-yellow-500 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteManagement;
