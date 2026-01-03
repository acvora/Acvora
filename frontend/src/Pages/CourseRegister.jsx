// src/Pages/CourseRegister.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CourseRegister.css";

/**
 * API_URL resolution (CRA-safe)
 * Use REACT_APP_API_URL if present, otherwise fallback to your Render URL
 */
const API_URL =
  (typeof process !== "undefined" &&
  process.env &&
  process.env.REACT_APP_API_URL) ||
  "https://acvora-07fo.onrender.com/api";

export default function CourseRegister() {
  const navigate = useNavigate();
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

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-scroll to top when step changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  // Step titles
  const stepTitles = {
    1: "Basic & Key Details",
    2: "Academic Structure",
    3: "Career & Final",
  };

  // Required fields per step (simplified; adjust as needed)
  const requiredPerStep = {
    1: ["courseTitle", "shortName", "description", "duration", "fees"],
    2: ["eligibility", "curriculum", "topInstitutes"],
    3: ["careerRoles", "applyLink"],
  };

  // Validate current step
  const validateStep = (step) => {
    const req = requiredPerStep[step] || [];
    for (let field of req) {
      let val = formData[field];
      if (Array.isArray(val)) {
        val = val.length > 0;
      } else {
        val = !!val && val.trim() !== "";
      }
      if (!val) return false;
    }
    // For step 2, ensure at least one specialization
    if (step === 2 && specializations.length === 1 && !specializations[0].name) {
      return false;
    }
    return true;
  };

  // Go to step (with validation for forward)
  const goToStep = (next) => {
    if (next > currentStep) {
      if (!validateStep(currentStep)) {
        setError("Please complete all required fields in this step before proceeding!");
        return;
      }
    }
    setError("");
    setCurrentStep(next);
  };

  // Handle single input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({
      ...s,
      [name]: value,
    }));
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
      if (copy[index]?.imagePreview) URL.revokeObjectURL(copy[index].imagePreview);
      const preview = URL.createObjectURL(file);
      copy[index] = { ...copy[index], image: file, imagePreview: preview };
      return copy;
    });
  };

  // Top institute images
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

  // Basic overall validate
  const validate = () => {
    if (!formData.courseTitle.trim()) return "Course title is required";
    if (!formData.shortName.trim()) return "Short name is required";
    return null;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate current (last) step
    if (!validateStep(3)) {
      setError("Please complete all required fields in this step!");
      return;
    }

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      // Append text fields
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));

      // Append specializations
      specializations.forEach((spec, i) => {
        data.append("specializationNames[]", spec.name || "");
        if (spec.image) data.append("specializationImages", spec.image);
        data.append("specializationDescriptions[]", spec.description || "");
      });

      // Append top institute images + descriptions
      topInstituteImages.forEach((item) => {
        data.append("topInstituteImages", item.file);
        data.append("topInstituteDescriptions[]", item.description);
      });

      const res = await fetch(`${API_URL}/courses`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to save course");

      const responseData = await res.json();
      alert(responseData?.message || "✅ Course registered successfully!");

      // Reset form
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
      specializations.forEach((s) => s.imagePreview && URL.revokeObjectURL(s.imagePreview));
      setSpecializations([{ name: "", image: null, imagePreview: "", description: "" }]);
      setTopInstituteImages([]);
      setCurrentStep(1);
    } catch (err) {
      console.error("Error:", err);
      const msg = err?.response?.data?.error || err?.response?.data?.message || err?.message || "Failed to save course";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Revoke object URLs on unmount
  useEffect(() => {
    return () => {
      specializations.forEach((s) => s.imagePreview && URL.revokeObjectURL(s.imagePreview));
      topInstituteImages.forEach((t) => t.preview && URL.revokeObjectURL(t.preview));
    };
  }, [specializations, topInstituteImages]);

  // Render step content
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <div className="card">
              <h2 className="section-title">Basic & Key Details</h2>
              <div className="two-col">
                <div className="form-field">
                  <label className="field-label">
                    Course Title <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="courseTitle"
                    value={formData.courseTitle}
                    onChange={handleChange}
                    placeholder="e.g. Business Administration (BBA)"
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">
                    Short Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="shortName"
                    value={formData.shortName}
                    onChange={handleChange}
                    placeholder="e.g. BBA"
                    required
                  />
                </div>
              </div>
              <div className="form-field">
                <label className="field-label">
                  Description <span className="required">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Brief overview of the course"
                  required
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="form-field">
                  <label className="field-label">
                    Duration <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g. 3 years"
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">
                    Fees (Avg per year) <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    placeholder="e.g. ₹1.5–4 Lakh/year"
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">Mode</label>
                  <select
                    name="mode"
                    value={formData.mode}
                    onChange={handleChange}
                  >
                    <option value="">Select Mode</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Distance">Distance</option>
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="form-field">
                  <label className="field-label">Level</label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                  >
                    <option value="">Select Level</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Certificate">Certificate</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="field-label">Key Highlights</label>
                  <textarea
                    name="highlights"
                    value={formData.highlights}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter highlights separated by commas"
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="section-title">Internship & Placement</h2>
              <div className="two-col">
                <div className="form-field">
                  <label className="field-label">Internship</label>
                  <input
                    type="text"
                    name="internship"
                    value={formData.internship}
                    onChange={handleChange}
                    placeholder="e.g. 8–12 weeks"
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">Placement</label>
                  <input
                    type="text"
                    name="placement"
                    value={formData.placement}
                    onChange={handleChange}
                    placeholder="e.g. Placement assistance available"
                  />
                </div>
              </div>
            </div>

            <div className="btn-area">
              <button type="button" className="next-btn" onClick={() => goToStep(2)}>
                Next → Academic Structure
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <div className="card">
              <h2 className="section-title">Specializations</h2>
              {specializations.map((spec, idx) => (
                <div key={idx} className="specialization-row mb-4 p-3 border border-gray-200 rounded-lg">
                  <div className="form-field">
                    <label className="field-label">Specialization Name</label>
                    <input
                      type="text"
                      placeholder="Specialization name (e.g. Finance)"
                      value={spec.name}
                      onChange={(e) => handleSpecializationNameChange(idx, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3"
                    />
                  </div>
                  <div className="form-field">
                    <label className="field-label">Specialization Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSpecializationFileChange(idx, e.target.files?.[0] || null)}
                      className="w-full border border-gray-300 rounded-lg p-3"
                    />
                    {spec.imagePreview && (
                      <img src={spec.imagePreview} alt={`spec-${idx}`} style={{ maxWidth: 150, maxHeight: 90, marginTop: '0.5rem' }} />
                    )}
                  </div>
                  <div className="form-field">
                    <label className="field-label">Image Description (optional)</label>
                    <input
                      type="text"
                      placeholder="Image description (optional)"
                      value={spec.description}
                      onChange={(e) => handleSpecializationDescChange(idx, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3"
                    />
                  </div>
                  {specializations.length > 1 && (
                    <button type="button" onClick={() => removeSpecialization(idx)} className="spec-remove px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addSpecialization} className="spec-add px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                + Add more specialization
              </button>
            </div>

            <div className="card">
              <h2 className="section-title">Eligibility & Admission</h2>
              <div className="two-col">
                <div className="form-field">
                  <label className="field-label">
                    Eligibility <span className="required">*</span>
                  </label>
                  <textarea
                    name="eligibility"
                    placeholder="Eligibility criteria"
                    value={formData.eligibility}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">Admission Process</label>
                  <textarea
                    name="admissionProcess"
                    placeholder="Steps for admission"
                    value={formData.admissionProcess}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="section-title">Curriculum Snapshot</h2>
              <div className="form-field">
                <label className="field-label">
                  Curriculum <span className="required">*</span>
                </label>
                <textarea
                  name="curriculum"
                  placeholder="Year-wise curriculum details"
                  value={formData.curriculum}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>
            </div>

            <div className="card">
              <h2 className="section-title">Top Institutes</h2>
              <div className="form-field">
                <label className="field-label">
                  Top Institutes <span className="required">*</span>
                </label>
                <textarea
                  name="topInstitutes"
                  placeholder="Colleges/universities offering this course"
                  value={formData.topInstitutes}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </div>
              <div className="form-field">
                <label className="field-label">Top Institute Images (Multiple)</label>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={handleTopInstituteFileChange}
                  className="w-full border border-gray-300 rounded-lg p-3"
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
                        className="w-full border border-gray-300 rounded-lg p-3"
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div className="btn-area">
              <button type="button" className="prev-btn" onClick={() => goToStep(1)}>
                ← Previous
              </button>
              <button type="button" className="next-btn" onClick={() => goToStep(3)}>
                Next → Career & Final
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <div className="card">
              <h2 className="section-title">Career Opportunities</h2>
              <div className="form-field">
                <label className="field-label">
                  Career Roles <span className="required">*</span>
                </label>
                <textarea
                  name="careerRoles"
                  placeholder="Popular roles after graduation"
                  value={formData.careerRoles}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </div>
            </div>

            <div className="card">
              <h2 className="section-title">Scholarships & Abroad Options</h2>
              <div className="two-col">
                <div className="form-field">
                  <label className="field-label">Scholarships</label>
                  <textarea
                    name="scholarships"
                    placeholder="Scholarship & financial aid options"
                    value={formData.scholarships}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">Study Abroad & Exchange</label>
                  <textarea
                    name="abroadOptions"
                    placeholder="Global exposure opportunities"
                    value={formData.abroadOptions}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="section-title">FAQs & Apply Link</h2>
              <div className="two-col">
                <div className="form-field">
                  <label className="field-label">FAQs</label>
                  <textarea 
                    name="faqs" 
                    placeholder="Common student queries" 
                    value={formData.faqs} 
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">
                    Apply Link <span className="required">*</span>
                  </label>
                  <input
                    type="url"
                    name="applyLink"
                    placeholder="https://example.com/apply"
                    value={formData.applyLink}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="btn-area">
              <button type="button" className="prev-btn" onClick={() => goToStep(2)}>
                ← Previous
              </button>
              <button type="submit" className="submit-button" disabled={loading}>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Submit Course
                  </>
                )}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="course-form-container">
      <header className="course-form-header">
        <h1 className="course-form-title">Register a New Course</h1>
        <p className="course-form-subtitle">(Admin / Partner / Institute Side)</p>
      </header>

      <nav className="step-navigation">
        <div className="steps-container">
          {[1, 2, 3].map((step, index) => (
            <React.Fragment key={step}>
              <div
                className={`step-box ${step < currentStep ? "completed" : step === currentStep ? "active" : ""}`}
              >
                {stepTitles[step]}
              </div>
              {step < 3 && (
                <div className={`connector-line ${step < currentStep ? "progress" : ""}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </nav>

      {error && (
        <div className="error-message">
          <svg
            className="error-icon"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            ></path>
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {renderStep()}
      </form>
    </div>
  );
}