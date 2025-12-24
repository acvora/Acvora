// src/components/AdminDashboard/UserRbac.jsx
import React from "react";
import {
  FiUserCheck,
  FiShield,
  FiUsers,
  FiLock,
  FiEdit2,
  FiTrash2,
  FiGlobe,
} from "react-icons/fi";

const UserRbac = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500 bg-gray-900 text-gray-100">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-yellow-500">
            User Roles & Permissions
          </h2>
          <p className="text-gray-400">Enterprise RBAC System Configuration</p>
        </div>
        <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-400 shadow-xl">
          + Invite User
        </button>
      </header>

      {/* Role Distribution [cite: 136-141] */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Super Admins",
            count: 4,
            icon: <FiShield />,
            color: "text-red-400",
          },
          {
            label: "Country Admins",
            count: 12,
            icon: <FiGlobe />,
            color: "text-yellow-500",
          },
          {
            label: "Counsellors",
            count: 142,
            icon: <FiUsers />,
            color: "text-blue-400",
          },
          {
            label: "Verification Team",
            count: 28,
            icon: <FiUserCheck />,
            color: "text-green-400",
          },
        ].map((role, i) => (
          <div
            key={i}
            className="bg-gray-800 p-5 rounded-xl border border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`${role.color} text-xl`}>{role.icon}</span>
              <span className="text-2xl font-bold text-gray-100">
                {role.count}
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">
              {role.label}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
        <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
          <h4 className="font-bold text-gray-100 flex items-center gap-2">
            <FiLock className="text-yellow-500" /> Active System Users
          </h4>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search users..."
              className="bg-gray-900 border border-gray-700 text-xs px-3 py-1 rounded outline-none focus:border-yellow-500 transition-colors"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-900/50 text-gray-500 text-[10px] font-bold uppercase">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Region/Jurisdiction</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 text-xs">
              {[
                {
                  name: "Rahul Sharma",
                  email: "rahul.s@platform.com",
                  role: "Country Admin",
                  region: "India",
                  status: "Active",
                },
                {
                  name: "John Miller",
                  email: "john.m@platform.com",
                  role: "Super Admin",
                  region: "Global",
                  status: "Active",
                },
                {
                  name: "Sarah Weber",
                  email: "s.weber@platform.com",
                  role: "Counsellor",
                  region: "Germany",
                  status: "Away",
                },
                {
                  name: "Amit Patel",
                  email: "amit.p@platform.com",
                  role: "Verification Team",
                  region: "India-South",
                  status: "Active",
                },
              ].map((u, i) => (
                <tr key={i} className="hover:bg-gray-700/50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-gray-100">{u.name}</p>
                    <p className="text-[10px] text-gray-500">{u.email}</p>
                  </td>
                  <td className="p-4 font-medium text-yellow-500">{u.role}</td>
                  <td className="p-4 text-gray-400">{u.region}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        u.status === "Active"
                          ? "bg-green-900 text-green-400"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button className="text-gray-400 hover:text-yellow-500">
                        <FiEdit2 />
                      </button>
                      <button className="text-gray-400 hover:text-red-400">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserRbac;
