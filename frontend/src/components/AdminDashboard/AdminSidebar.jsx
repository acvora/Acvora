// src/components/AdminDashboard/AdminSidebar.jsx
import React from "react";
import {
  FiHome,
  FiUsers,
  FiBook,
  FiUserCheck,
  FiGlobe,
  FiDollarSign,
  FiBriefcase,
  FiShield,
  FiCpu,
  FiSettings,
  FiPieChart,
  FiLink,
  FiTrendingUp,
  FiActivity,
  FiFileText,
} from "react-icons/fi";
import { FaUniversity } from "react-icons/fa";

const modules = [
  { id: "home", name: "Executive Command Center", icon: <FiHome /> },
  { id: "institutes", name: "Institute Ecosystem", icon: <FaUniversity /> },
  { id: "courses", name: "Program Intelligence", icon: <FiBook /> },
  { id: "students", name: "Student Lifecycle", icon: <FiUsers /> },
  { id: "crm", name: "CRM & Admissions", icon: <FiUserCheck /> },
  { id: "abroad", name: "Global Mobility Hub", icon: <FiGlobe /> },
  { id: "financial", name: "Scholarships & Aid", icon: <FiDollarSign /> },
  { id: "fintech", name: "Loans & FinTech", icon: <FiBriefcase /> },
  { id: "revenue", name: "Revenue & Billing", icon: <FiPieChart /> },
  { id: "marketing", name: "Growth & Brand", icon: <FiTrendingUp /> },
  { id: "alliances", name: "Partnerships", icon: <FiLink /> },
  { id: "grc", name: "Compliance & Risk", icon: <FiShield /> },
  { id: "ai", name: "AI & Automation", icon: <FiCpu /> },
  { id: "rbac", name: "Roles & Permissions", icon: <FiUserCheck /> },
  { id: "devops", name: "System Health", icon: <FiSettings /> },
  { id: "reports", name: "Reports & BI", icon: <FiFileText /> },
  { id: "analytics", name: "Behavioral Intel", icon: <FiActivity /> },
  { id: "settings", name: "Master Controls", icon: <FiSettings /> },
];

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-72 bg-gray-900 h-screen sticky top-0 overflow-y-auto text-gray-100 p-4 border-r border-gray-800">
      <div className="flex items-center gap-3 px-2 mb-8 border-b border-gray-800 pb-6">
        <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center font-black text-gray-900 text-xl shadow-lg shadow-yellow-500/20">
          A
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-100 leading-tight">
            Admin<span className="text-yellow-500">Suite</span>
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
            Enterprise v2.0
          </p>
        </div>
      </div>

      <nav className="space-y-1">
        {modules.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveTab(m.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 group ${
              activeTab === m.id
                ? "bg-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/20"
                : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
            }`}
          >
            <span
              className={`text-lg ${
                activeTab === m.id
                  ? "text-gray-900"
                  : "text-yellow-500/70 group-hover:text-yellow-500"
              }`}
            >
              {m.icon}
            </span>
            {m.name}
          </button>
        ))}
      </nav>

      <div className="mt-8 pt-6 border-t border-gray-800">
        <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700">
          <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">
            System Status
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-gray-300 font-medium">
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
