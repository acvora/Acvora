// src/components/AdminDashboard/ExecutiveCommandCenter.jsx
import React, { useState, useEffect } from "react";
import { FiGlobe, FiAlertCircle } from "react-icons/fi";
// ✅ Import getUniversities to fetch real institute data
import { getStudents, getCounsellings, getUniversities } from "../../api";

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
  // ✅ Added universities to state
  const [counts, setCounts] = useState({
    students: 0,
    counselling: 0,
    universities: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const sData = await getStudents();
        const cData = await getCounsellings();
        // ✅ Fetch real university data
        const uData = await getUniversities();

        setCounts({
          students: sData?.length || 0,
          counselling: cData?.length || 0,
          // ✅ Filter uData to count only "approved" institutes
          universities: uData?.success
            ? uData.data.filter((u) => u.status === "approved").length
            : 0,
        });
      } catch (error) {
        console.error("Sync Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8 bg-gray-900 min-h-screen text-gray-100 p-6">
      <header className="border-b border-gray-800 pb-6">
        <h2 className="text-3xl font-black text-yellow-500 uppercase tracking-tight">
          EXECUTIVE COMMAND CENTER
        </h2>
        <p className="text-gray-400 font-medium tracking-tight">
          Real-Time Platform Pulse
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="REGISTERED STUDENTS"
          value={loading ? "..." : (counts?.students ?? 0).toLocaleString()}
          subValue="Total Platform Signups"
          trend="up"
        />
        <StatCard
          label="ACTIVE COUNSELLING"
          value={loading ? "..." : (counts?.counselling ?? 0).toLocaleString()}
          subValue="Live Session Bookings"
          trend="up"
        />
        <StatCard
          label="TOTAL INSTITUTES"
          // ✅ Display the real count of approved universities
          value={loading ? "..." : (counts?.universities ?? 0).toLocaleString()}
          subValue="Verified & Approved"
          trend="up"
        />
        <StatCard
          label="REVENUE (YTD)"
          value="$12.4M"
          subValue="Overall Target"
          trend="up"
        />
      </div>
    </div>
  );
};

export default ExecutiveCommandCenter;
