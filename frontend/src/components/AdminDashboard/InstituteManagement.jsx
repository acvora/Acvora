// src/components/AdminDashboard/InstituteManagement.jsx
import React, { useState, useEffect } from "react";
import {
  FiPlus,
  FiCheck,
  FiClock,
  FiSlash,
  FiX,
  FiAlertCircle,
} from "react-icons/fi";
import { getUniversities, updateUniversityStatus } from "../../api";
import MultiStepForm from "../../Pages/UniversityRegister";

const InstituteManagement = () => {
  const [institutes, setInstitutes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await getUniversities();
    if (res.success) setInstitutes(res.data);
    setLoading(false);
  };

  const handleAction = async (id, newStatus) => {
    const res = await updateUniversityStatus(id, newStatus);
    if (res.success) {
      setInstitutes((prev) =>
        prev.map((i) => (i._id === id ? { ...i, status: newStatus } : i))
      );
    }
  };

  const stats = {
    total: institutes.length,
    approved: institutes.filter((i) => i.status === "approved").length,
    pending: institutes.filter((i) => i.status === "hold" || !i.status).length,
  };

  return (
    <div className="space-y-6 bg-gray-900 text-gray-100 min-h-screen p-6 relative">
      {/* Header Section */}
      <div className="flex justify-between items-end border-b border-gray-800 pb-6">
        <header>
          <h2 className="text-3xl font-black text-yellow-500 uppercase tracking-tighter">
            Institute Ecosystem
          </h2>
          <p className="text-gray-400 font-medium">
            Database Authority: {stats.total} Entities
          </p>
        </header>
        <button
          onClick={() => {
            setShowForm(true);
            document.body.style.overflow = "hidden"; // Prevent background scroll
          }}
          className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-xl font-black text-sm shadow-lg shadow-yellow-500/20 hover:bg-yellow-400 transition-all flex items-center gap-2 group"
        >
          <FiPlus className="group-hover:rotate-90 transition-transform" /> ADD
          UNIVERSITY
        </button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl border-l-4 border-l-yellow-500">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
            Live Verified
          </p>
          <p className="text-3xl font-black text-yellow-500">
            {stats.approved}
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl border-l-4 border-l-blue-500">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
            Pending Gatekeeper
          </p>
          <p className="text-3xl font-black text-gray-100">{stats.pending}</p>
        </div>
      </div>

      {/* Database Table */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-900 text-[10px] font-black uppercase text-gray-500 tracking-widest">
              <tr>
                <th className="p-5">Institute Identity</th>
                <th className="p-5">Geo-Location</th>
                <th className="p-5">Registry Status</th>
                <th className="p-5 text-center">Governance Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {institutes.map((inst) => (
                <tr
                  key={inst._id}
                  className="hover:bg-gray-900/40 transition-colors"
                >
                  <td className="p-5">
                    <p className="font-bold text-gray-100">
                      {inst.instituteName || "Unnamed Institute"}
                    </p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">
                      {inst.type || "General"}
                    </p>
                  </td>
                  <td className="p-5 text-gray-400 text-sm">
                    {inst.city}, {inst.state}
                  </td>
                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter ${
                        inst.status === "approved"
                          ? "bg-green-900/40 text-green-400 border border-green-500/20"
                          : inst.status === "blocked"
                          ? "bg-red-900/40 text-red-400 border border-red-500/20"
                          : "bg-blue-900/40 text-blue-400 border border-blue-500/20"
                      }`}
                    >
                      {inst.status || "hold"}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handleAction(inst._id, "approved")}
                        className="text-green-500 hover:scale-125 transition-all"
                        title="Verify Registration"
                      >
                        <FiCheck />
                      </button>
                      <button
                        onClick={() => handleAction(inst._id, "hold")}
                        className="text-blue-400 hover:scale-125 transition-all"
                        title="Move to Hold"
                      >
                        <FiClock />
                      </button>
                      <button
                        onClick={() => handleAction(inst._id, "blocked")}
                        className="text-red-500 hover:scale-125 transition-all"
                        title="Block Access"
                      >
                        <FiSlash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ENHANCED REGISTRATION OVERLAY --- */}
      {showForm && (
        <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md flex justify-center items-start animate-in fade-in zoom-in duration-300">
          <div className="w-full max-w-6xl bg-gray-900 h-screen md:h-[92vh] md:mt-8 md:rounded-3xl border border-gray-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
            {/* Sticky Modal Header */}
            <div className="p-6 bg-gray-800 border-b border-gray-700 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-500 p-2 rounded-lg">
                  <FiAlertCircle className="text-gray-900 text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-100 uppercase tracking-tighter">
                    New University Registration
                  </h2>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Administrative Intake Mode
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowForm(false);
                  document.body.style.overflow = "unset";
                }}
                className="w-10 h-10 bg-gray-900 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-all shadow-xl"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Scrollable Form Container */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-0 md:p-4 bg-gray-950/30">
              <div className="max-w-5xl mx-auto">
                <MultiStepForm
                  onComplete={() => {
                    setShowForm(false);
                    fetchData();
                    document.body.style.overflow = "unset";
                  }}
                />
              </div>
            </div>

            {/* Modal Footer Hint */}
            <div className="p-3 bg-gray-800/50 border-t border-gray-700 text-center">
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">
                Acvora Intelligent Data Systems &copy; 2026
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstituteManagement;
