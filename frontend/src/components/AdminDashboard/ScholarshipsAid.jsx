// src/components/AdminDashboard/ScholarshipsAid.jsx
import React, { useState, useEffect } from "react";
import {
  FiDollarSign,
  FiSearch,
  FiCheckCircle,
  FiPieChart,
  FiGlobe,
} from "react-icons/fi";
import { getScholarships, getAdminScholars } from "../../api";

const ScholarshipsAid = () => {
  const [data, setData] = useState({
    allScholarships: [],
    adminScholars: [],
    loading: true,
  });

  useEffect(() => {
    const fetchScholarshipData = async () => {
      const [globalRes, adminRes] = await Promise.all([
        getScholarships(),
        getAdminScholars(),
      ]);

      setData({
        allScholarships: globalRes,
        adminScholars: adminRes,
        loading: false,
      });
    };
    fetchScholarshipData();
  }, []);

  // Calculate real metrics
  const totalCount = data.allScholarships.length + data.adminScholars.length;
  const domesticCount = [...data.allScholarships, ...data.adminScholars].filter(
    (s) =>
      s.region?.toLowerCase().includes("india") ||
      s.type?.toLowerCase().includes("domestic")
  ).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 bg-gray-900 text-gray-100 p-2">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-yellow-500">
            Scholarships & Financial Aid
          </h2>
          <p className="text-gray-400">
            Real-Time Intelligence & Fund Tracking
          </p>
        </div>
        <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-400 transition-colors">
          + Add New Grant
        </button>
      </header>

      {/* Real Data Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Scholarships"
          value={data.loading ? "..." : totalCount}
          sub={`Domestic: ${domesticCount} | Intl: ${
            totalCount - domesticCount
          }`}
          icon={<FiGlobe />}
        />
        <StatCard
          label="Active Admin Grants"
          value={data.loading ? "..." : data.adminScholars.length}
          sub="Direct Platform Listings"
          icon={<FiCheckCircle />}
        />
        {/* Funds Disbursed & Active Matches remain as placeholders or manual targets */}
        <StatCard
          label="Funds Disbursed"
          value="$4.2M"
          sub="Utilization: 76%"
          icon={<FiDollarSign />}
        />
        <StatCard
          label="Active Matches"
          value="42.8k"
          sub="AI Eligibility Engine"
          icon={<FiSearch />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real Grant Registry Table/List */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-4 bg-gray-800 border-b border-gray-700">
            <h4 className="font-bold text-gray-100 uppercase text-xs tracking-widest">
              Active Grant Registry
            </h4>
          </div>
          <div className="p-0 overflow-y-auto max-h-[400px] custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-900 text-gray-500 text-[10px] uppercase font-black">
                <tr>
                  <th className="p-4">Grant Name</th>
                  <th className="p-4">Provider</th>
                  <th className="p-4 text-center">Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {[...data.adminScholars, ...data.allScholarships]
                  .slice(0, 10)
                  .map((s, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-900/40 transition-colors text-xs"
                    >
                      <td className="p-4 font-bold text-gray-200">{s.name}</td>
                      <td className="p-4 text-gray-400">
                        {s.provider || "University Partner"}
                      </td>
                      <td className="p-4 text-center text-yellow-500 font-bold">
                        {s.deadline
                          ? new Date(s.deadline).toLocaleDateString()
                          : "Ongoing"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Success Stories remains hardcoded or can be linked to a new Success Model */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h3 className="font-bold text-gray-100 mb-6 flex items-center gap-2">
            <FiCheckCircle className="text-yellow-500" /> Recent Fund Success
          </h3>
          {/* ... existing Success Stories list ... */}
        </div>
      </div>
    </div>
  );
};

// Reusable StatCard
const StatCard = ({ label, value, sub, icon }) => (
  <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
    <div className="flex justify-between items-start mb-4">
      <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
        {label}
      </span>
      <span className="text-yellow-500 text-lg">{icon}</span>
    </div>
    <h3 className="text-2xl font-bold text-gray-100">{value}</h3>
    <p className="text-xs text-gray-500 mt-1">{sub}</p>
  </div>
);

export default ScholarshipsAid;
