import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, FileSearch, Bell } from "lucide-react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function ExamAlertsNotifications() {
  const [formData, setFormData] = useState({
    examName: "",
    examDate: "",
    syllabusLink: "",
    applicationDeadline: "",
    resultExamName: "",
    resultDate: "",
    resultLink: "",
    notificationType: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form to backend
  const handleSubmit = async () => {
    try {
      const res = await axios.post("https://acvora-07fo.onrender.com/api/exams", formData);
      alert("✅ Exam data saved successfully!");
      console.log("Saved exam:", res.data);

      // reset form
      setFormData({
        examName: "",
        examDate: "",
        syllabusLink: "",
        applicationDeadline: "",
        resultExamName: "",
        resultDate: "",
        resultLink: "",
        notificationType: "",
        message: "",
      });
    } catch (err) {
      console.error("Error saving exam:", err);
      alert("❌ Error saving exam data");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">
              Exam Alerts & Notifications
            </h1>
            <div className="w-50 h-1 bg-gradient-to-r from-slate-600 to-indigo-600 mx-auto mt-2 rounded-full"></div>
          </div>

          {/* Upcoming Exams */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="text-slate-600 w-7 h-7" />
              <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-slate-400 inline-block">
                Upcoming Exams
              </h2>
            </div>

            <label className="block mb-2 font-medium text-gray-700">Exam Name</label>
            <input
              type="text"
              name="examName"
              value={formData.examName}
              onChange={handleChange}
              placeholder="Enter exam name"
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
            />

            <label className="block mb-2 font-medium text-gray-700">Exam Date</label>
            <input
              type="date"
              name="examDate"
              value={formData.examDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
            />

            <label className="block mb-2 font-medium text-gray-700">Syllabus Link</label>
            <input
              type="url"
              name="syllabusLink"
              value={formData.syllabusLink}
              onChange={handleChange}
              placeholder="Enter syllabus URL"
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
            />

            <label className="block mb-2 font-medium text-gray-700">Application Deadline</label>
            <input
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
            />
          </motion.div>

          {/* Result Announcements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <FileSearch className="text-emerald-600 w-7 h-7" />
              <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-emerald-400 inline-block">
                Result Announcements
              </h2>
            </div>

            <label className="block mb-2 font-medium text-gray-700">Exam Name</label>
            <input
              type="text"
              name="resultExamName"
              value={formData.resultExamName}
              onChange={handleChange}
              placeholder="Enter exam name"
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
            />

            <label className="block mb-2 font-medium text-gray-700">Result Date</label>
            <input
              type="date"
              name="resultDate"
              value={formData.resultDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
            />

            <label className="block mb-2 font-medium text-gray-700">Result Link</label>
            <input
              type="url"
              name="resultLink"
              value={formData.resultLink}
              onChange={handleChange}
              placeholder="Enter result URL"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
            />
          </motion.div>

          {/* Platform Notifications */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <Bell className="text-purple-600 w-7 h-7" />
              <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-purple-400 inline-block">
                Platform Notifications
              </h2>
            </div>

            <label className="block mb-2 font-medium text-gray-700">Notification Type</label>
            <select
              name="notificationType"
              value={formData.notificationType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
            >
              <option value="">-- Select --</option>
              <option>New Message</option>
              <option>Profile View</option>
              <option>Scholarship Update</option>
            </select>

            <label className="block mb-2 font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter notification message"
              rows="3"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition resize-none"
            />
          </motion.div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-gradient-to-r from-slate-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-slate-700 hover:to-indigo-700"
            >
              Save / Submit
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}