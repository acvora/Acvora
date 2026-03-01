// src/components/AdminDashboard/MasterSettings.jsx
import React from "react";
import {
  FiSettings,
  FiGlobe,
  FiCpu,
  FiBell,
  FiLayers,
  FiDatabase,
  FiAward,
  FiChevronRight,
} from "react-icons/fi";

const MasterSettings = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500 bg-gray-900 text-gray-100">
      <header>
        <h2 className="text-2xl font-bold text-yellow-500">
          Settings & Master Controls
        </h2>
        <p className="text-gray-400">
          Global Taxonomy & Platform Configuration [cite: 219]
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Core Taxonomy & Regulations [cite: 220-222] */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
          <div className="p-4 bg-gray-800 border-b border-gray-700">
            <h4 className="font-bold text-gray-100 flex items-center gap-2">
              <FiGlobe className="text-yellow-500" /> Global Masters
            </h4>
          </div>
          <div className="divide-y divide-gray-700">
            {[
              {
                icon: <FiGlobe />,
                label: "Countries & Regulations",
                desc: "Manage legal frameworks for 12+ operating regions [cite: 220]",
              },
              {
                icon: <FiLayers />,
                label: "Course Taxonomy",
                desc: "Define UG/PG levels and discipline trees [cite: 222]",
              },
              {
                icon: <FiAward />,
                label: "Accreditation Masters",
                desc: "NAAC, AACSB, WASC approval validity parameters [cite: 221]",
              },
            ].map((setting, i) => (
              <div
                key={i}
                className="p-4 flex items-center justify-between hover:bg-gray-700/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl text-yellow-500 opacity-80 group-hover:opacity-100">
                    {setting.icon}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-gray-100">
                      {setting.label}
                    </p>
                    <p className="text-xs text-gray-500">{setting.desc}</p>
                  </div>
                </div>
                <FiChevronRight className="text-gray-600 group-hover:text-yellow-500 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Technical Integrations [cite: 223-224] */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
          <div className="p-4 bg-gray-800 border-b border-gray-700">
            <h4 className="font-bold text-gray-100 flex items-center gap-2">
              <FiCpu className="text-yellow-500" /> Integration Hub
            </h4>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-900 rounded-lg border border-gray-700 text-center">
                <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">
                  WhatsApp Engine [cite: 224]
                </p>
                <span className="text-xs font-bold text-green-400 bg-green-900/30 px-2 py-0.5 rounded-full">
                  CONNECTED
                </span>
              </div>
              <div className="p-4 bg-gray-900 rounded-lg border border-gray-700 text-center">
                <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">
                  Payment Gateway [cite: 224]
                </p>
                <span className="text-xs font-bold text-green-400 bg-green-900/30 px-2 py-0.5 rounded-full">
                  ACTIVE
                </span>
              </div>
            </div>
            <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-sm font-bold text-gray-100 flex items-center gap-2">
                  <FiBell /> Notification Engine [cite: 223]
                </h5>
                <span className="text-[9px] text-yellow-500 font-bold hover:underline cursor-pointer">
                  TEST WEBHOOKS
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Email SMTP Status</span>
                  <span className="text-gray-100">Synchronized</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>SMS Gateway Latency</span>
                  <span className="text-gray-100">84ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterSettings;
