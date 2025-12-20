import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, DollarSign, GraduationCap, Briefcase, Award, Globe, HelpCircle, ExternalLink, Target, Users, MapPin } from "lucide-react";
import "./CourseRegister.css";

export default function CourseRegister() {
  const [specializations, setSpecializations] = useState([
    { name: "", image: null, imagePreview: "", description: "" },
  ]);
  const [topInstituteImages, setTopInstituteImages] = useState([]);
  const [formData, setFormData] = useState({
    courseTitle: "",
    shortName: "",
    description: "",
    duration: "",
    fees: "",
    mode: "",
    level: "",
    highlights: "",
    internship: "",
    placement: "",
    eligibility: "",
    admissionProcess: "",
    curriculum: "",
    topInstitutes: "",
    careerRoles: "",
    scholarships: "",
    abroadOptions: "",
    faqs: "",
    applyLink: "",
  });

  // === form handlers ===
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Specialization handlers
  const addSpecialization = () => {
    setSpecializations((prev) => [
      ...prev,
      { name: "", image: null, imagePreview: "", description: "" },
    ]);
  };

  const removeSpecialization = (index) => {
    setSpecializations((prev) => {
      const removed = prev[index];
      // revoke preview URL if present
      if (removed?.imagePreview) URL.revokeObjectURL(removed.imagePreview);
      const next = prev.filter((_, i) => i !== index);
      return next.length ? next : [{ name: "", image: null, imagePreview: "", description: "" }];
    });
  };

  const handleSpecializationNameChange = (index, value) => {
    setSpecializations((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], name: value };
      return copy;
    });
  };

  const handleSpecializationDescChange = (index, value) => {
    setSpecializations((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], description: value };
      return copy;
    });
  };

  const handleSpecializationFileChange = (index, file) => {
    if (!file) return;
    setSpecializations((prev) => {
      const copy = [...prev];
      // revoke previous preview if any
      if (copy[index]?.imagePreview) URL.revokeObjectURL(copy[index].imagePreview);
      const preview = URL.createObjectURL(file);
      copy[index] = { ...copy[index], image: file, imagePreview: preview };
      return copy;
    });
  };

  // Top institute images (kept similar to your original)
  const handleTopInstituteFileChange = (e) => {
    const files = Array.from(e.target.files).map((f) => ({ file: f, description: "" }));
    setTopInstituteImages(files);
  };

  const handleTopInstituteDescChange = (index, value) => {
    setTopInstituteImages((prev) => {
      const copy = [...prev];
      copy[index].description = value;
      return copy;
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // Append text fields
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));

      // Append specializations (names + images + descriptions)
      specializations.forEach((spec, i) => {
        // Names (array)
        data.append("specializationNames[]", spec.name || "");

        // Images
        if (spec.image) data.append("specializationImages", spec.image);

        // Image descriptions
        data.append("specializationDescriptions[]", spec.description || "");
      });

      // Append top institute images + descriptions
      topInstituteImages.forEach((item) => {
        data.append("topInstituteImages", item.file);
        data.append("topInstituteDescriptions[]", item.description);
      });

      const res = await fetch("https://acvora-07fo.onrender.com/api/courses", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to save course");

      const responseData = await res.json();
      console.log("✅ Course saved:", responseData);
      alert("✅ Course registered successfully!");

      // Optional: reset form after success
      setFormData({
        courseTitle: "",
        shortName: "",
        description: "",
        duration: "",
        fees: "",
        mode: "",
        level: "",
        highlights: "",
        internship: "",
        placement: "",
        eligibility: "",
        admissionProcess: "",
        curriculum: "",
        topInstitutes: "",
        careerRoles: "",
        scholarships: "",
        abroadOptions: "",
        faqs: "",
        applyLink: "",
      });

      // clean up specializations previews
      specializations.forEach((s) => s.imagePreview && URL.revokeObjectURL(s.imagePreview));
      setSpecializations([{ name: "", image: null, imagePreview: "", description: "" }]);
      setTopInstituteImages([]);
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Something went wrong while saving the course!");
    }
  };

  // Revoke object URLs on unmount
  useEffect(() => {
    return () => {
      specializations.forEach((s) => s.imagePreview && URL.revokeObjectURL(s.imagePreview));
      topInstituteImages.forEach((t) => t.preview && URL.revokeObjectURL(t.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="course-register-page">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">
              Register a New Course
            </h1>
            <div className="w-50 h-1 bg-gradient-to-r from-slate-600 to-indigo-600 mx-auto mt-2 rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-slate-600 w-7 h-7" />
                <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-slate-400 inline-block">
                  Basic Info
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="block mb-2 font-medium text-gray-700">Course Title</label>
                  <input
                    type="text"
                    name="courseTitle"
                    placeholder="e.g. Business Administration (BBA)"
                    value={formData.courseTitle}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
                  />
                </div>

                <div className="form-group">
                  <label className="block mb-2 font-medium text-gray-700">Short Name</label>
                  <input
                    type="text"
                    name="shortName"
                    placeholder="e.g. BBA"
                    value={formData.shortName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="block mb-2 font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  placeholder="Brief overview of the course"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-slate-400 focus:border-transparent transition resize-none"
                />
              </div>
            </motion.div>

            {/* Key Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-emerald-600 w-7 h-7" />
                <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-emerald-400 inline-block">
                  Key Details
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="form-group">
                  <label className="block mb-2 font-medium text-gray-700">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    placeholder="e.g. 3 years"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                  />
                </div>

                <div className="form-group">
                  <label className="block mb-2 font-medium text-gray-700">Fees (Avg per year)</label>
                  <input
                    type="text"
                    name="fees"
                    placeholder="e.g. ₹1.5–4 Lakh/year"
                    value={formData.fees}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                  />
                </div>

                <div className="form-group">
                  <label className="block mb-2 font-medium text-gray-700">Mode</label>
                  <input
                    type="text"
                    name="mode"
                    placeholder="e.g. Full-time"
                    value={formData.mode}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="form-group">
                  <label className="block mb-2 font-medium text-gray-700">Level</label>
                  <input
                    type="text"
                    name="level"
                    placeholder="e.g. Undergraduate"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                  />
                </div>

                <div className="form-group">
                  <label className="block mb-2 font-medium text-gray-700">Key Highlights</label>
                  <textarea
                    name="highlights"
                    placeholder="Enter highlights separated by commas"
                    value={formData.highlights}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition resize-none"
                  />
                </div>
              </div>
            </motion.div>

            {/* Internship & Placement */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="text-indigo-600 w-7 h-7" />
                <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-indigo-400 inline-block">
                  Internship & Placement
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="block mb-2 font-medium text-gray-700">Internship</label>
                  <input
                    type="text"
                    name="internship"
                    placeholder="e.g. 8–12 weeks"
                    value={formData.internship}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                  />
                </div>

                <div className="form-group">
                  <label className="block mb-2 font-medium text-gray-700">Placement</label>
                  <input
                    type="text"
                    name="placement"
                    placeholder="e.g. Placement assistance available"
                    value={formData.placement}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                  />
                </div>
              </div>
            </motion.div>

            {/* Specializations */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="text-purple-600 w-7 h-7" />
                <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-purple-400 inline-block">
                  Specializations
                </h2>
              </div>

              {specializations.map((spec, idx) => (
                <div key={idx} className="specialization-row mb-4">
                  <div className="spec-controls">
                    <input
                      type="text"
                      placeholder="Specialization name (e.g. Finance)"
                      value={spec.name}
                      onChange={(e) => handleSpecializationNameChange(idx, e.target.value)}
                      required={idx === 0}
                      className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                    />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSpecializationFileChange(idx, e.target.files?.[0] || null)}
                      className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                    />

                    {spec.imagePreview && (
                      <div className="spec-preview mb-3">
                        <img src={spec.imagePreview} alt={`spec-${idx}`} style={{ maxWidth: 150, maxHeight: 90 }} />
                      </div>
                    )}

                    <input
                      type="text"
                      placeholder="Image description (optional)"
                      value={spec.description}
                      onChange={(e) => handleSpecializationDescChange(idx, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                    />

                    <div className="spec-actions">
                      <button type="button" onClick={() => removeSpecialization(idx)} className="spec-remove px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button type="button" onClick={addSpecialization} className="spec-add px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                + Add more specialization
              </button>
            </motion.div>

            {/* Eligibility & Admission */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-emerald-600 w-7 h-7" />
                <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-emerald-400 inline-block">
                  Eligibility & Admission
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="block mb-2 font-medium text-gray-700">Eligibility</label>
                  <textarea
                    name="eligibility"
                    placeholder="Eligibility criteria"
                    value={formData.eligibility}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition resize-none"
                  />
                </div>

                <div className="form-group">
                  <label className="block mb-2 font-medium text-gray-700">Admission Process</label>
                  <textarea
                    name="admissionProcess"
                    placeholder="Steps for admission"
                    value={formData.admissionProcess}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition resize-none"
                  />
                </div>
              </div>
            </motion.div>

            {/* Curriculum */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-slate-600 w-7 h-7" />
                <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-slate-400 inline-block">
                  Curriculum Snapshot
                </h2>
              </div>
              <div className="form-group">
                <label className="block mb-2 font-medium text-gray-700">Curriculum</label>
                <textarea
                  name="curriculum"
                  placeholder="Year-wise curriculum details"
                  value={formData.curriculum}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-slate-400 focus:border-transparent transition resize-none"
                />
              </div>
            </motion.div>

            {/* Top Institutes */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <Users className="text-indigo-600 w-7 h-7" />
                <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-indigo-400 inline-block">
                  Top Institutes
                </h2>
              </div>
              <div className="form-group">
                <label className="block mb-2 font-medium text-gray-700">Top Institutes</label>
                <textarea
                  name="topInstitutes"
                  placeholder="Colleges/universities offering this course"
                  value={formData.topInstitutes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition resize-none"
                />
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={handleTopInstituteFileChange}
                  className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                />
                {topInstituteImages.length > 0 &&
                  topInstituteImages.map((item, idx) => (
                    <div key={idx} className="top-institute-row mb-3 p-3 border border-gray-200 rounded-lg">
                      {item?.file && <p className="text-sm text-gray-600 mb-2">{item.file.name}</p>}
                      <input
                        type="text"
                        placeholder="Institute description (optional)"
                        value={item?.description || ""}
                        onChange={(e) => handleTopInstituteDescChange(idx, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                      />
                    </div>
                  ))}
              </div>
            </motion.div>

            {/* Career Opportunities */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="text-purple-600 w-7 h-7" />
                <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-purple-400 inline-block">
                  Career Opportunities
                </h2>
              </div>
              <div className="form-group">
                <label className="block mb-2 font-medium text-gray-700">Career Roles</label>
                <textarea
                  name="careerRoles"
                  placeholder="Popular roles after graduation"
                  value={formData.careerRoles}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition resize-none"
                />
              </div>
            </motion.div>

            {/* Scholarships & Abroad */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-emerald-600 w-7 h-7" />
                <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-emerald-400 inline-block">
                  Scholarships & Abroad Options
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="block mb-2 font-medium text-gray-700">Scholarships</label>
                  <textarea
                    name="scholarships"
                    placeholder="Scholarship & financial aid options"
                    value={formData.scholarships}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition resize-none"
                  />
                </div>

                <div className="form-group">
                  <label className="block mb-2 font-medium text-gray-700">Study Abroad & Exchange</label>
                  <textarea
                    name="abroadOptions"
                    placeholder="Global exposure opportunities"
                    value={formData.abroadOptions}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition resize-none"
                  />
                </div>
              </div>
            </motion.div>

            {/* FAQs & Apply Link */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="text-indigo-600 w-7 h-7" />
                <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-indigo-400 inline-block">
                  FAQs & Apply Link
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="block mb-2 font-medium text-gray-700">FAQs</label>
                  <textarea 
                    name="faqs" 
                    placeholder="Common student queries" 
                    value={formData.faqs} 
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition resize-none"
                  />
                </div>

                <div className="form-group">
                  <label className="block mb-2 font-medium text-gray-700">Apply Link</label>
                  <input
                    type="url"
                    name="applyLink"
                    placeholder="https://example.com/apply"
                    value={formData.applyLink}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                  />
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button 
                type="submit" 
                className="px-8 py-3 bg-gradient-to-r from-slate-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-slate-700 hover:to-indigo-700"
              >
                Submit
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}