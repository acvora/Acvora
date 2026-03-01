// src/components/AdminDashboard/LoanOperations.jsx
import React from "react";
import {
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiBarChart2,
  FiFilter,
} from "react-icons/fi";

const LoanOperations = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 bg-gray-900 text-gray-100">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-yellow-500">
            Education Loans & FinTech Hub
          </h2>
          <p className="text-gray-400">
            Loan Pipeline, Bank Partnerships & Fraud Monitoring
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-gray-800 border border-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-700 flex items-center gap-2">
            <FiFilter /> Filter Partners
          </button>
          <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-400 transition-all">
            + New Loan Program
          </button>
        </div>
      </header>

      {/* Loan Metrics [cite: 93, 94] */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Applied Loans",
            value: "1,420",
            icon: <FiClock />,
            color: "text-blue-400",
          },
          {
            label: "Approved Today",
            value: "48",
            icon: <FiCheckCircle />,
            color: "text-green-400",
          },
          {
            label: "Disbursed (MTD)",
            value: "$8.2M",
            icon: <FiBriefcase />,
            color: "text-yellow-500",
          },
          {
            label: "Avg Ticket Size",
            value: "$32.5k",
            icon: <FiBarChart2 />,
            color: "text-indigo-400",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className={`${stat.color} text-xl`}>{stat.icon}</span>
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-tight">
                {stat.label}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-100">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Partner Bank Status [cite: 92] */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
          <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
            <h4 className="font-bold text-gray-100 flex items-center gap-2">
              <FiBriefcase className="text-yellow-500" /> Active Bank & NBFC
              Partners
            </h4>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-gray-500 text-[10px] font-bold uppercase">
                <tr>
                  <th className="pb-3 px-2">Partner Name</th>
                  <th className="pb-3 px-2">Apps Received</th>
                  <th className="pb-3 px-2">Approval Rate</th>
                  <th className="pb-3 px-2">Turnaround (Days)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {[
                  {
                    name: "HDFC Credila",
                    apps: "420",
                    rate: "78%",
                    tat: "4.2",
                  },
                  {
                    name: "SBI Global Ed",
                    apps: "380",
                    rate: "62%",
                    tat: "8.5",
                  },
                  {
                    name: "Incred Finance",
                    apps: "290",
                    rate: "84%",
                    tat: "2.1",
                  },
                  { name: "Avanse", apps: "330", rate: "75%", tat: "3.4" },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-900/50 transition-colors text-gray-300"
                  >
                    <td className="py-3 px-2 font-medium text-gray-100">
                      {row.name}
                    </td>
                    <td className="py-3 px-2">{row.apps}</td>
                    <td className="py-3 px-2 font-bold text-yellow-500">
                      {row.rate}
                    </td>
                    <td className="py-3 px-2">{row.tat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fraud & Risk Flags [cite: 95, 96] */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h3 className="font-bold text-gray-100 mb-6 flex items-center gap-2">
            <FiAlertTriangle className="text-red-400" /> Risk & Compliance
          </h3>
          <div className="space-y-4">
            {[
              {
                id: "L-4490",
                type: "Fraud Flag",
                msg: "Multiple applications from same IP",
                risk: "Critical",
              },
              {
                id: "L-1202",
                type: "Doc Gap",
                msg: "Missing ITR for Co-applicant",
                risk: "Medium",
              },
              {
                id: "L-8842",
                type: "SLA Delay",
                msg: "Verification pending > 48h",
                risk: "Low",
              },
            ].map((alert, i) => (
              <div
                key={i}
                className="p-3 bg-gray-900 rounded-lg border border-gray-700 hover:border-red-400 transition-colors"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase">
                    {alert.id} • {alert.type}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      alert.risk === "Critical"
                        ? "bg-red-900 text-red-300"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {alert.risk}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{alert.msg}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanOperations;
