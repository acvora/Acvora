// src/Pages/ScholarForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ScholarForm.css";

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
    code: "",
    provider: "",
    providerType: "",
    country: "India",
    state: "",
    websiteURL: "",
    // 2. Scholarship Category & Type
    level: "",
    type: [],
    coverageType: "",
    // 3. Eligible Courses & Fields of Study
    discipline: [],
    degreeTypes: [],
    modeOfStudy: "",
    // 4. Eligibility Criteria
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
    // 5. Age & Academic Limits
    minAge: "",
    maxAge: "",
    yearOfStudy: [],
    // 6. Scholarship Benefits
    tuitionCoverage: "",
    tuitionAmount: "",
    monthlyStipend: "",
    annualAllowance: "",
    hostelCoverage: "",
    booksAllowance: "",
    travelAllowance: "",
    examFeeCoverage: "",
    otherBenefits: "",
    // 7. Scholarship Duration
    durationType: "",
    totalDuration: "",
    totalDurationUnit: "Years",
    renewalCriteria: "",
    // 8. Application Details
    appMode: "",
    appURL: "",
    startDate: "",
    endDate: "",
    deadlineTime: "",
    appFee: "",
    // 9. Required Documents
    requiredDocuments: [],
    // 10. Selection Process
    selectionMethod: [],
    interviewMode: "",
    // 11. Disbursement Details
    disbursementMode: "",
    disbursementFrequency: "",
    // 12. Application Status Control
    status: "Draft",
    visibility: "",
    featured: "",
    // 13. Tags & Search Optimization
    searchKeywords: "",
    courseTags: "",
    locationTags: "",
    // 14. Compliance & Verification
    verifiedAdmin: "No",
    sourceVerified: "No",
    // Additional
    description: "",
    eligibility: "",
    benefits: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step titles
  const stepTitles = {
    1: "Basic & Courses",
    2: "Eligibility & Benefits",
    3: "Application & Docs",
    4: "Admin & Final",
  };

  // Auto-generate code on mount
  useEffect(() => {
    if (!formData.code) {
      const year = new Date().getFullYear();
      const rand = Math.floor(10000 + Math.random() * 90000);
      setFormData((prev) => ({
        ...prev,
        code: `SCH-${year}-${rand}`,
      }));
    }
  }, []);

  // Required fields per step
  const requiredPerStep = {
    1: ["name", "provider", "country", "discipline"],
    2: [
      "nationality",
      "categoryEligibility",
      "genderEligibility",
      "incomeLimitMax",
      "minAcademicQual",
      "minMarksCGPA",
      "gapYearAllowed",
    ],
    3: ["appMode", "startDate", "endDate", "requiredDocuments"],
    4: ["status", "visibility"],
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

  // Handle multi-select change
  const handleMultiChange = (field, value) => {
    setFormData((s) => {
      const current = s[field] || [];
      const newVal =
        current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      return {
        ...s,
        [field]: newVal,
      };
    });
  };

  // Render multi-select
  const renderMultiSelect = (field, options, label, required = false) => (
    <div className="form-field">
      <label className="field-label">
        {label} {required && <span className="required">*</span>}
      </label>
      <div className="checkbox-group">
        {options.map((opt) => (
          <label key={opt} className="checkbox-label">
            <input
              type="checkbox"
              checked={formData[field]?.includes(opt) || false}
              onChange={() => handleMultiChange(field, opt)}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );

  // Basic overall validate
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

    // Validate current (last) step
    if (!validateStep(4)) {
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
      const token = localStorage.getItem("token");
      const payload = {
        ...formData,
        code: formData.code || `SCH-${Date.now()}`,
        incomeLimitMin: formData.incomeLimitMin
          ? Number(formData.incomeLimitMin)
          : undefined,
        incomeLimitMax: formData.incomeLimitMax
          ? Number(formData.incomeLimitMax)
          : undefined,
        minAge: formData.minAge ? Number(formData.minAge) : undefined,
        maxAge: formData.maxAge ? Number(formData.maxAge) : undefined,
        tuitionAmount: formData.tuitionAmount
          ? Number(formData.tuitionAmount)
          : undefined,
        monthlyStipend: formData.monthlyStipend
          ? Number(formData.monthlyStipend)
          : undefined,
        annualAllowance: formData.annualAllowance
          ? Number(formData.annualAllowance)
          : undefined,
        booksAllowance: formData.booksAllowance
          ? Number(formData.booksAllowance)
          : undefined,
        travelAllowance: formData.travelAllowance
          ? Number(formData.travelAllowance)
          : undefined,
        appFee: formData.appFee ? Number(formData.appFee) : undefined,
        totalDuration: formData.totalDuration
          ? Number(formData.totalDuration)
          : undefined,
      };

      // Remove empty arrays
      Object.keys(payload).forEach((key) => {
        if (Array.isArray(payload[key]) && payload[key].length === 0) {
          delete payload[key];
        }
      });

      // Remove undefined & empty
      Object.keys(payload).forEach((key) => {
        if (payload[key] === undefined || payload[key] === "") {
          delete payload[key];
        }
      });

      // Tags
      payload.tags = [
        ...(formData.categoryEligibility || []),
        ...(formData.type || []),
        formData.level,
        ...formData.searchKeywords
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        ...formData.courseTags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        ...formData.locationTags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      ].filter(Boolean);

      if (payload.type && !Array.isArray(payload.type)) {
        payload.type = [payload.type];
      }
      if (!payload.status) {
        payload.status = "Draft";
      }

      const res = await axios.post(`${API_URL}/adminscholar`, payload, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      alert(res?.data?.message || "✅ Scholarship added successfully!");

      // Reset
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
        status: "Draft",
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
      setCurrentStep(1);
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

  // Option lists (unchanged)
  const providerTypes = [
    "Government",
    "Private Organization",
    "University / Institute",
    "NGO / Trust",
    "Corporate (CSR)",
    "International Body",
  ];
  const levels = [
    "School",
    "Undergraduate (UG)",
    "Postgraduate (PG)",
    "Diploma",
    "PhD / Research",
    "Postdoctoral",
  ];
  const types = [
    "Merit-based",
    "Need-based",
    "Category-based",
    "Minority-based",
    "Gender-based",
    "Disability-based",
    "Sports-based",
    "Talent-based",
    "Means-cum-Merit",
  ];
  const coverageTypes = ["Fully Funded", "Partially Funded"];
  const disciplines = [
    "Engineering",
    "Medical",
    "Management",
    "Law",
    "Arts",
    "Science",
    "Commerce",
    "Agriculture",
    "Any Course",
  ];
  const degreeTypes = ["Diploma", "UG", "PG", "PhD"];
  const modesOfStudy = ["Full-time", "Part-time", "Online", "Offline"];
  const yesNo = ["Yes", "No"];
  const categories = ["General", "SC", "ST", "OBC", "EWS", "Minority"];
  const genders = ["Male", "Female", "Other", "All"];
  const yearsOfStudy = ["1st Year", "2nd Year", "Final Year", "Any Year"];
  const durationTypes = ["One-time", "Annual (Renewable)"];
  const durationUnits = ["Years", "Months"];
  const appModes = ["Online", "Offline", "Both"];
  const documents = [
    "Aadhaar / Passport",
    "Income Certificate",
    "Caste / Category Certificate",
    "Domicile Certificate",
    "Academic Mark Sheets",
    "Bonafide Certificate",
    "Admission Proof",
    "Bank Account Details",
    "Disability Certificate",
    "Recommendation Letter",
    "Statement of Purpose (SOP)",
  ];
  const selectionMethods = [
    "Merit-based",
    "Interview",
    "Written Test",
    "Document Verification",
    "Combination",
  ];
  const interviewModes = ["Online", "Offline"];
  const disbursementModes = ["Direct Bank Transfer (DBT)", "Institute Transfer"];
  const frequencies = ["Monthly", "Quarterly", "Annual", "One-time"];
  const statuses = ["Draft", "Active", "Closed", "Expired"];
  const visibilities = ["Public", "Private", "Invite-only"];
  const states = [
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

  // Render step content
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <div className="card">
              <h2 className="section-title">Basic Scholarship Information</h2>
              <div className="form-field">
                <label className="field-label">
                  Scholarship Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., National Merit Scholarship"
                  required
                />
              </div>
              <div className="form-field">
                <label className="field-label">Scholarship Code / ID</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="Auto-generated or custom"
                />
              </div>
              <div className="form-field">
                <label className="field-label">
                  Scholarship Provider Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="provider"
                  value={formData.provider}
                  onChange={handleChange}
                  placeholder="e.g., Ministry of Education"
                  required
                />
              </div>
              <div className="form-field">
                <label className="field-label">Provider Type</label>
                <select
                  name="providerType"
                  value={formData.providerType}
                  onChange={handleChange}
                >
                  <option value="">Select Provider Type</option>
                  {providerTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label className="field-label">
                  Country of Scholarship <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="e.g., India"
                  required
                />
              </div>
              <div className="form-field">
                <label className="field-label">State (If applicable)</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label className="field-label">Scholarship Website URL</label>
                <input
                  type="url"
                  name="websiteURL"
                  value={formData.websiteURL}
                  onChange={handleChange}
                  placeholder="https://example.com/scholarship"
                />
              </div>
            </div>

            <div className="card">
              <h2 className="section-title">
                Scholarship Category & Type / Eligible Courses & Fields of Study
              </h2>
              <div className="form-field">
                <label className="field-label">Scholarship Level</label>
                <select name="level" value={formData.level} onChange={handleChange}>
                  <option value="">Select Level</option>
                  {levels.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              {renderMultiSelect("type", types, "Scholarship Type (Multi-select)")}
              <div className="form-field">
                <label className="field-label">Coverage Type</label>
                <select
                  name="coverageType"
                  value={formData.coverageType}
                  onChange={handleChange}
                >
                  <option value="">Select Coverage</option>
                  {coverageTypes.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              {renderMultiSelect("discipline", disciplines, "Eligible Discipline(s)", true)}
              {renderMultiSelect("degreeTypes", degreeTypes, "Eligible Degree Types")}
              <div className="form-field">
                <label className="field-label">Mode of Study</label>
                <select
                  name="modeOfStudy"
                  value={formData.modeOfStudy}
                  onChange={handleChange}
                >
                  <option value="">Select Mode</option>
                  {modesOfStudy.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="btn-area">
              <button type="button" className="next-btn" onClick={() => goToStep(2)}>
                Next → Eligibility & Benefits
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <div className="card">
              <h2 className="section-title">Eligibility Criteria</h2>
              <div className="form-field">
                <label className="field-label">
                  Nationality Eligibility <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  placeholder="e.g., Indian Citizens"
                  required
                />
              </div>
              <div className="form-field">
                <label className="field-label">Domicile Requirement</label>
                <select
                  name="domicileReq"
                  value={formData.domicileReq}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {yesNo.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              {renderMultiSelect(
                "categoryEligibility",
                categories,
                "Category Eligibility (Multi-select)",
                true
              )}
              <div className="form-field">
                <label className="field-label">
                  Gender Eligibility <span className="required">*</span>
                </label>
                <select
                  name="genderEligibility"
                  value={formData.genderEligibility}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  {genders.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label className="field-label">Disability Eligibility</label>
                <select
                  name="disabilityEligibility"
                  value={formData.disabilityEligibility}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {yesNo.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label className="field-label">Annual Family Income Limit (Min)</label>
                <input
                  type="number"
                  name="incomeLimitMin"
                  value={formData.incomeLimitMin}
                  onChange={handleChange}
                  placeholder="e.g., 0"
                />
              </div>
              <div className="form-field">
                <label className="field-label">
                  Annual Family Income Limit (Max) <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="incomeLimitMax"
                  value={formData.incomeLimitMax}
                  onChange={handleChange}
                  placeholder="e.g., 500000"
                  required
                />
              </div>
              <div className="form-field">
                <label className="field-label">
                  Minimum Academic Qualification <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="minAcademicQual"
                  value={formData.minAcademicQual}
                  onChange={handleChange}
                  placeholder="e.g., 10+2"
                  required
                />
              </div>
              <div className="form-field">
                <label className="field-label">
                  Minimum Marks / CGPA <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="minMarksCGPA"
                  value={formData.minMarksCGPA}
                  onChange={handleChange}
                  placeholder="e.g., 60% or 6.5 CGPA"
                  required
                />
              </div>
              <div className="form-field">
                <label className="field-label">
                  Gap Year Allowed? <span className="required">*</span>
                </label>
                <select
                  name="gapYearAllowed"
                  value={formData.gapYearAllowed}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  {yesNo.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label className="field-label">Additional Eligibility Criteria</label>
                <textarea
                  name="eligibility"
                  value={formData.eligibility}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Detailed eligibility..."
                />
              </div>
            </div>

            <div className="card">
              <h2 className="section-title">Age & Academic Limits</h2>
              <div className="two-col">
                <div className="form-field">
                  <label className="field-label">Minimum Age</label>
                  <input
                    type="number"
                    name="minAge"
                    value={formData.minAge}
                    onChange={handleChange}
                    placeholder="e.g., 17"
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">Maximum Age</label>
                  <input
                    type="number"
                    name="maxAge"
                    value={formData.maxAge}
                    onChange={handleChange}
                    placeholder="e.g., 25"
                  />
                </div>
              </div>
              {renderMultiSelect("yearOfStudy", yearsOfStudy, "Year of Study Eligible")}
            </div>

            <div className="card">
              <h2 className="section-title">Scholarship Benefits</h2>
              <div className="form-field">
                <label className="field-label">Tuition Fee Coverage</label>
                <select
                  name="tuitionCoverage"
                  value={formData.tuitionCoverage}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {yesNo.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label className="field-label">Tuition Fee Amount (₹ / $)</label>
                <input
                  type="number"
                  name="tuitionAmount"
                  value={formData.tuitionAmount}
                  onChange={handleChange}
                  placeholder="e.g., 100000"
                />
              </div>
              <div className="form-field">
                <label className="field-label">Monthly Stipend (Amount)</label>
                <input
                  type="number"
                  name="monthlyStipend"
                  value={formData.monthlyStipend}
                  onChange={handleChange}
                  placeholder="e.g., 5000"
                />
              </div>
              <div className="form-field">
                <label className="field-label">Annual Allowance</label>
                <input
                  type="number"
                  name="annualAllowance"
                  value={formData.annualAllowance}
                  onChange={handleChange}
                  placeholder="e.g., 12000"
                />
              </div>
              <div className="form-field">
                <label className="field-label">Hostel Fee Coverage</label>
                <select
                  name="hostelCoverage"
                  value={formData.hostelCoverage}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {yesNo.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label className="field-label">Books & Study Material Allowance</label>
                <input
                  type="number"
                  name="booksAllowance"
                  value={formData.booksAllowance}
                  onChange={handleChange}
                  placeholder="e.g., 5000"
                />
              </div>
              <div className="form-field">
                <label className="field-label">Travel Allowance</label>
                <input
                  type="number"
                  name="travelAllowance"
                  value={formData.travelAllowance}
                  onChange={handleChange}
                  placeholder="e.g., 2000"
                />
              </div>
              <div className="form-field">
                <label className="field-label">Exam Fee Coverage</label>
                <select
                  name="examFeeCoverage"
                  value={formData.examFeeCoverage}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {yesNo.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label className="field-label">Other Benefits</label>
                <textarea
                  name="otherBenefits"
                  value={formData.otherBenefits}
                  onChange={handleChange}
                  rows="3"
                  placeholder="e.g., Laptop, Insurance..."
                />
              </div>
              <div className="form-field">
                <label className="field-label">Additional Benefits Description</label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Detailed benefits..."
                />
              </div>
            </div>

            <div className="btn-area">
              <button type="button" className="prev-btn" onClick={() => goToStep(1)}>
                ← Previous
              </button>
              <button type="button" className="next-btn" onClick={() => goToStep(3)}>
                Next → Application & Docs
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <div className="card">
              <h2 className="section-title">Application Details</h2>
              <div className="form-field">
                <label className="field-label">
                  Application Mode <span className="required">*</span>
                </label>
                <select
                  name="appMode"
                  value={formData.appMode}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Mode</option>
                  {appModes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label className="field-label">Application URL</label>
                <input
                  type="url"
                  name="appURL"
                  value={formData.appURL}
                  onChange={handleChange}
                  placeholder="https://example.com/apply"
                />
              </div>
              <div className="form-field">
                <label className="field-label">
                  Application Start Date <span className="required">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label className="field-label">
                  Application End Date <span className="required">*</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label className="field-label">Application Deadline Time</label>
                <input
                  type="time"
                  name="deadlineTime"
                  value={formData.deadlineTime}
                  onChange={handleChange}
                  placeholder="e.g., 23:59"
                />
              </div>
              <div className="form-field">
                <label className="field-label">Application Fee (If any)</label>
                <input
                  type="number"
                  name="appFee"
                  value={formData.appFee}
                  onChange={handleChange}
                  placeholder="e.g., 500"
                />
              </div>
              {renderMultiSelect("requiredDocuments", documents, "Required Documents", true)}
            </div>

            <div className="card">
              <h2 className="section-title">Selection Process</h2>
              {renderMultiSelect("selectionMethod", selectionMethods, "Selection Method")}
              <div className="form-field">
                <label className="field-label">Interview Mode</label>
                <select
                  name="interviewMode"
                  value={formData.interviewMode}
                  onChange={handleChange}
                >
                  <option value="">Select Mode</option>
                  {interviewModes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="card">
              <h2 className="section-title">Disbursement Details</h2>
              <div className="form-field">
                <label className="field-label">Scholarship Disbursement Mode</label>
                <select
                  name="disbursementMode"
                  value={formData.disbursementMode}
                  onChange={handleChange}
                >
                  <option value="">Select Mode</option>
                  {disbursementModes.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label className="field-label">Disbursement Frequency</label>
                <select
                  name="disbursementFrequency"
                  value={formData.disbursementFrequency}
                  onChange={handleChange}
                >
                  <option value="">Select Frequency</option>
                  {frequencies.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="btn-area">
              <button type="button" className="prev-btn" onClick={() => goToStep(2)}>
                ← Previous
              </button>
              <button type="button" className="next-btn" onClick={() => goToStep(4)}>
                Next → Admin & Final
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="form-step">
            <div className="card">
              <h2 className="section-title">Application Status Control (Admin)</h2>
              <div className="form-field">
                <label className="field-label">
                  Scholarship Status <span className="required">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label className="field-label">
                  Visibility <span className="required">*</span>
                </label>
                <select
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Visibility</option>
                  {visibilities.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label className="field-label">Featured Scholarship</label>
                <select
                  name="featured"
                  value={formData.featured}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {yesNo.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="card">
              <h2 className="section-title">Tags & Search Optimization</h2>
              <div className="form-field">
                <label className="field-label">
                  Search Keywords (Comma-separated)
                </label>
                <textarea
                  name="searchKeywords"
                  value={formData.searchKeywords}
                  onChange={handleChange}
                  rows="2"
                  placeholder="e.g., merit, engineering, UG"
                />
              </div>
              <div className="form-field">
                <label className="field-label">Course Tags (Comma-separated)</label>
                <textarea
                  name="courseTags"
                  value={formData.courseTags}
                  onChange={handleChange}
                  rows="2"
                  placeholder="e.g., B.Tech, MBA"
                />
              </div>
              <div className="form-field">
                <label className="field-label">Location Tags (Comma-separated)</label>
                <textarea
                  name="locationTags"
                  value={formData.locationTags}
                  onChange={handleChange}
                  rows="2"
                  placeholder="e.g., Delhi, Maharashtra"
                />
              </div>
            </div>

            <div className="card">
              <h2 className="section-title">Compliance & Verification</h2>
              <div className="two-col">
                <div className="form-field">
                  <label className="field-label">Verified by Admin</label>
                  <select
                    name="verifiedAdmin"
                    value={formData.verifiedAdmin}
                    onChange={handleChange}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="field-label">Source Verified</label>
                  <select
                    name="sourceVerified"
                    value={formData.sourceVerified}
                    onChange={handleChange}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="section-title">Scholarship Duration / Additional Description</h2>
              <div className="form-field">
                <label className="field-label">Duration Type</label>
                <select
                  name="durationType"
                  value={formData.durationType}
                  onChange={handleChange}
                >
                  <option value="">Select Type</option>
                  {durationTypes.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="two-col">
                <div className="form-field">
                  <label className="field-label">Total Duration</label>
                  <input
                    type="number"
                    name="totalDuration"
                    value={formData.totalDuration}
                    onChange={handleChange}
                    placeholder="e.g., 4"
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">Duration Unit</label>
                  <select
                    name="totalDurationUnit"
                    value={formData.totalDurationUnit}
                    onChange={handleChange}
                  >
                    <option value="Years">Years</option>
                    <option value="Months">Months</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label className="field-label">Renewal Criteria</label>
                <textarea
                  name="renewalCriteria"
                  value={formData.renewalCriteria}
                  onChange={handleChange}
                  rows="3"
                  placeholder="e.g., 75% marks, 80% attendance"
                />
              </div>
              <div className="form-field">
                <label className="field-label">General Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Provide a detailed description..."
                />
              </div>
            </div>

            <div className="btn-area">
              <button type="button" className="prev-btn" onClick={() => goToStep(3)}>
                ← Previous
              </button>
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? (
                  <>
                    <svg
                      className="spinner"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="spinner-circle"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="spinner-path"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg
                      className="button-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    Submit Scholarship
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

  // Dynamic step label
  const currentStepLabel = currentStep === 1 
    ? stepTitles[1] 
    : `${currentStep} ${stepTitles[currentStep]}`;

  return (
    <div className="scholar-form-container">
      <header className="scholar-form-header">
        <h1 className="scholar-form-title">Universal Scholarship Registration Form</h1>
        <p className="scholar-form-subtitle">(Admin / Partner / Institute Side)</p>
      </header>

      <nav className="step-navigation">
        <div className="steps-container">
          <div className="step-box active" style={{ flex: 'none', margin: '0 auto' }}>
            {currentStepLabel}
          </div>
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

      <form onSubmit={handleSubmit}>
        {renderStep()}
      </form>
    </div>
  );
}