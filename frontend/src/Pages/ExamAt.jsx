import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, FileSearch, Bell } from "lucide-react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./ExamAt.css";

export default function ExamAt() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "https://acvora-07fo.onrender.com/api/exams",
        formData
      );
      alert("✅ Exam data saved successfully!");
      console.log("Saved exam:", res.data);

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
    <>
      <Navbar />

      <div className="exam-page">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="exam-card"
        >
          {/* Header */}
          <div className="exam-header">
            <h1>Exam Alerts & Notifications</h1>
            <div className="divider"></div>
          </div>

          {/* Upcoming Exams */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="exam-section"
          >
            <div className="exam-section-header">
              <Calendar />
              <h2>Upcoming Exams</h2>
            </div>

            <label>Exam Name</label>
            <input
              type="text"
              name="examName"
              value={formData.examName}
              onChange={handleChange}
              placeholder="Enter exam name"
            />

            <label>Exam Date</label>
            <input
              type="date"
              name="examDate"
              value={formData.examDate}
              onChange={handleChange}
            />

            <label>Syllabus Link</label>
            <input
              type="url"
              name="syllabusLink"
              value={formData.syllabusLink}
              onChange={handleChange}
              placeholder="Enter syllabus URL"
            />

            <label>Application Deadline</label>
            <input
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleChange}
            />
          </motion.div>

          {/* Result Announcements */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="exam-section"
          >
            <div className="exam-section-header">
              <FileSearch />
              <h2>Result Announcements</h2>
            </div>

            <label>Exam Name</label>
            <input
              type="text"
              name="resultExamName"
              value={formData.resultExamName}
              onChange={handleChange}
            />

            <label>Result Date</label>
            <input
              type="date"
              name="resultDate"
              value={formData.resultDate}
              onChange={handleChange}
            />

            <label>Result Link</label>
            <input
              type="url"
              name="resultLink"
              value={formData.resultLink}
              onChange={handleChange}
            />
          </motion.div>

          {/* Platform Notifications */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="exam-section"
          >
            <div className="exam-section-header">
              <Bell />
              <h2>Platform Notifications</h2>
            </div>

            <label>Notification Type</label>
            <select
              name="notificationType"
              value={formData.notificationType}
              onChange={handleChange}
            >
              <option value="">-- Select --</option>
              <option>New Message</option>
              <option>Profile View</option>
              <option>Scholarship Update</option>
            </select>

            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter notification message"
            />
          </motion.div>

          {/* Submit */}
          <div className="exam-actions">
            <button onClick={handleSubmit} className="exam-submit-btn">
              Save / Submit
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
