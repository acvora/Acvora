// src/components/AdminDashboard/DevOpsHealth.jsx
import React from "react";
import {
  FiSettings,
  FiActivity,
  FiZap,
  FiServer,
  FiAlertOctagon,
  FiCpu,
} from "react-icons/fi";

const DevOpsHealth = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500 bg-gray-900 text-gray-100">
      <header>
        <h2 className="text-2xl font-bold text-yellow-500">
          System Health & DevOps
        </h2>
        <p className="text-gray-400">
          Server Infrastructure & Real-Time Performance Monitoring
        </p>
      </header>

      {/* Infrastructure Snapshot [cite: 143-145] */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Platform Uptime",
            value: "99.98%",
            icon: <FiActivity />,
            color: "text-green-400",
          },
          {
            label: "Avg API Latency",
            value: "142ms",
            icon: <FiZap />,
            color: "text-yellow-500",
          },
          {
            label: "Active Servers",
            value: "12 / 12",
            icon: <FiServer />,
            color: "text-blue-400",
          },
          {
            label: "Open Issues",
            value: "3",
            icon: <FiAlertOctagon />,
            color: "text-red-400",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-gray-800 p-5 rounded-xl border border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`${stat.color} text-xl`}>{stat.icon}</span>
              <span className="text-2xl font-bold text-gray-100">
                {stat.value}
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Error Tracking [cite: 146] */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
          <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
            <h4 className="font-bold text-gray-100 flex items-center gap-2">
              <FiAlertOctagon className="text-red-400" /> Error Tracking Logs
            </h4>
            <span className="text-[10px] text-gray-500 font-bold uppercase">
              Real-Time Refresh
            </span>
          </div>
          <div className="p-4 space-y-3">
            {[
              {
                error: "ECONNREFUSED",
                service: "Payment Gateway API",
                time: "2 mins ago",
                count: 14,
              },
              {
                error: "404 Not Found",
                service: "User Profile Assets",
                time: "12 mins ago",
                count: 420,
              },
              {
                error: "Timeout Exception",
                service: "Loan Doc OCR Engine",
                time: "1 hour ago",
                count: 2,
              },
            ].map((err, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-700 border-l-4 border-l-red-500"
              >
                <div>
                  <p className="text-sm font-bold text-gray-100">{err.error}</p>
                  <p className="text-[10px] text-gray-500">
                    {err.service} • {err.time}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400">Occurrences</p>
                  <p className="text-sm font-bold text-yellow-500">
                    {err.count}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Server Load Distribution */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h3 className="font-bold text-gray-100 mb-6 flex items-center gap-2">
            <FiCpu className="text-yellow-500" /> Resource Load Distribution
          </h3>
          <div className="space-y-6">
            {[
              {
                name: "Core Engine (Node.js Cluster)",
                load: "64%",
                color: "bg-yellow-500",
              },
              {
                name: "Data Warehouse (BigQuery)",
                load: "42%",
                color: "bg-yellow-600",
              },
              {
                name: "AI Recommendation Worker",
                load: "88%",
                color: "bg-red-500",
              },
              { name: "Global CDN Edge", load: "18%", color: "bg-gray-600" },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-medium">{item.name}</span>
                  <span className="text-yellow-500 font-bold">
                    {item.load} Load
                  </span>
                </div>
                <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
                  <div
                    className={`${item.color} h-full`}
                    style={{ width: item.load }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevOpsHealth;
