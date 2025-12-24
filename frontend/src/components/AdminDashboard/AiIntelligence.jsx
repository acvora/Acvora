// src/components/AdminDashboard/AiIntelligence.jsx
import React from "react";
import {
  FiCpu,
  FiAlertTriangle,
  FiCheckCircle,
  FiMessageSquare,
  FiActivity,
  FiArrowRight,
} from "react-icons/fi";

const AiIntelligence = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500 bg-gray-900 text-gray-100">
      <header>
        <h2 className="text-2xl font-bold text-yellow-500">
          AI, Automation & Intelligence Layer
        </h2>
        <p className="text-gray-400">Predictive Modeling & Success Analytics</p>
      </header>

      {/* Intelligence Snapshot [cite: 130-132] */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Success Predictions",
            value: "94%",
            icon: <FiCheckCircle />,
            color: "text-green-400",
          },
          {
            label: "Dropout Risk Alerts",
            value: "42",
            icon: <FiAlertTriangle />,
            color: "text-red-400",
          },
          {
            label: "Auto-Recommendations",
            value: "12.8k",
            icon: <FiCpu />,
            color: "text-yellow-500",
          },
          {
            label: "Bot Resolutions",
            value: "68%",
            icon: <FiMessageSquare />,
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
            <p className="text-2xl font-bold text-gray-100">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dropout Risk Monitoring [cite: 132] */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
          <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
            <h4 className="font-bold text-gray-100 flex items-center gap-2">
              <FiAlertTriangle className="text-red-400" /> High-Risk Dropout
              Alerts
            </h4>
            <button className="text-[10px] text-yellow-500 font-bold hover:underline">
              VIEW ALL
            </button>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {[
                {
                  name: "John Smith",
                  id: "STU-8842",
                  risk: "88%",
                  reason: "Inactivity > 15 Days",
                },
                {
                  name: "Maria Garcia",
                  id: "STU-1290",
                  risk: "74%",
                  reason: "Incomplete Loan Docs",
                },
                {
                  name: "Arjun Mehta",
                  id: "STU-4402",
                  risk: "62%",
                  reason: "Application Stalled (Visa)",
                },
              ].map((student, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-700 hover:border-red-400 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center font-bold text-yellow-500">
                      {student.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-100">
                        {student.name}
                      </p>
                      <p className="text-[10px] text-gray-500">{student.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-red-400">
                      {student.risk} Risk
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {student.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bot & Auto-Counselling Insights [cite: 133] */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h3 className="font-bold text-gray-100 mb-6 flex items-center gap-2">
            <FiActivity className="text-yellow-500" /> Intelligence Engine
          </h3>
          <div className="space-y-6">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <p className="text-xs font-bold text-gray-500 uppercase mb-2">
                Recommendation Accuracy
              </p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-yellow-500">92%</span>
                <span className="text-xs text-green-400 mb-1">+4% YoY</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-500 uppercase">
                Top AI Inquiries
              </p>
              <div className="space-y-2">
                {["Fee Structures", "Visa Requirements", "IELTS Prep"].map(
                  (tag, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs p-2 bg-gray-900 rounded border border-gray-700 text-gray-300"
                    >
                      <span>{tag}</span>
                      <FiArrowRight className="text-yellow-500" />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiIntelligence;
