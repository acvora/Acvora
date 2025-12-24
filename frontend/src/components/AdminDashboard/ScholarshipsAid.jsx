// src/components/AdminDashboard/ScholarshipsAid.jsx
import React from "react";
import {
  FiDollarSign,
  FiSearch,
  FiCheckCircle,
  FiPieChart,
  FiGlobe,
} from "react-icons/fi";

const ScholarshipsAid = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 bg-gray-900 text-gray-100 p-2">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-yellow-500">
            Scholarships & Financial Aid
          </h2>
          <p className="text-gray-400">
            Intelligence & Fund Utilization Tracking
          </p>
        </div>
        <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-400 transition-colors">
          + Add New Grant
        </button>
      </header>

      {/* Scholarship Intelligence Metrics [cite: 83-86] */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Scholarships",
            value: "1,240",
            sub: "National: 800 | Int: 440",
            icon: <FiGlobe />,
          },
          {
            label: "Application Success",
            value: "18.4%",
            sub: "+2.1% from last month",
            icon: <FiCheckCircle />,
          },
          {
            label: "Funds Disbursed",
            value: "$4.2M",
            sub: "Utilization: 76%",
            icon: <FiDollarSign />,
          },
          {
            label: "Active Matches",
            value: "42.8k",
            sub: "AI Eligibility Engine",
            icon: <FiSearch />,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                {stat.label}
              </span>
              <span className="text-yellow-500 text-lg">{stat.icon}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-100">{stat.value}</h3>
            <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grant Analytics & Fund Utilization [cite: 87-89] */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
            <h4 className="font-bold text-gray-100">
              Regional Grant Impact Metrics
            </h4>
            <FiPieChart className="text-yellow-500" />
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {[
                {
                  region: "North America",
                  usage: "92%",
                  color: "bg-yellow-500",
                },
                {
                  region: "European Union",
                  usage: "78%",
                  color: "bg-yellow-600",
                },
                {
                  region: "India (Domestic)",
                  usage: "64%",
                  color: "bg-gray-600",
                },
                {
                  region: "Southeast Asia",
                  usage: "45%",
                  color: "bg-gray-700",
                },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300 font-medium">
                      {item.region}
                    </span>
                    <span className="text-yellow-500 font-bold">
                      {item.usage} Utilization
                    </span>
                  </div>
                  <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
                    <div
                      className={`${item.color} h-full`}
                      style={{ width: item.usage }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Stories / Impact Feed */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h3 className="font-bold text-gray-100 mb-6 flex items-center gap-2">
            <FiCheckCircle className="text-yellow-500" /> Recent Fund Success
          </h3>
          <div className="space-y-4">
            {[
              {
                student: "S. Iyer",
                grant: "Global Tech Fellowship",
                amt: "$15,000",
              },
              {
                student: "M. Weber",
                grant: "DAAD International",
                amt: "€12,000",
              },
              {
                student: "A. Khan",
                grant: "Reliance Merit Scholarship",
                amt: "₹2.0L",
              },
            ].map((entry, i) => (
              <div
                key={i}
                className="p-3 bg-gray-900 rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors"
              >
                <p className="text-sm font-bold text-gray-100">
                  {entry.student}
                </p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[10px] text-gray-500 uppercase font-bold">
                    {entry.grant}
                  </span>
                  <span className="text-sm font-bold text-yellow-500">
                    {entry.amt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipsAid;
