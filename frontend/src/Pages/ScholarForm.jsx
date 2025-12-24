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
    // 1. Basic Scholarship Information
    name: "",
    code: "", // Auto-generated on submit
    provider: "",
    providerType: "",
    country: "",
    region: "", // State
    website: "",

    // 2. Scholarship Category & Type
    educationLevel: "", // Scholarship Level
    type: [], // Multi-select: Scholarship Type
    coverageType: "",

    // 3. Eligible Courses & Fields of Study
    discipline: [], // Multi-select
    degreeType: [], // Multi-select
    modeOfStudy: [], // Multi-select

    // 4. Eligibility Criteria
    nationality: "",
    domicileReq: "",
    categoryEligibility: [], // Multi-select
    genderEligibility: "",
    disabilityEligibility: "",
    incomeLimitMin: "",
    incomeLimitMax: "",
    minAcademicQual: "",
    minMarksCGPA: "",
    gapYearAllowed: "",

    // 5. Age & Academic Limits
    minAge: "",
    maxAge: "",
    yearOfStudy: [], // Multi-select

    // 6. Scholarship Benefits
    tuitionCoverage: "",
    tuitionAmount: "",
    monthlyStipend: "",
    annualAllowance: "",
    hostelCoverage: "",
    booksAllowance: "",
    travelAllowance: "",
    examFeeCoverage: "", // Assuming Yes/No for simplicity; add amount if needed
    otherBenefits: "",

    // 7. Scholarship Duration
    durationType: "",
    totalDuration: "",
    renewalCriteria: "",

    // 8. Application Details
    applicationMode: "",
    applicationURL: "",
    startDate: "",
    endDate: "",
    deadlineTime: "",
    applicationFee: "",

    // 9. Required Documents
    documentsRequired: [], // Multi-select

    // 10. Selection Process
    selectionMethod: [], // Multi-select
    interviewMode: "",

    // 11. Disbursement Details
    disbursementMode: "",
    disbursementFrequency: "",

    // 12. Application Status Control
    status: "",
    visibility: "",
    featured: "",

    // 13. Tags & Search Optimization
    searchKeywords: "",
    popularTags: "",
    courseTags: "",
    locationTags: "",

    // 14. Compliance & Verification
    verifiedByAdmin: "",
    sourceVerified: "",
    // lastUpdated: auto

    // Legacy fields (merge where possible)
    benefits: "", // Keep for backward compat, or remove if not needed
    description: "",
    eligibility: "", // Merge into specific fields, keep for now
    generalQuota: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle Input Change for text/select/number/date
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  // Handle Checkbox Change for multi-select
  const handleCheckboxChange = (fieldName, value, checked) => {
    setFormData((prev) => {
      const current = prev[fieldName] || [];
      if (checked) {
        return { ...prev, [fieldName]: [...current, value] };
      } else {
        return { ...prev, [fieldName]: current.filter((v) => v !== value) };
      }
    });
  };

  // Validate before sending (expanded)
  const validate = () => {
    if (!formData.name.trim()) return "Scholarship name is required";
    if (!formData.provider.trim()) return "Provider is required";
    if (!formData.status) return "Please choose a status";
    // Add more validations as needed
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

      // Auto-generate tags (expanded)
      const tags = [];
      if (formData.categoryEligibility.length > 0) tags.push(...formData.categoryEligibility);
      if (formData.incomeLimitMax) tags.push(`Income<${formData.incomeLimitMax}`);
      if (formData.educationLevel) tags.push(formData.educationLevel);
      if (formData.discipline.length > 0) tags.push(...formData.discipline);
      // Add more auto-tags from fields

      const payload = { ...formData, tags };

      // POST to backend
      const res = await axios.post(`${API_URL}/adminscholar`, payload, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      // Auto-generate code if needed
      if (res.data.scholarshipCode) {
        setFormData((prev) => ({ ...prev, code: res.data.scholarshipCode }));
      }

      alert(res?.data?.message || "✅ Scholarship added successfully!");

      // Reset form (keep code if generated)
      const resetData = { ...formData, code: formData.code || "" };
      Object.keys(resetData).forEach((key) => {
        if (Array.isArray(resetData[key])) {
          resetData[key] = [];
        } else if (typeof resetData[key] === "string") {
          resetData[key] = "";
        }
      });
      setFormData(resetData);

      // Optionally redirect
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

  // Option Arrays (expanded)
  const providerTypes = ["Government", "Private Organization", "University / Institute", "NGO / Trust", "Corporate (CSR)", "International Body"];
  const levels = ["School", "Undergraduate (UG)", "Postgraduate (PG)", "Diploma", "PhD / Research", "Postdoctoral"];
  const types = ["Merit-based", "Need-based", "Category-based", "Minority-based", "Gender-based", "Disability-based", "Sports-based", "Talent-based", "Means-cum-Merit"];
  const coverageTypes = ["Fully Funded", "Partially Funded"];
  const disciplines = ["Engineering", "Medical", "Management", "Law", "Arts", "Science", "Commerce", "Agriculture", "Any Course"];
  const degreeTypes = ["Diploma", "UG", "PG", "PhD"];
  const modesOfStudy = ["Full-time", "Part-time", "Online", "Offline"];
  const categoryEligs = ["General", "SC", "ST", "OBC", "EWS", "Minority"];
  const genders = ["Male", "Female", "Other", "All"];
  const yesNo = ["Yes", "No"];
  const yearsOfStudy = ["1st Year", "2nd Year", "Final Year", "Any Year"];
  const durationTypes = ["One-time", "Annual (Renewable)"];
  const applicationModes = ["Online", "Offline", "Both"];
  const documents = ["Aadhaar / Passport", "Income Certificate", "Caste / Category Certificate", "Domicile Certificate", "Academic Mark Sheets", "Bonafide Certificate", "Admission Proof", "Bank Account Details", "Disability Certificate", "Recommendation Letter", "Statement of Purpose (SOP)"];
  const selectionMethods = ["Merit-based", "Interview", "Written Test", "Document Verification", "Combination"];
  const interviewModes = ["Online", "Offline"];
  const disbursementModes = ["Direct Bank Transfer (DBT)", "Institute Transfer"];
  const frequencies = ["Monthly", "Quarterly", "Annual", "One-time"];
  const statuses = ["Draft", "Active", "Closed", "Expired"];
  const visibilities = ["Public", "Private", "Invite-only"];
  const regions = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
    "Ladakh", "Lakshadweep", "Puducherry"
  ];
  const quotas = ["Yes", "No"];

  return (
    <div className="scholar-form-container">
      <div className="scholar-form-card">
        <div className="scholar-form-header">
          <h1 className="scholar-form-title">Universal Scholarship Registration Form</h1>
          <p className="scholar-form-subtitle">(Admin / Partner / Institute Side) - Add New Scholarship</p>
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
          {/* Section 1: Basic Scholarship Information */}
          <div className="form-section">
            <h3>1. Basic Scholarship Information</h3>
            <div className="form-field">
              <label className="field-label">Scholarship Name <span className="required">*</span></label>
              <input name="name" value={formData.name} onChange={handleChange} required className="field-input" placeholder="e.g., National Merit Scholarship" />
            </div>
            <div className="form-field">
              <label className="field-label">Scholarship Code / ID</label>
              <input name="code" value={formData.code} readOnly className="field-input" placeholder="Auto-generated on submit" />
            </div>
            <div className="form-field">
              <label className="field-label">Scholarship Provider Name <span className="required">*</span></label>
              <input name="provider" value={formData.provider} onChange={handleChange} required className="field-input" placeholder="e.g., Government of India" />
            </div>
            <div className="form-field">
              <label className="field-label">Provider Type</label>
              <select name="providerType" value={formData.providerType} onChange={handleChange} className="field-select">
                <option value="">Select Provider Type</option>
                {providerTypes.map((t, i) => <option key={i} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label className="field-label">Country of Scholarship</label>
              <input name="country" value={formData.country} onChange={handleChange} className="field-input" placeholder="e.g., India" />
            </div>
            <div className="form-field">
              <label className="field-label">State (If applicable)</label>
              <select name="region" value={formData.region} onChange={handleChange} className="field-select">
                <option value="">Select State</option>
                {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label className="field-label">Scholarship Website URL</label>
              <input type="url" name="website" value={formData.website} onChange={handleChange} className="field-input" placeholder="https://example.com" />
            </div>
          </div>

          {/* Section 2: Scholarship Category & Type */}
          <div className="form-section">
            <h3>2. Scholarship Category & Type</h3>
            <div className="form-field">
              <label className="field-label">Scholarship Level</label>
              <select name="educationLevel" value={formData.educationLevel} onChange={handleChange} className="field-select">
                <option value="">Select Level</option>
                {levels.map((l, i) => <option key={i} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="form-field full-width">
              <label className="field-label">Scholarship Type (Multi-select)</label>
              <div className="checkbox-group">
                {types.map((t, i) => (
                  <label key={i} className="checkbox-label">
                    <input
                      type="checkbox"
                      name="type"
                      value={t}
                      checked={formData.type.includes(t)}
                      onChange={(e) => handleCheckboxChange("type", t, e.target.checked)}
                    />
                    {t}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-field">
              <label className="field-label">Coverage Type</label>
              <select name="coverageType" value={formData.coverageType} onChange={handleChange} className="field-select">
                <option value="">Select Coverage</option>
                {coverageTypes.map((c, i) => <option key={i} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Section 3: Eligible Courses & Fields of Study */}
          <div className="form-section">
            <h3>3. Eligible Courses & Fields of Study</h3>
            <div className="form-field full-width">
              <label className="field-label">Eligible Discipline(s) (Multi-select)</label>
              <div className="checkbox-group">
                {disciplines.map((d, i) => (
                  <label key={i} className="checkbox-label">
                    <input
                      type="checkbox"
                      name="discipline"
                      value={d}
                      checked={formData.discipline.includes(d)}
                      onChange={(e) => handleCheckboxChange("discipline", d, e.target.checked)}
                    />
                    {d}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-field full-width">
              <label className="field-label">Eligible Degree Types (Multi-select)</label>
              <div className="checkbox-group">
                {degreeTypes.map((d, i) => (
                  <label key={i} className="checkbox-label">
                    <input
                      type="checkbox"
                      name="degreeType"
                      value={d}
                      checked={formData.degreeType.includes(d)}
                      onChange={(e) => handleCheckboxChange("degreeType", d, e.target.checked)}
                    />
                    {d}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-field full-width">
              <label className="field-label">Mode of Study (Multi-select)</label>
              <div className="checkbox-group">
                {modesOfStudy.map((m, i) => (
                  <label key={i} className="checkbox-label">
                    <input
                      type="checkbox"
                      name="modeOfStudy"
                      value={m}
                      checked={formData.modeOfStudy.includes(m)}
                      onChange={(e) => handleCheckboxChange("modeOfStudy", m, e.target.checked)}
                    />
                    {m}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Eligibility Criteria */}
          <div className="form-section">
            <h3>4. Eligibility Criteria (Core Section)</h3>
            <div className="form-field">
              <label className="field-label">Nationality Eligibility</label>
              <input name="nationality" value={formData.nationality} onChange={handleChange} className="field-input" placeholder="e.g., Indian Citizens" />
            </div>
            <div className="form-field">
              <label className="field-label">Domicile Requirement</label>
              <select name="domicileReq" value={formData.domicileReq} onChange={handleChange} className="field-select">
                <option value="">Select</option>
                {yesNo.map((y, i) => <option key={i} value={y}>{y}</option>)}
              </select>
            </div>
            <div className="form-field full-width">
              <label className="field-label">Category Eligibility (Multi-select)</label>
              <div className="checkbox-group">
                {categoryEligs.map((c, i) => (
                  <label key={i} className="checkbox-label">
                    <input
                      type="checkbox"
                      name="categoryEligibility"
                      value={c}
                      checked={formData.categoryEligibility.includes(c)}
                      onChange={(e) => handleCheckboxChange("categoryEligibility", c, e.target.checked)}
                    />
                    {c}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-field">
              <label className="field-label">Gender Eligibility</label>
              <select name="genderEligibility" value={formData.genderEligibility} onChange={handleChange} className="field-select">
                <option value="">Select</option>
                {genders.map((g, i) => <option key={i} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label className="field-label">Disability Eligibility</label>
              <select name="disabilityEligibility" value={formData.disabilityEligibility} onChange={handleChange} className="field-select">
                <option value="">Select</option>
                {yesNo.map((y, i) => <option key={i} value={y}>{y}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label className="field-label">Annual Family Income Limit (Min)</label>
              <input type="number" name="incomeLimitMin" value={formData.incomeLimitMin} onChange={handleChange} className="field-input" placeholder="e.g., 0" />
            </div>
            <div className="form-field">
              <label className="field-label">Annual Family Income Limit (Max)</label>
              <input type="number" name="incomeLimitMax" value={formData.incomeLimitMax} onChange={handleChange} className="field-input" placeholder="e.g., 500000" />
            </div>
            <div className="form-field">
              <label className="field-label">Minimum Academic Qualification</label>
              <input name="minAcademicQual" value={formData.minAcademicQual} onChange={handleChange} className="field-input" placeholder="e.g., 12th Pass" />
            </div>
            <div className="form-field">
              <label className="field-label">Minimum Marks / CGPA</label>
              <input name="minMarksCGPA" value={formData.minMarksCGPA} onChange={handleChange} className="field-input" placeholder="e.g., 60%" />
            </div>
            <div className="form-field">
              <label className="field-label">Gap Year Allowed</label>
              <select name="gapYearAllowed" value={formData.gapYearAllowed} onChange={handleChange} className="field-select">
                <option value="">Select</option>
                {yesNo.map((y, i) => <option key={i} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {/* Section 5: Age & Academic Limits */}
          <div className="form-section">
            <h3>5. Age & Academic Limits</h3>
            <div className="form-field">
              <label className="field-label">Minimum Age</label>
              <input type="number" name="minAge" value={formData.minAge} onChange={handleChange} className="field-input" placeholder="e.g., 18" />
            </div>
            <div className="form-field">
              <label className="field-label">Maximum Age</label>
              <input type="number" name="maxAge" value={formData.maxAge} onChange={handleChange} className="field-input" placeholder="e.g., 25" />
            </div>
            <div className="form-field full-width">
              <label className="field-label">Year of Study Eligible (Multi-select)</label>
              <div className="checkbox-group">
                {yearsOfStudy.map((y, i) => (
                  <label key={i} className="checkbox-label">
                    <input
                      type="checkbox"
                      name="yearOfStudy"
                      value={y}
                      checked={formData.yearOfStudy.includes(y)}
                      onChange={(e) => handleCheckboxChange("yearOfStudy", y, e.target.checked)}
                    />
                    {y}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 6: Scholarship Benefits */}
          <div className="form-section">
            <h3>6. Scholarship Benefits</h3>
            <div className="form-field">
              <label className="field-label">Tuition Fee Coverage</label>
              <select name="tuitionCoverage" value={formData.tuitionCoverage} onChange={handleChange} className="field-select">
                <option value="">Select</option>
                {yesNo.map((y, i) => <option key={i} value={y}>{y}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label className="field-label">Tuition Fee Amount (₹ / $)</label>
              <input name="tuitionAmount" value={formData.tuitionAmount} onChange={handleChange} className="field-input" placeholder="e.g., 50000" />
            </div>
            <div className="form-field">
              <label className="field-label">Monthly Stipend (Amount)</label>
              <input name="monthlyStipend" value={formData.monthlyStipend} onChange={handleChange} className="field-input" placeholder="e.g., 5000" />
            </div>
            <div className="form-field">
              <label className="field-label">Annual Allowance</label>
              <input name="annualAllowance" value={formData.annualAllowance} onChange={handleChange} className="field-input" placeholder="e.g., 10000" />
            </div>
            <div className="form-field">
              <label className="field-label">Hostel Fee Coverage</label>
              <select name="hostelCoverage" value={formData.hostelCoverage} onChange={handleChange} className="field-select">
                <option value="">Select</option>
                {yesNo.map((y, i) => <option key={i} value={y}>{y}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label className="field-label">Books & Study Material Allowance</label>
              <input name="booksAllowance" value={formData.booksAllowance} onChange={handleChange} className="field-input" placeholder="e.g., 2000" />
            </div>
            <div className="form-field">
              <label className="field-label">Travel Allowance</label>
              <input name="travelAllowance" value={formData.travelAllowance} onChange={handleChange} className="field-input" placeholder="e.g., 3000" />
            </div>
            <div className="form-field">
              <label className="field-label">Exam Fee Coverage</label>
              <select name="examFeeCoverage" value={formData.examFeeCoverage} onChange={handleChange} className="field-select">
                <option value="">Select</option>
                {yesNo.map((y, i) => <option key={i} value={y}>{y}</option>)}
              </select>
            </div>
            <div className="form-field full-width">
              <label className="field-label">Other Benefits (Text Field)</label>
              <textarea name="otherBenefits" value={formData.otherBenefits} onChange={handleChange} rows="2" className="field-textarea" placeholder="Describe other benefits..." />
            </div>
          </div>

          {/* Section 7: Scholarship Duration */}
          <div className="form-section">
            <h3>7. Scholarship Duration</h3>
            <div className="form-field">
              <label className="field-label">Duration Type</label>
              <select name="durationType" value={formData.durationType} onChange={handleChange} className="field-select">
                <option value="">Select</option>
                {durationTypes.map((d, i) => <option key={i} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label className="field-label">Total Duration (Years / Months)</label>
              <input name="totalDuration" value={formData.totalDuration} onChange={handleChange} className="field-input" placeholder="e.g., 4 years" />
            </div>
            <div className="form-field full-width">
              <label className="field-label">Renewal Criteria (Marks / Attendance / Other)</label>
              <textarea name="renewalCriteria" value={formData.renewalCriteria} onChange={handleChange} rows="2" className="field-textarea" placeholder="e.g., 75% marks required for renewal" />
            </div>
          </div>

          {/* Section 8: Application Details */}
          <div className="form-section">
            <h3>8. Application Details</h3>
            <div className="form-field">
              <label className="field-label">Application Mode</label>
              <select name="applicationMode" value={formData.applicationMode} onChange={handleChange} className="field-select">
                <option value="">Select</option>
                {applicationModes.map((m, i) => <option key={i} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label className="field-label">Application URL</label>
              <input type="url" name="applicationURL" value={formData.applicationURL} onChange={handleChange} className="field-input" placeholder="https://apply.example.com" />
            </div>
            <div className="form-field">
              <label className="field-label">Application Start Date</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="field-input" />
            </div>
            <div className="form-field">
              <label className="field-label">Application End Date</label>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="field-input" />
            </div>
            <div className="form-field">
              <label className="field-label">Application Deadline Time</label>
              <input type="time" name="deadlineTime" value={formData.deadlineTime} onChange={handleChange} className="field-input" />
            </div>
            <div className="form-field">
              <label className="field-label">Application Fee (If any)</label>
              <input type="number" name="applicationFee" value={formData.applicationFee} onChange={handleChange} className="field-input" placeholder="e.g., 500" />
            </div>
          </div>

          {/* Section 9: Required Documents */}
          <div className="form-section">
            <h3>9. Required Documents (Multi-select)</h3>
            <div className="form-field full-width">
              <div className="checkbox-group">
                {documents.map((d, i) => (
                  <label key={i} className="checkbox-label">
                    <input
                      type="checkbox"
                      name="documentsRequired"
                      value={d}
                      checked={formData.documentsRequired.includes(d)}
                      onChange={(e) => handleCheckboxChange("documentsRequired", d, e.target.checked)}
                    />
                    {d}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 10: Selection Process */}
          <div className="form-section">
            <h3>10. Selection Process</h3>
            <div className="form-field full-width">
              <label className="field-label">Selection Method (Multi-select)</label>
              <div className="checkbox-group">
                {selectionMethods.map((s, i) => (
                  <label key={i} className="checkbox-label">
                    <input
                      type="checkbox"
                      name="selectionMethod"
                      value={s}
                      checked={formData.selectionMethod.includes(s)}
                      onChange={(e) => handleCheckboxChange("selectionMethod", s, e.target.checked)}
                    />
                    {s}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-field">
              <label className="field-label">Interview Mode</label>
              <select name="interviewMode" value={formData.interviewMode} onChange={handleChange} className="field-select">
                <option value="">Select</option>
                {interviewModes.map((m, i) => <option key={i} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          {/* Section 11: Disbursement Details */}
          <div className="form-section">
            <h3>11. Disbursement Details</h3>
            <div className="form-field">
              <label className="field-label">Scholarship Disbursement Mode</label>
              <select name="disbursementMode" value={formData.disbursementMode} onChange={handleChange} className="field-select">
                <option value="">Select</option>
                {disbursementModes.map((d, i) => <option key={i} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label className="field-label">Disbursement Frequency</label>
              <select name="disbursementFrequency" value={formData.disbursementFrequency} onChange={handleChange} className="field-select">
                <option value="">Select</option>
                {frequencies.map((f, i) => <option key={i} value={f}>{f}</option>)}
              </select>
            </div>
          </div>

          {/* Section 12: Application Status Control */}
          <div className="form-section">
            <h3>12. Application Status Control (Admin)</h3>
            <div className="form-field">
              <label className="field-label">Scholarship Status <span className="required">*</span></label>
              <select name="status" value={formData.status} onChange={handleChange} required className="field-select">
                <option value="">Select Status</option>
                {statuses.map((s, i) => <option key={i} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label className="field-label">Visibility</label>
              <select name="visibility" value={formData.visibility} onChange={handleChange} className="field-select">
                <option value="">Select</option>
                {visibilities.map((v, i) => <option key={i} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label className="field-label">Featured Scholarship</label>
              <select name="featured" value={formData.featured} onChange={handleChange} className="field-select">
                <option value="">Select</option>
                {yesNo.map((y, i) => <option key={i} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {/* Section 13: Tags & Search Optimization */}
          <div className="form-section">
            <h3>13. Tags & Search Optimization</h3>
            <div className="form-field full-width">
              <label className="field-label">Search Keywords (Manual / Auto)</label>
              <textarea name="searchKeywords" value={formData.searchKeywords} onChange={handleChange} rows="2" className="field-textarea" placeholder="Comma-separated keywords..." />
            </div>
            <div className="form-field full-width">
              <label className="field-label">Popular Search Tags</label>
              <textarea name="popularTags" value={formData.popularTags} onChange={handleChange} rows="2" className="field-textarea" placeholder="e.g., merit, ug, engineering" />
            </div>
            <div className="form-field full-width">
              <label className="field-label">Course Tags</label>
              <textarea name="courseTags" value={formData.courseTags} onChange={handleChange} rows="2" className="field-textarea" placeholder="e.g., btech, mbbs" />
            </div>
            <div className="form-field full-width">
              <label className="field-label">Location Tags</label>
              <textarea name="locationTags" value={formData.locationTags} onChange={handleChange} rows="2" className="field-textarea" placeholder="e.g., delhi, tamil nadu" />
            </div>
          </div>

          {/* Section 14: Compliance & Verification */}
          <div className="form-section">
            <h3>14. Compliance & Verification</h3>
            <div className="form-field">
              <label className="field-label">Verified by Admin</label>
              <select name="verifiedByAdmin" value={formData.verifiedByAdmin} onChange={handleChange} className="field-select">
                <option value="">Select</option>
                {yesNo.map((y, i) => <option key={i} value={y}>{y}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label className="field-label">Source Verified</label>
              <select name="sourceVerified" value={formData.sourceVerified} onChange={handleChange} className="field-select">
                <option value="">Select</option>
                {yesNo.map((y, i) => <option key={i} value={y}>{y}</option>)}
              </select>
            </div>
            {/* Last Updated: Auto */}
          </div>

          {/* Legacy Fields (if needed for backward compat) */}
          <div className="form-section">
            <h3>Legacy / Additional Fields</h3>
            <div className="form-field">
              <label className="field-label">General Quota</label>
              <select name="generalQuota" value={formData.generalQuota} onChange={handleChange} className="field-select">
                <option value="">Select</option>
                {quotas.map((q, i) => <option key={i} value={q}>{q}</option>)}
              </select>
            </div>
            <div className="form-field full-width">
              <label className="field-label">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="field-textarea" placeholder="Detailed description..." />
            </div>
            <div className="form-field full-width">
              <label className="field-label">Eligibility (Legacy)</label>
              <textarea name="eligibility" value={formData.eligibility} onChange={handleChange} rows="4" className="field-textarea" placeholder="Legacy eligibility notes..." />
            </div>
            <div className="form-field">
              <label className="field-label">Benefits (Legacy)</label>
              <select name="benefits" value={formData.benefits} onChange={handleChange} className="field-select">
                <option value="">Select</option>
                {/* Add legacy benefits if needed */}
              </select>
            </div>
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