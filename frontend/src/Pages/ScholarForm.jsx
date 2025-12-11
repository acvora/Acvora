// src/Pages/ScholarForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ScholarForm.css"; // Import the separate CSS file

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

      // POST to backend. If API_URL already includes /api, this becomes /api/adminscholar
      const res = await axios.post(`${API_URL}/adminscholar`, payload, {
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
    <div className="scholar-form-container">
      <div className="scholar-form-card">
        <div className="scholar-form-header">
          <h1 className="scholar-form-title">Add New Scholarship</h1>
          <p className="scholar-form-subtitle">Fill in the details to create a new opportunity</p>
        </div>

        {error && (
          <div className="error-message">
            <svg className="error-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="scholar-form-grid">
          {/* Scholarship Name */}
          <div className="form-field">
            <label className="field-label">Scholarship Name <span className="required">*</span></label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="field-input"
              placeholder="e.g., National Merit Scholarship"
            />
          </div>

          {/* Provider */}
          <div className="form-field">
            <label className="field-label">Provider <span className="required">*</span></label>
            <input
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              required
              className="field-input"
              placeholder="e.g., Government of India"
            />
          </div>

          {/* Scholarship Type */}
          <div className="form-field">
            <label className="field-label">Scholarship Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className="field-select">
              <option value="">Select Type</option>
              {types.map((l, i) => (
                <option key={i} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="form-field">
            <label className="field-label">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="field-select">
              <option value="">Select Category</option>
              {categories.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* General Quota */}
          <div className="form-field">
            <label className="field-label">General Quota</label>
            <select name="generalQuota" value={formData.generalQuota} onChange={handleChange} className="field-select">
              <option value="">Select</option>
              {quotas.map((q, i) => (
                <option key={i} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          {/* State/Region */}
          <div className="form-field">
            <label className="field-label">State/Region</label>
            <select name="region" value={formData.region} onChange={handleChange} className="field-select">
              <option value="">Select Region</option>
              {regions.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Family Income Limit */}
          <div className="form-field">
            <label className="field-label">Family Income Limit</label>
            <select name="income" value={formData.income} onChange={handleChange} className="field-select">
              <option value="">Select Income</option>
              {incomes.map((inc, idx) => (
                <option key={idx} value={inc}>
                  {inc}
                </option>
              ))}
            </select>
          </div>

          {/* Education Level */}
          <div className="form-field">
            <label className="field-label">Education Level</label>
            <select name="educationLevel" value={formData.educationLevel} onChange={handleChange} className="field-select">
              <option value="">Select Level</option>
              {levels.map((l, i) => (
                <option key={i} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          {/* Benefits */}
          <div className="form-field">
            <label className="field-label">Benefits</label>
            <select name="benefits" value={formData.benefits} onChange={handleChange} className="field-select">
              <option value="">Select Benefits</option>
              {benefits.map((b, i) => (
                <option key={i} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Deadline */}
          <div className="form-field">
            <label className="field-label">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="field-input"
            />
          </div>

          {/* Status */}
          <div className="form-field">
            <label className="field-label">Status <span className="required">*</span></label>
            <select name="status" value={formData.status} onChange={handleChange} className="field-select">
              <option value="">Select Status</option>
              {statuses.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="form-field full-width">
            <label className="field-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a detailed description of the scholarship..."
              rows="4"
              className="field-textarea"
            />
          </div>

          {/* Eligibility */}
          <div className="form-field full-width">
            <label className="field-label">Eligibility Criteria</label>
            <textarea
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              placeholder="Enter eligibility criteria (e.g., age limit, qualifications, documents required, etc.)"
              rows="4"
              className="field-textarea"
            />
          </div>

          {/* Submit Button */}
          <div className="form-field full-width submit-button-container">
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? (
                <>
                  <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Scholarship
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}