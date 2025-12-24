// src/components/AdminDashboard/CrmAdmissions.jsx
import React from "react";
import {
  FiUserCheck,
  FiClock,
  FiBarChart,
  FiCheckCircle,
  FiFileText,
  FiTarget,
  FiZap,
} from "react-icons/fi";

const CrmAdmissions = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-700 bg-gray-900 text-gray-100 min-h-screen">
      {/* Header Section [cite: 61] */}
      <header className="flex justify-between items-end border-b border-gray-800 pb-6">
        <div>
          <h2 className="text-3xl font-black text-yellow-500 tracking-tight uppercase">
            Admissions & CRM Engine
          </h2>
          <p className="text-gray-400 font-medium">
            Enterprise Pipeline: Lead Scoring, SLA Tracking & Productivity
            [cite: 62, 65]
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
          <FiZap className="text-yellow-500 animate-pulse" />
          AI Scoring Active
        </div>
      </header>

      {/* CRM Pipeline Stats [cite: 67-71] */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Applications Submitted",
            value: "8,540",
            icon: <FiFileText />,
            cite: "68",
          },
          {
            label: "Offer Letters Issued",
            value: "3,120",
            icon: <FiCheckCircle />,
            cite: "69",
          },
          {
            label: "Acceptance Status",
            value: "2,480",
            icon: <FiUserCheck />,
            cite: "70",
          },
          {
            label: "Enrollment Confirmed",
            value: "1,950",
            icon: <FiBarChart />,
            cite: "71",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl group hover:border-yellow-500/50 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-gray-400">
                {stat.label}
              </p>
              <span className="text-yellow-500/80 group-hover:text-yellow-500 transition-colors">
                {stat.icon}
              </span>
            </div>
            <p className="text-3xl font-black text-gray-100">{stat.value}</p>
            <div className="w-full bg-gray-900 h-1 mt-4 rounded-full overflow-hidden">
              <div className="bg-yellow-500 h-full w-[65%] shadow-[0_0_8px_rgba(234,179,8,0.3)]"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Productivity & SLAs [cite: 65, 66] */}
        <div className="lg:col-span-2 bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
          <div className="p-5 bg-gray-900/50 border-b border-gray-700 flex justify-between items-center">
            <h4 className="font-black text-gray-100 text-sm uppercase tracking-tighter flex items-center gap-2">
              <FiTarget className="text-yellow-500" /> Counsellor Productivity
              Index
            </h4>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              SLA Tracking Enabled
            </span>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-gray-500 font-black uppercase text-[10px] tracking-widest border-b border-gray-700">
                <tr>
                  <th className="pb-4 px-4">Counsellor</th>
                  <th className="pb-4 px-4 text-center">Leads</th>
                  <th className="pb-4 px-4 text-center">Follow-ups </th>
                  <th className="pb-4 px-4 text-center">SLA Compliance </th>
                  <th className="pb-4 px-4 text-right">Lead Score Avg </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {[
                  {
                    name: "Rahul Sharma",
                    leads: 142,
                    follow: 410,
                    sla: "98%",
                    score: 8.2,
                  },
                  {
                    name: "Jessica K.",
                    leads: 128,
                    follow: 385,
                    sla: "94%",
                    score: 7.9,
                  },
                  {
                    name: "Ahmed Mansoor",
                    leads: 156,
                    follow: 480,
                    sla: "89%",
                    score: 8.5,
                  },
                ].map((c, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-900/40 transition-all group"
                  >
                    <td className="py-4 px-4">
                      <span className="font-bold text-gray-100 group-hover:text-yellow-500 transition-colors">
                        {c.name}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-400 font-bold">
                      {c.leads}
                    </td>
                    <td className="py-4 px-4 text-center text-gray-400">
                      {c.follow}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                          parseInt(c.sla) > 90
                            ? "bg-green-900/30 text-green-400 border border-green-900/50"
                            : "bg-red-900/30 text-red-400 border border-red-900/50"
                        }`}
                      >
                        {c.sla}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-black text-yellow-500">
                      {c.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Lead Scoring Priority  */}
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl group hover:border-yellow-500/50 transition-all">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-gray-100 uppercase text-sm tracking-tighter flex items-center gap-2">
              <FiZap className="text-yellow-500" /> AI Lead Priority
            </h3>
            <FiClock className="text-gray-600" />
          </div>
          <div className="space-y-4">
            {[
              { student: "Ananya Rao", score: 94, goal: "MS CS, Germany" },
              { student: "Vikram Das", score: 89, goal: "MBA, UK" },
              { student: "Priya Lakshmi", score: 82, goal: "B.Tech, India" },
            ].map((lead, i) => (
              <div
                key={i}
                className="p-4 bg-gray-900 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-all group/item"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-black text-gray-100 group-hover/item:text-yellow-500 transition-colors">
                      {lead.student}
                    </p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                      {lead.goal}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-yellow-500">
                      {lead.score}
                    </span>
                    <p className="text-[8px] font-bold text-gray-600 uppercase">
                      Intent Score
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrmAdmissions;
