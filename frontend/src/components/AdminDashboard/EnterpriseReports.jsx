// src/components/AdminDashboard/EnterpriseReports.jsx
import React from "react";
import {
  FiDownload,
  FiBarChart2,
  FiPieChart,
  FiTrendingUp,
  FiFileText,
  FiCalendar,
} from "react-icons/fi";

const EnterpriseReports = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 bg-gray-900 text-gray-100">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-yellow-500">
            Reports & Business Intelligence
          </h2>
          <p className="text-gray-400">
            Enterprise Data Warehouse & Board Reporting [cite: 147]
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-gray-800 border border-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-700 flex items-center gap-2">
            <FiCalendar /> Custom Range
          </button>
          <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-400 flex items-center gap-2 transition-all">
            <FiDownload /> Export Center [cite: 150]
          </button>
        </div>
      </header>

      {/* BI Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden group">
          <FiPieChart className="absolute -right-4 -top-4 text-8xl text-yellow-500 opacity-5 group-hover:scale-110 transition-transform" />
          <h3 className="text-gray-400 text-xs font-bold uppercase mb-4 tracking-widest">
            Market Share Analysis
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Domestic</span>
              <span className="text-yellow-500 font-bold">62%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">International</span>
              <span className="text-yellow-500 font-bold">38%</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden group">
          <FiTrendingUp className="absolute -right-4 -top-4 text-8xl text-yellow-500 opacity-5 group-hover:scale-110 transition-transform" />
          <h3 className="text-gray-400 text-xs font-bold uppercase mb-4 tracking-widest">
            Revenue Growth YOY
          </h3>
          <p className="text-3xl font-bold text-gray-100">+28.4%</p>
          <p className="text-xs text-green-400 mt-2">
            Exceeding Investor Targets [cite: 151]
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden group">
          <FiBarChart2 className="absolute -right-4 -top-4 text-8xl text-yellow-500 opacity-5 group-hover:scale-110 transition-transform" />
          <h3 className="text-gray-400 text-xs font-bold uppercase mb-4 tracking-widest">
            Student Acquisition Cost
          </h3>
          <p className="text-3xl font-bold text-gray-100">$42.00</p>
          <p className="text-xs text-yellow-500 mt-2">
            -12% Optimization achieved
          </p>
        </div>
      </div>

      {/* Ready-to-Export Investor Reports [cite: 151] */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
        <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
          <h4 className="font-bold text-gray-100 flex items-center gap-2">
            <FiFileText className="text-yellow-500" /> Investor & Board Reports
          </h4>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Q3 2025 Financial Performance",
              format: "PDF / XLSX",
              size: "4.2 MB",
              date: "Oct 12, 2025",
            },
            {
              title: "Global Mobility Trend Analysis",
              format: "PDF",
              size: "8.1 MB",
              date: "Oct 10, 2025",
            },
            {
              title: "Institute Compliance Audit Summary",
              format: "XLSX",
              size: "2.4 MB",
              date: "Oct 05, 2025",
            },
            {
              title: "AI Success Prediction Accuracy Report",
              format: "PDF / CSV",
              size: "1.8 MB",
              date: "Sep 28, 2025",
            },
          ].map((report, i) => (
            <div
              key={i}
              className="p-4 bg-gray-900 rounded-lg border border-gray-700 hover:border-yellow-500 transition-all flex justify-between items-center cursor-pointer"
            >
              <div>
                <p className="text-sm font-bold text-gray-100">
                  {report.title}
                </p>
                <p className="text-[10px] text-gray-500 uppercase font-bold mt-1">
                  {report.format} • {report.size} • {report.date}
                </p>
              </div>
              <button className="text-gray-500 hover:text-yellow-500 p-2">
                <FiDownload />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnterpriseReports;
