// src/Pages/ScholarForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * API_URL resolution (CRA-safe)
 * Use REACT_APP_API_URL if present, otherwise fallback to your Render URL
 */
const API_URL =
  (typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_API_URL) ||
  "https://acvora-07fo.onrender.com/api";

export default function ScholarForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // universityId: "", // optional: uncomment if you need to attach a university id
    name: "",
    provider: "",
    category: "",
    income: "",
    educationLevel: "",
    benefits: "",
    deadline: "",
    status: "",
    description: "",
    eligibility: "",
    type: "",
    region: "",
    generalQuota: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  // Validate before sending
  const validate = () => {
    if (!formData.name.trim()) return "Scholarship name is required";
    if (!formData.provider.trim()) return "Provider is required";
    if (!formData.status) return "Please choose a status";
    return null;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) return setError(validationError);

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Auto-generate tags
      const tags = [];
      if (formData.category) tags.push(formData.category);
      if (formData.income) tags.push(formData.income);
      if (formData.educationLevel) tags.push(formData.educationLevel);

      const payload = { ...formData, tags };

      // POST to backend. If API_URL already includes /api, this becomes /api/scholarships
      const res = await axios.post(`${API_URL}/scholarships`, payload, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      alert(res?.data?.message || "✅ Scholarship added successfully!");

      // Reset form
      setFormData({
        // universityId: "",
        name: "",
        provider: "",
        category: "",
        income: "",
        educationLevel: "",
        benefits: "",
        deadline: "",
        status: "",
        description: "",
        eligibility: "",
        type: "",
        region: "",
        generalQuota: "",
      });

      // Optionally redirect to scholarships list
      // navigate("/scholarships");
    } catch (err) {
      console.error("Axios error:", err);
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Failed to save scholarship";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Dropdown Options
  const categories = ["SC/ST", "SC", "ST", "OBC", "General", "Minority", "ALL"];
  const incomes = ["<1.5L", "3L to 4L", "5L to 6L", "7L to 8L"];
  const levels = [
    "10th Pass",
    "12th Pass",
    "UG",
    "PG",
    "UG/PG",
    "PhD",
    "10th & 12th",
  ];
  const benefits = [
    "TWF",
    "₹50,000 / year",
    "₹35,000 / year to ₹45,000 / year",
    "₹20,000 / year to ₹30,000 / year",
    "₹10,000 / year",
    "<=₹10,000 / year",
  ];
  const statuses = ["Open", "Upcoming", "Closed"];
  const types = ["Merit", "Need", "Government", "Private"];
  const regions = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];
  const quotas = ["Yes", "No"];

  return (
    <div className="bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Add Scholarship
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 p-3 rounded">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Scholarship Name */}
          <div className="flex flex-col">
            <label className="text-left font-medium text-gray-900 mb-1">
              Scholarship Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {/* Provider */}
          <div className="flex flex-col">
            <label className="text-left font-medium text-gray-900 mb-1">
              Provider
            </label>
            <input
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              required
              className="border border-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {/* Scholarship Type */}
          <div className="flex flex-col">
            <label className="text-left font-medium text-gray-900 mb-1">
              Scholarship Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border border-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option value="">Select</option>
              {types.map((l, i) => (
                <option key={i} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="text-left font-medium text-gray-900 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option value="">Select</option>
              {categories.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* General Quota */}
          <div className="flex flex-col">
            <label className="text-left font-medium text-gray-900 mb-1">
              General Quota
            </label>
            <select
              name="generalQuota"
              value={formData.generalQuota}
              onChange={handleChange}
              className="border border-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option value="">Select</option>
              {quotas.map((q, i) => (
                <option key={i} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          {/* State/Region */}
          <div className="flex flex-col">
            <label className="text-left font-medium text-gray-900 mb-1">
              State/Region
            </label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="border border-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option value="">Select</option>
              {regions.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Family Income Limit */}
          <div className="flex flex-col">
            <label className="text-left font-medium text-gray-900 mb-1">
              Family Income Limit
            </label>
            <select
              name="income"
              value={formData.income}
              onChange={handleChange}
              className="border border-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option value="">Select</option>
              {incomes.map((inc, idx) => (
                <option key={idx} value={inc}>
                  {inc}
                </option>
              ))}
            </select>
          </div>

          {/* Education Level */}
          <div className="flex flex-col">
            <label className="text-left font-medium text-gray-900 mb-1">
              Education Level
            </label>
            <select
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              className="border border-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option value="">Select</option>
              {levels.map((l, i) => (
                <option key={i} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          {/* Benefits */}
          <div className="flex flex-col">
            <label className="text-left font-medium text-gray-900 mb-1">
              Benefits
            </label>
            <select
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              className="border border-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option value="">Select</option>
              {benefits.map((b, i) => (
                <option key={i} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Deadline */}
          <div className="flex flex-col">
            <label className="text-left font-medium text-gray-900 mb-1">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="border border-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-left font-medium text-gray-900 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option value="">Select</option>
              {statuses.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-3 flex flex-col">
            <label className="text-left font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide the detailed description..."
              rows="4"
              className="border border-gray-400 rounded-lg px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-yellow-500 hover:border-yellow-500 transition w-full"
            />
          </div>

          {/* Eligibility */}
          <div className="md:col-span-3 flex flex-col">
            <label className="text-left font-medium text-gray-900 mb-1">
              Eligibility
            </label>
            <textarea
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              placeholder="Enter eligibility criteria (e.g., age limit, qualifications, etc.)"
              rows="4"
              className="border border-gray-400 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-yellow-500 hover:border-yellow-500 outline-none resize-none transition w-full"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg shadow hover:bg-yellow-500 transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Add Scholarship"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}