// src/components/AdminDashboard/ComplianceRisk.jsx
import React from "react";
import {
  FiShield,
  FiLock,
  FiAlertCircle,
  FiCheckCircle,
  FiFileText,
  FiClock,
} from "react-icons/fi";

const ComplianceRisk = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500 bg-gray-900 text-gray-100">
      <header>
        <h2 className="text-2xl font-bold text-yellow-500">
          Compliance, Governance & Risk
        </h2>
        <p className="text-gray-400">
          Statutory Controls & Data Privacy (DPDP/GDPR)
        </p>
      </header>

      {/* Compliance Overview [cite: 125, 126, 128] */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "UGC/AICTE Status",
            value: "Compliant",
            icon: <FiCheckCircle />,
            color: "text-green-400",
          },
          {
            label: "Privacy Requests",
            value: "12 Pending",
            icon: <FiLock />,
            color: "text-yellow-500",
          },
          {
            label: "Open Legal Notices",
            value: "2 Active",
            icon: <FiAlertCircle />,
            color: "text-red-400",
          },
          {
            label: "GDPR Score",
            value: "98/100",
            icon: <FiShield />,
            color: "text-yellow-600",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-md"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className={`${stat.color} text-xl`}>{stat.icon}</span>
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-tight">
                {stat.label}
              </span>
            </div>
            <p className="text-xl font-bold text-gray-100">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Audit Trails [cite: 127] */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
          <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
            <h4 className="font-bold text-gray-100 flex items-center gap-2">
              <FiClock className="text-yellow-500" /> Recent Audit Trails
            </h4>
            <button className="text-[10px] text-yellow-500 font-bold hover:underline">
              EXPORT LOGS
            </button>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-gray-500 font-bold uppercase">
                <tr>
                  <th className="pb-3 px-2">Action</th>
                  <th className="pb-3 px-2">User Role</th>
                  <th className="pb-3 px-2">Timestamp</th>
                  <th className="pb-3 px-2">Risk Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {[
                  {
                    action: "Institute Verification Override",
                    role: "Super Admin",
                    time: "10 mins ago",
                    risk: "High",
                  },
                  {
                    action: "Student Data Export",
                    role: "Country Admin",
                    time: "1 hour ago",
                    risk: "Medium",
                  },
                  {
                    action: "SLA Parameter Change",
                    role: "Regional Admin",
                    time: "3 hours ago",
                    risk: "Low",
                  },
                  {
                    action: "Role Permission Update",
                    role: "Super Admin",
                    time: "Yesterday",
                    risk: "High",
                  },
                ].map((log, i) => (
                  <tr key={i} className="hover:bg-gray-900/50">
                    <td className="py-3 px-2 font-medium text-gray-200">
                      {log.action}
                    </td>
                    <td className="py-3 px-2 text-gray-400">{log.role}</td>
                    <td className="py-3 px-2 text-gray-400">{log.time}</td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold uppercase text-[9px] ${
                          log.risk === "High"
                            ? "bg-red-900 text-red-300"
                            : "bg-yellow-900 text-yellow-300"
                        }`}
                      >
                        {log.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Data Privacy & Consent Logs [cite: 213, 214] */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h3 className="font-bold text-gray-100 mb-6 flex items-center gap-2">
            <FiShield className="text-yellow-500" /> DPDP Compliance
          </h3>
          <div className="space-y-6">
            <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">
                Anonymized Analytics Status
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-400 font-bold">Active</span>
                <div className="w-10 h-4 bg-yellow-500 rounded-full flex items-center justify-end px-1 cursor-pointer">
                  <div className="w-3 h-3 bg-gray-900 rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] text-gray-500 font-bold uppercase">
                Consent Log Statistics
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Opt-in (Marketing)</span>
                <span className="text-gray-100 font-bold">84.2%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Opt-out (Profiling)</span>
                <span className="text-gray-100 font-bold">12.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceRisk;
