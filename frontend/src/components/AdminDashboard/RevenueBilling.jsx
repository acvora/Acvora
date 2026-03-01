// src/components/AdminDashboard/RevenueBilling.jsx
import React from "react";
import {
  FiTrendingUp,
  FiCreditCard,
  FiActivity,
  FiUsers,
  FiBarChart2,
} from "react-icons/fi";

const RevenueBilling = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500 bg-gray-900 text-gray-100">
      <header>
        <h2 className="text-2xl font-bold text-yellow-500">
          Revenue & Monetization
        </h2>
        <p className="text-gray-400">
          Financial Dashboard & Segment Profitability
        </p>
      </header>

      {/* Key Financial Indicators [cite: 105, 106] */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-inner">
          <p className="text-gray-500 text-xs font-bold uppercase mb-1">
            Average Revenue Per User (ARPU)
          </p>
          <p className="text-3xl font-bold text-yellow-500">$142.50</p>
          <div className="mt-4 flex items-center text-xs text-green-400">
            <FiTrendingUp className="mr-1" /> +12% vs last Qtr
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-inner">
          <p className="text-gray-500 text-xs font-bold uppercase mb-1">
            Customer Lifetime Value (LTV)
          </p>
          <p className="text-3xl font-bold text-yellow-500">$840.00</p>
          <div className="mt-4 flex items-center text-xs text-green-400">
            <FiTrendingUp className="mr-1" /> +4% year-over-year
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-inner">
          <p className="text-gray-500 text-xs font-bold uppercase mb-1">
            Total Subscription MRR
          </p>
          <p className="text-3xl font-bold text-yellow-500">$1.2M</p>
          <div className="mt-4 flex items-center text-xs text-gray-500">
            <FiActivity className="mr-1" /> Retention Rate: 88.4%
          </div>
        </div>
      </div>

      {/* Revenue by Vertical & Settlements [cite: 100, 102, 103] */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
          <h4 className="font-bold text-gray-100 flex items-center gap-2">
            <FiBarChart2 className="text-yellow-500" /> Revenue by Vertical
          </h4>
          <span className="text-[10px] bg-yellow-500 text-gray-900 px-2 py-0.5 rounded-full font-bold">
            LIVE DATA
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-900/50 text-gray-500 text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Vertical Name</th>
                <th className="p-4">MTD Revenue</th>
                <th className="p-4">Commission (Accrued)</th>
                <th className="p-4">Partner Settlements</th>
                <th className="p-4">Net Profitability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 text-sm">
              {[
                {
                  name: "Domestic Admissions",
                  mtd: "$450k",
                  comm: "$67k",
                  sett: "$320k",
                  profit: "+18%",
                },
                {
                  name: "Study Abroad (Global)",
                  mtd: "$680k",
                  comm: "$102k",
                  sett: "$410k",
                  profit: "+24%",
                },
                {
                  name: "Subscription Services",
                  mtd: "$120k",
                  comm: "$18k",
                  sett: "$0 (Direct)",
                  profit: "+82%",
                },
                {
                  name: "Loan Lead Referrals",
                  mtd: "$85k",
                  comm: "$12k",
                  sett: "$0 (Direct)",
                  profit: "+94%",
                },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-700/50 transition-colors">
                  <td className="p-4 font-bold text-gray-100">{row.name}</td>
                  <td className="p-4 text-gray-300">{row.mtd}</td>
                  <td className="p-4 text-yellow-500 font-medium">
                    {row.comm}
                  </td>
                  <td className="p-4 text-gray-300">{row.sett}</td>
                  <td className="p-4 text-green-400 font-bold">{row.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RevenueBilling;
