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
    country: "India", // Default for India-focused
    state: "",
    websiteURL: "",

    // 2. Scholarship Category & Type
    level: "",
    type: [], // Multi-select array
    coverageType: "",

    // 3. Eligible Courses & Fields of Study
    discipline: [], // Multi-select array
    degreeTypes: [], // Multi-select array
    modeOfStudy: "",

    // 4. Eligibility Criteria
    nationality: "",
    domicileReq: "",
    categoryEligibility: [], // Multi-select array
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
    yearOfStudy: [], // Multi-select array

    // 6. Scholarship Benefits
    tuitionCoverage: "",
    tuitionAmount: "",
    monthlyStipend: "",
    annualAllowance: "",
    hostelCoverage: "",
    booksAllowance: "",
    travelAllowance: "",
    examFeeCoverage: "", // Assuming yes/no for coverage
    otherBenefits: "",

    // 7. Scholarship Duration
    durationType: "",
    totalDuration: "",
    totalDurationUnit: "Years", // Years or Months
    renewalCriteria: "",

    // 8. Application Details
    appMode: "",
    appURL: "",
    startDate: "",
    endDate: "",
    deadlineTime: "",
    appFee: "",

    // 9. Required Documents
    requiredDocuments: [], // Multi-select array

    // 10. Selection Process
    selectionMethod: [], // Multi-select array
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
    courseTags: "",
    locationTags: "",

    // 14. Compliance & Verification (auto or admin set)
    verifiedAdmin: "No",
    sourceVerified: "No",

    // Additional free-text fields from original
    description: "",
    eligibility: "", // Additional detailed eligibility if needed
    benefits: "", // Additional if needed
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle single input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  // Handle multi-select change (checkboxes)
  const handleMultiChange = (field, value) => {
    setFormData((s) => {
      const current = s[field] || [];
      const newVal = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...s, [field]: newVal };
    });
  };

  // Validate before sending (basic required fields)
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

      // Auto-generate code if empty (simple example)
      const payload = {
        ...formData,
        code: formData.code || `SCH-${Date.now()}`,
        // Flatten multi-selects if needed for backend
        tags: [
          ...(formData.categoryEligibility || []),
          ...(formData.type || []),
          formData.level,
          formData.searchKeywords.split(',').map(t => t.trim()).filter(Boolean),
          formData.courseTags.split(',').map(t => t.trim()).filter(Boolean),
          formData.locationTags.split(',').map(t => t.trim()).filter(Boolean),
        ].filter(Boolean),
      };

      // POST to backend
      const res = await axios.post(`${API_URL}/adminscholar`, payload, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      alert(res?.data?.message || "✅ Scholarship added successfully!");

      // Reset form
      setFormData({
        name: "",
        code: "",
        provider: "",
        providerType: "",
        country: "India",
        state: "",
        websiteURL: "",
        level: "",
        type: [],
        coverageType: "",
        discipline: [],
        degreeTypes: [],
        modeOfStudy: "",
        nationality: "",
        domicileReq: "",
        categoryEligibility: [],
        genderEligibility: "",
        disabilityEligibility: "",
        incomeLimitMin: "",
        incomeLimitMax: "",
        minAcademicQual: "",
        minMarksCGPA: "",
        gapYearAllowed: "",
        minAge: "",
        maxAge: "",
        yearOfStudy: [],
        tuitionCoverage: "",
        tuitionAmount: "",
        monthlyStipend: "",
        annualAllowance: "",
        hostelCoverage: "",
        booksAllowance: "",
        travelAllowance: "",
        examFeeCoverage: "",
        otherBenefits: "",
        durationType: "",
        totalDuration: "",
        totalDurationUnit: "Years",
        renewalCriteria: "",
        appMode: "",
        appURL: "",
        startDate: "",
        endDate: "",
        deadlineTime: "",
        appFee: "",
        requiredDocuments: [],
        selectionMethod: [],
        interviewMode: "",
        disbursementMode: "",
        disbursementFrequency: "",
        status: "",
        visibility: "",
        featured: "",
        searchKeywords: "",
        courseTags: "",
        locationTags: "",
        verifiedAdmin: "No",
        sourceVerified: "No",
        description: "",
        eligibility: "",
        benefits: "",
      });

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

  // Option lists
  const providerTypes = ["Government", "Private Organization", "University / Institute", "NGO / Trust", "Corporate (CSR)", "International Body"];
  const levels = ["School", "Undergraduate (UG)", "Postgraduate (PG)", "Diploma", "PhD / Research", "Postdoctoral"];
  const types = ["Merit-based", "Need-based", "Category-based", "Minority-based", "Gender-based", "Disability-based", "Sports-based", "Talent-based", "Means-cum-Merit"];
  const coverageTypes = ["Fully Funded", "Partially Funded"];
  const disciplines = ["Engineering", "Medical", "Management", "Law", "Arts", "Science", "Commerce", "Agriculture", "Any Course"];
  const degreeTypes = ["Diploma", "UG", "PG", "PhD"];
  const modesOfStudy = ["Full-time", "Part-time", "Online", "Offline"];
  const yesNo = ["Yes", "No"];
  const categories = ["General", "SC", "ST", "OBC", "EWS", "Minority"];
  const genders = ["Male", "Female", "Other", "All"];
  const yearsOfStudy = ["1st Year", "2nd Year", "Final Year", "Any Year"];
  const durationTypes = ["One-time", "Annual (Renewable)"];
  const durationUnits = ["Years", "Months"];
  const appModes = ["Online", "Offline", "Both"];
  const documents = ["Aadhaar / Passport", "Income Certificate", "Caste / Category Certificate", "Domicile Certificate", "Academic Mark Sheets", "Bonafide Certificate", "Admission Proof", "Bank Account Details", "Disability Certificate", "Recommendation Letter", "Statement of Purpose (SOP)"];
  const selectionMethods = ["Merit-based", "Interview", "Written Test", "Document Verification", "Combination"];
  const interviewModes = ["Online", "Offline"];
  const disbursementModes = ["Direct Bank Transfer (DBT)", "Institute Transfer"];
  const frequencies = ["Monthly", "Quarterly", "Annual", "One-time"];
  const statuses = ["Draft", "Active", "Closed", "Expired"];
  const visibilities = ["Public", "Private", "Invite-only"];
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh",
    "Lakshadweep", "Puducherry"
  ];

  // Render multi-select checkboxes
  const renderMultiSelect = (field, options, label) => (
    <div className="form-field full-width">
      <label className="field-label">{label}</label>
      <div className="checkbox-group">
        {options.map((opt) => (
          <label key={opt} className="checkbox-label">
            <input
              type="checkbox"
              checked={formData[field]?.includes(opt) || false}
              onChange={(e) => handleMultiChange(field, opt)}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );

  // Render section
  const renderSection = (title, children) => (
    <div className="section">
      <h2 className="section-title">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="scholar-form-container">
      <div className="scholar-form-card">
        <div className="scholar-form-header">
          <h1 className="scholar-form-title">Universal Scholarship Registration Form</h1>
          <p className="scholar-form-subtitle">(Admin / Partner / Institute Side)</p>
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
          {renderSection("1. Basic Scholarship Information", (
            <>
              <div className="form-field">
                <label className="field-label">Scholarship Name <span className="required">*</span></label>
                <input name="name" value={formData.name} onChange={handleChange} required className="field-input" placeholder="e.g., National Merit Scholarship" />
              </div>
              <div className="form-field">
                <label className="field-label">Scholarship Code / ID</label>
                <input name="code" value={formData.code} onChange={handleChange} className="field-input" placeholder="Auto-generated" readOnly />
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
                <select name="state" value={formData.state} onChange={handleChange} className="field-select">
                  <option value="">Select State</option>
                  {states.map((s, i) => <option key={i} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-field full-width">
                <label className="field-label">Scholarship Website URL</label>
                <input name="websiteURL" value={formData.websiteURL} onChange={handleChange} className="field-input" placeholder="https://example.com" type="url" />
              </div>
            </>
          ))}

          {renderSection("2. Scholarship Category & Type", (
            <>
              <div className="form-field">
                <label className="field-label">Scholarship Level</label>
                <select name="level" value={formData.level} onChange={handleChange} className="field-select">
                  <option value="">Select Level</option>
                  {levels.map((l, i) => <option key={i} value={l}>{l}</option>)}
                </select>
              </div>
              {renderMultiSelect("type", types, "Scholarship Type (Multi-select)")}
              <div className="form-field">
                <label className="field-label">Coverage Type</label>
                <select name="coverageType" value={formData.coverageType} onChange={handleChange} className="field-select">
                  <option value="">Select Coverage</option>
                  {coverageTypes.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
              </div>
            </>
          ))}

          {renderSection("3. Eligible Courses & Fields of Study", (
            <>
              {renderMultiSelect("discipline", disciplines, "Eligible Discipline(s)")}
              {renderMultiSelect("degreeTypes", degreeTypes, "Eligible Degree Types")}
              <div className="form-field">
                <label className="field-label">Mode of Study</label>
                <select name="modeOfStudy" value={formData.modeOfStudy} onChange={handleChange} className="field-select">
                  <option value="">Select Mode</option>
                  {modesOfStudy.map((m, i) => <option key={i} value={m}>{m}</option>)}
                </select>
              </div>
            </>
          ))}

          {renderSection("4. Eligibility Criteria (Core Section)", (
            <>
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
              {renderMultiSelect("categoryEligibility", categories, "Category Eligibility")}
              <div className="form-field">
                <label className="field-label">Gender Eligibility</label>
                <select name="genderEligibility" value={formData.genderEligibility} onChange={handleChange} className="field-select">
                  <option value="">Select Gender</option>
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
                <input name="incomeLimitMin" value={formData.incomeLimitMin} onChange={handleChange} className="field-input" type="number" placeholder="e.g., 0" />
              </div>
              <div className="form-field">
                <label className="field-label">Annual Family Income Limit (Max)</label>
                <input name="incomeLimitMax" value={formData.incomeLimitMax} onChange={handleChange} className="field-input" type="number" placeholder="e.g., 500000" />
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
              <div className="form-field full-width">
                <label className="field-label">Additional Eligibility Criteria</label>
                <textarea name="eligibility" value={formData.eligibility} onChange={handleChange} rows="4" className="field-textarea" placeholder="Detailed eligibility..." />
              </div>
            </>
          ))}

          {renderSection("5. Age & Academic Limits", (
            <>
              <div className="form-field">
                <label className="field-label">Minimum Age</label>
                <input name="minAge" value={formData.minAge} onChange={handleChange} className="field-input" type="number" placeholder="e.g., 18" />
              </div>
              <div className="form-field">
                <label className="field-label">Maximum Age</label>
                <input name="maxAge" value={formData.maxAge} onChange={handleChange} className="field-input" type="number" placeholder="e.g., 25" />
              </div>
              {renderMultiSelect("yearOfStudy", yearsOfStudy, "Year of Study Eligible")}
            </>
          ))}

          {renderSection("6. Scholarship Benefits", (
            <>
              <div className="form-field">
                <label className="field-label">Tuition Fee Coverage</label>
                <select name="tuitionCoverage" value={formData.tuitionCoverage} onChange={handleChange} className="field-select">
                  <option value="">Select</option>
                  {yesNo.map((y, i) => <option key={i} value={y}>{y}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label className="field-label">Tuition Fee Amount (₹ / $)</label>
                <input name="tuitionAmount" value={formData.tuitionAmount} onChange={handleChange} className="field-input" type="number" placeholder="e.g., 50000" />
              </div>
              <div className="form-field">
                <label className="field-label">Monthly Stipend (Amount)</label>
                <input name="monthlyStipend" value={formData.monthlyStipend} onChange={handleChange} className="field-input" type="number" placeholder="e.g., 5000" />
              </div>
              <div className="form-field">
                <label className="field-label">Annual Allowance</label>
                <input name="annualAllowance" value={formData.annualAllowance} onChange={handleChange} className="field-input" type="number" placeholder="e.g., 10000" />
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
                <input name="booksAllowance" value={formData.booksAllowance} onChange={handleChange} className="field-input" type="number" placeholder="e.g., 2000" />
              </div>
              <div className="form-field">
                <label className="field-label">Travel Allowance</label>
                <input name="travelAllowance" value={formData.travelAllowance} onChange={handleChange} className="field-input" type="number" placeholder="e.g., 3000" />
              </div>
              <div className="form-field">
                <label className="field-label">Exam Fee Coverage</label>
                <select name="examFeeCoverage" value={formData.examFeeCoverage} onChange={handleChange} className="field-select">
                  <option value="">Select</option>
                  {yesNo.map((y, i) => <option key={i} value={y}>{y}</option>)}
                </select>
              </div>
              <div className="form-field full-width">
                <label className="field-label">Other Benefits</label>
                <textarea name="otherBenefits" value={formData.otherBenefits} onChange={handleChange} rows="3" className="field-textarea" placeholder="e.g., Laptop, Insurance..." />
              </div>
              <div className="form-field full-width">
                <label className="field-label">Additional Benefits Description</label>
                <textarea name="benefits" value={formData.benefits} onChange={handleChange} rows="3" className="field-textarea" placeholder="Detailed benefits..." />
              </div>
            </>
          ))}

          {renderSection("7. Scholarship Duration", (
            <>
              <div className="form-field">
                <label className="field-label">Duration Type</label>
                <select name="durationType" value={formData.durationType} onChange={handleChange} className="field-select">
                  <option value="">Select Type</option>
                  {durationTypes.map((d, i) => <option key={i} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label className="field-label">Total Duration</label>
                <input name="totalDuration" value={formData.totalDuration} onChange={handleChange} className="field-input" type="number" placeholder="e.g., 4" />
              </div>
              <div className="form-field">
                <label className="field-label">Duration Unit</label>
                <select name="totalDurationUnit" value={formData.totalDurationUnit} onChange={handleChange} className="field-select">
                  <option value="Years">Years</option>
                  <option value="Months">Months</option>
                </select>
              </div>
              <div className="form-field full-width">
                <label className="field-label">Renewal Criteria</label>
                <textarea name="renewalCriteria" value={formData.renewalCriteria} onChange={handleChange} rows="3" className="field-textarea" placeholder="e.g., 75% marks, 80% attendance" />
              </div>
            </>
          ))}

          {renderSection("8. Application Details", (
            <>
              <div className="form-field">
                <label className="field-label">Application Mode</label>
                <select name="appMode" value={formData.appMode} onChange={handleChange} className="field-select">
                  <option value="">Select Mode</option>
                  {appModes.map((m, i) => <option key={i} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="form-field full-width">
                <label className="field-label">Application URL</label>
                <input name="appURL" value={formData.appURL} onChange={handleChange} className="field-input" type="url" placeholder="https://apply.example.com" />
              </div>
              <div className="form-field">
                <label className="field-label">Application Start Date</label>
                <input name="startDate" value={formData.startDate} onChange={handleChange} type="date" className="field-input" />
              </div>
              <div className="form-field">
                <label className="field-label">Application End Date</label>
                <input name="endDate" value={formData.endDate} onChange={handleChange} type="date" className="field-input" />
              </div>
              <div className="form-field">
                <label className="field-label">Application Deadline Time</label>
                <input name="deadlineTime" value={formData.deadlineTime} onChange={handleChange} type="time" className="field-input" />
              </div>
              <div className="form-field">
                <label className="field-label">Application Fee (If any)</label>
                <input name="appFee" value={formData.appFee} onChange={handleChange} className="field-input" type="number" placeholder="e.g., 500" />
              </div>
            </>
          ))}

          {renderSection("9. Required Documents (Multi-select)", (
            <div className="form-field full-width">
              {renderMultiSelect("requiredDocuments", documents, "Required Documents")}
            </div>
          ))}

          {renderSection("10. Selection Process", (
            <>
              {renderMultiSelect("selectionMethod", selectionMethods, "Selection Method")}
              <div className="form-field">
                <label className="field-label">Interview Mode</label>
                <select name="interviewMode" value={formData.interviewMode} onChange={handleChange} className="field-select">
                  <option value="">Select Mode</option>
                  {interviewModes.map((m, i) => <option key={i} value={m}>{m}</option>)}
                </select>
              </div>
            </>
          ))}

          {renderSection("11. Disbursement Details", (
            <>
              <div className="form-field">
                <label className="field-label">Scholarship Disbursement Mode</label>
                <select name="disbursementMode" value={formData.disbursementMode} onChange={handleChange} className="field-select">
                  <option value="">Select Mode</option>
                  {disbursementModes.map((d, i) => <option key={i} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label className="field-label">Disbursement Frequency</label>
                <select name="disbursementFrequency" value={formData.disbursementFrequency} onChange={handleChange} className="field-select">
                  <option value="">Select Frequency</option>
                  {frequencies.map((f, i) => <option key={i} value={f}>{f}</option>)}
                </select>
              </div>
            </>
          ))}

          {renderSection("12. Application Status Control (Admin)", (
            <>
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
                  <option value="">Select Visibility</option>
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
            </>
          ))}

          {renderSection("13. Tags & Search Optimization", (
            <>
              <div className="form-field full-width">
                <label className="field-label">Search Keywords (Comma-separated)</label>
                <textarea name="searchKeywords" value={formData.searchKeywords} onChange={handleChange} rows="2" className="field-textarea" placeholder="e.g., merit, engineering, UG" />
              </div>
              <div className="form-field">
                <label className="field-label">Course Tags (Comma-separated)</label>
                <input name="courseTags" value={formData.courseTags} onChange={handleChange} className="field-input" placeholder="e.g., engineering, medical" />
              </div>
              <div className="form-field">
                <label className="field-label">Location Tags (Comma-separated)</label>
                <input name="locationTags" value={formData.locationTags} onChange={handleChange} className="field-input" placeholder="e.g., Delhi, Maharashtra" />
              </div>
            </>
          ))}

          {renderSection("14. Compliance & Verification", (
            <>
              <div className="form-field">
                <label className="field-label">Verified by Admin</label>
                <select name="verifiedAdmin" value={formData.verifiedAdmin} onChange={handleChange} className="field-select">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div className="form-field">
                <label className="field-label">Source Verified</label>
                <select name="sourceVerified" value={formData.sourceVerified} onChange={handleChange} className="field-select">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </>
          ))}

          {renderSection("Additional Description", (
            <div className="form-field full-width">
              <label className="field-label">General Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="field-textarea" placeholder="Provide a detailed description..." />
            </div>
          ))}

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