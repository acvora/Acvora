// src/components/AdminDashboard/ProgramIntelligence.jsx
import React, { useState, useEffect } from "react";
import {
  FiBook,
  FiTrendingUp,
  FiPieChart,
  FiTarget,
  FiActivity,
} from "react-icons/fi";
import { getStandaloneCourses, getUniversities, getStudents } from "../../api";

const ProgramIntelligence = () => {
  const [data, setData] = useState({
    courses: [],
    intakeCapacity: 0,
    levelDistribution: { UG: 0, PG: 0, Diploma: 0, PhD: 0 },
    loading: true,
  });

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const [courses, universities, students] = await Promise.all([
          getStandaloneCourses(),
          getUniversities(),
          getStudents(),
        ]);

        // Calculate Total Intake Capacity from all universities
        let totalIntake = 0;
        const levels = { UG: 0, PG: 0, Diploma: 0, PhD: 0 };

        universities.data?.forEach((uni) => {
          uni.courses?.forEach((c) => {
            totalIntake += parseInt(c.intake) || 0;
          });
        });

        // Calculate Level Distribution from Standalone Courses
        courses.forEach((c) => {
          if (levels[c.level]) levels[c.level]++;
          else if (
            c.level?.includes("UG") ||
            c.level?.toLowerCase().includes("undergraduate")
          )
            levels.UG++;
          else if (
            c.level?.includes("PG") ||
            c.level?.toLowerCase().includes("postgraduate")
          )
            levels.PG++;
        });

        setData({
          courses,
          intakeCapacity: totalIntake,
          levelDistribution: levels,
          loading: false,
        });
      } catch (error) {
        console.error("Error syncing program intelligence:", error);
        setData((prev) => ({ ...prev, loading: false }));
      }
    };
    fetchProgramData();
  }, []);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-700 bg-gray-900 text-gray-100 min-h-screen">
      <header className="flex justify-between items-end border-b border-gray-800 pb-6">
        <div>
          <h2 className="text-3xl font-black text-yellow-500 tracking-tight uppercase">
            Program & Seat Intelligence
          </h2>
          <p className="text-gray-400 font-medium">
            Real-Time Intake & Discipline Analytics
          </p>
        </div>
      </header>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
            Total Standalone Courses
          </p>
          <p className="text-3xl font-black text-yellow-500">
            {data.loading ? "..." : data.courses.length}
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
            Global Intake Capacity
          </p>
          <p className="text-3xl font-black text-gray-100">
            {data.loading ? "..." : data.intakeCapacity.toLocaleString()}
          </p>
          <p className="text-[10px] text-gray-600 mt-2 uppercase font-bold tracking-tighter text-right">
            Aggregated from Universities
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
            High-Demand Index
          </p>
          <p className="text-3xl font-black text-green-500">84%</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
            Active Disciplines
          </p>
          <p className="text-3xl font-black text-blue-500">12+</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Discipline Chart Logic */}
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl">
          <h3 className="font-black text-gray-100 uppercase text-sm tracking-tighter mb-6 flex items-center gap-2">
            <FiPieChart className="text-yellow-500" /> Discipline Distribution
          </h3>
          <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center border border-gray-700">
            {/* Dynamic Bar visualization */}
            <div className="flex gap-6 items-end h-32">
              {Object.entries(data.levelDistribution).map(([label, val]) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 bg-yellow-500 rounded-t-lg transition-all"
                    style={{ height: `${Math.min(val * 20, 100)}%` }}
                  ></div>
                  <span className="text-[10px] font-black text-gray-500">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl">
          <h3 className="font-black text-gray-100 uppercase text-sm tracking-tighter mb-4 flex items-center gap-2">
            <FiBook className="text-yellow-500" /> Real-Time Course Registry
          </h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {data.courses.slice(0, 10).map((c, i) => (
              <div
                key={i}
                className="p-3 bg-gray-900 border border-gray-700 rounded-xl flex justify-between items-center"
              >
                <span className="text-sm font-bold text-gray-200">
                  {c.courseTitle}
                </span>
                <span className="text-[10px] font-black text-yellow-500 bg-gray-800 px-2 py-1 rounded border border-gray-700">
                  {c.level || "UG"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramIntelligence;
