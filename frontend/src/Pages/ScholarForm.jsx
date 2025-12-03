// src/Pages/ScholarForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Direct API base (no import.meta usage)
const API = "https://acvora-07fo.onrender.com";

export default function ScholarForm() {
  const navigate = useNavigate(); // Fixed casing (was Navigate)

  const [formData, setFormData] = useState({
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
  const [success, setSuccess] = useState(""); // New: For inline success message

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!formData.name.trim()) return "Scholarship name is required";
    if (!formData.provider.trim()) return "Provider is required";
    if (!formData.category) return "Category is required"; // Added: More validation
    if (!formData.deadline || new Date(formData.deadline) < new Date()) {
      return "Deadline must be a future date"; // Added: Basic date check
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(""); // Reset success
    const validationError = validate();
    if (validationError) return setError(validationError);

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Improved: Auto-generate tags with better formatting
      const tags = [];
      if (formData.category) tags.push(formData.category);
      if (formData.income) tags.push(`Income ${formData.income}`); // Fixed: Cleaner string
      if (formData.educationLevel) tags.push(formData.educationLevel);
      if (formData.type) tags.push(formData.type); // Added: Include type for better search

      const payload = { ...formData, tags };

      // POST to admin-scholarships (matches server controller)
      const res = await axios.post(`${API}/api/admin-scholarships`, payload, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      setSuccess(res.data.message || "✅ Admin Scholarship added successfully!"); // Inline success

      // Reset form
      setFormData({
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

      // Optional navigation (uncomment if needed)
      // navigate("/admin/scholarships");

    } catch (err) {
      console.error("Axios error:", err);
      setError(
        err.response?.data?.error || err.message || "Failed to save admin scholarship"
      );
    } finally {
      setLoading(false);
    }
  };

  const categories = ["SC/ST", "SC", "ST", "OBC", "General", "Minority", "ALL"];
  const incomes = ["<1.5L", "3L to 4L", "5L to 6L", "7L to 8L"]; // Fixed: Added space
  const levels = ["10th Pass", "12th Pass", "UG", "PG", "UG/PG", "PhD", "10th & 12th"];
  const benefits = ["TWF", "₹50,000 / year", "₹35,000 / year to ₹45,000 / year", "₹20,000 / year to ₹30,000 / year", "₹10,000 / year", "<=₹10,000 / year"];
  const statuses = ["Open", "Upcoming", "Closed"];
  const types = ["Merit", "Need", "Government", "Private"];
  const regions = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh",
    "Lakshadweep", "Puducherry"
  ];
  const quotas = ["Yes", "No"];

  return (
    <div className="bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-8"> {/* Added: max-width for better scaling */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6"> {/* Increased mb for spacing */}
          Add Admin Scholarship
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 p-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 text-sm text-green-700 bg-green-100 p-3 rounded-lg border border-green-200">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Scholarship Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-left font-medium text-gray-900 mb-1"> {/* Added: htmlFor */}
              Scholarship Name
              <span className="text-red-500">*</span> {/* Visual required indicator */}
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-required="true" // Added: Accessibility
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" // Improved: Focus styles
            />
          </div>

          {/* Provider */}
          <div className="flex flex-col">
            <label htmlFor="provider" className="text-left font-medium text-gray-900 mb-1">
              Provider
              <span className="text-red-500">*</span>
            </label>
            <input
              id="provider"
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              required
              aria-required="true"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Type */}
          <div className="flex flex-col">
            <label htmlFor="type" className="text-left font-medium text-gray-900 mb-1">
              Scholarship Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Scholarship Type" // Added: ARIA
            >
              <option value="">Select</option>
              {types.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Category - Similar pattern for all fields; abbreviated for brevity */}
          <div className="flex flex-col">
            <label htmlFor="category" className="text-left font-medium text-gray-900 mb-1">
              Category
              <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required // Added: Enforce via attr
              aria-required="true"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              {categories.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* General Quota */}
          <div className="flex flex-col">
            <label htmlFor="generalQuota" className="text-left font-medium text-gray-900 mb-1">
              General Quota
            </label>
            <select
              id="generalQuota"
              name="generalQuota"
              value={formData.generalQuota}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              {quotas.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Region */}
          <div className="flex flex-col">
            <label htmlFor="region" className="text-left font-medium text-gray-900 mb-1">
              State/Region
            </label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              {regions.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Income */}
          <div className="flex flex-col">
            <label htmlFor="income" className="text-left font-medium text-gray-900 mb-1">
              Family Income Limit
            </label>
            <select
              id="income"
              name="income"
              value={formData.income}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              {incomes.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Education Level */}
          <div className="flex flex-col">
            <label htmlFor="educationLevel" className="text-left font-medium text-gray-900 mb-1">
              Education Level
            </label>
            <select
              id="educationLevel"
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              {levels.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Benefits */}
          <div className="flex flex-col">
            <label htmlFor="benefits" className="text-left font-medium text-gray-900 mb-1">
              Benefits
            </label>
            <select
              id="benefits"
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              {benefits.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Deadline */}
          <div className="flex flex-col">
            <label htmlFor="deadline" className="text-left font-medium text-gray-900 mb-1">
              Deadline
              <span className="text-red-500">*</span>
            </label>
            <input
              id="deadline"
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              aria-required="true"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label htmlFor="status" className="text-left font-medium text-gray-900 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              {statuses.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-3 flex flex-col">
            <label htmlFor="description" className="text-left font-medium text-gray-900 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
            ></textarea>
          </div>

          {/* Eligibility */}
          <div className="md:col-span-3 flex flex-col">
            <label htmlFor="eligibility" className="text-left font-medium text-gray-900 mb-1">
              Eligibility
            </label>
            <textarea
              id="eligibility"
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              rows="4"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
            ></textarea>
          </div>

          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed" // Improved: Consistent blue theme, cursor
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"> {/* Simple spinner */}
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </span>
              ) : (
                "Add Admin Scholarship"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}