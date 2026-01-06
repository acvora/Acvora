// Updated: frontend/src/Pages/UniversityRegister.jsx
import React, { useState } from "react";
import "./UniversityRegister.css";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [branches, setBranches] = useState([]);
  const [expandedBranches, setExpandedBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAccreditations, setSelectedAccreditations] = useState([]);
  const [selectedAffiliations, setSelectedAffiliations] = useState([]);

  const totalSteps = 3;

  const accreditations = [
    "NAAC – National Assessment and Accreditation Council",
    "NBA – National Board of Accreditation",
    "NIRF Ranking",
    "AISHE Code (All India Survey on Higher Education)",
    "AICTE Approval – All India Council for Technical Education",
    "PCI – Pharmacy Council of India",
    "MCI / NMC – National Medical Commission (formerly Medical Council of India)",
    "BCI – Bar Council of India",
    "INC – Indian Nursing Council",
    "DCI – Dental Council of India",
    "COA – Council of Architecture",
    "RCI – Rehabilitation Council of India",
    "NCVT – National Council for Vocational Training",
    "SCVT – State Council for Vocational Training",
    "NABH – National Accreditation Board for Hospitals & Healthcare Providers",
    "NCTE – National Council for Teacher Education",
    "NABET – National Accreditation Board for Education & Training",
    "ICAR – Indian Council of Agricultural Research",
    "IAP – Indian Association of Physiotherapists",
    "VCC – Veterinary Council of India (VCI)",
    "IGNOU Recognition (Distance Education)",
    "DEB – Distance Education Bureau (UGC)",
    "AACSB – Association to Advance Collegiate Schools of Business",
    "AMBA – Association of MBAs",
    "EQUIS – EFMD Quality Improvement System",
    "ACBSP – Accreditation Council for Business Schools and Programs",
    "ABET – Accreditation Board for Engineering & Technology",
    "WES / IQAS Recognized",
    "QAA – UK Quality Assurance Agency",
    "TESQA – Australia",
    "EduTrust Singapore"
  ];

  const affiliations = [
    "UGC – University Grants Commission",
    "UGC – Deemed to be University Status",
    "MoE – Ministry of Education India",
    "AIU – Association of Indian Universities Membership",
    "IHM / NCHMCT Affiliation (Hotel Management)",
    "State Teacher Education University Affiliation",
    "RGUHS – Rajiv Gandhi University of Health Sciences (Karnataka)",
    "MUHS – Maharashtra University of Health Sciences",
    "BABA FARID University of Health Sciences (Punjab)",
    "NSDC – National Skill Development Corporation",
    "TN Dr. MGR Medical University",
    "VTU – Visvesvaraya Technological University",
    "Maulana Abul Kalam Azad University of Technology – West Bengal",
    "Mumbai University",
    "Delhi University (DU)",
    "Pune University (SPPU)",
    "Anna University",
    "Osmania University",
    "JNTU",
    "AKTU – Dr. A.P.J. Abdul Kalam Technical University",
    "Rashtrasant Tukadoji Maharaj Nagpur University – Nagpur University",
    "Madurai Kamaraj University",
    "IGNOU Affiliated Centre",
    "Institute of National Importance",
    "Institute of National Importance - IIT",
    "Institute of National Importance - NIT",
    "Institute of National Importance - IIIT",
    "Institute of National Importance - IIM",
    "Institute of National Importance - AIIMS",
    "Skill India / PMKVY Training Partner"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue;
    if (type === "checkbox") {
      newValue = checked;
    } else {
      newValue = value;
    }
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleFileChange = (e) => {
    const { name, files: uploadedFiles } = e.target;
    if (
      name === "logo" ||
      name === "accreditationDoc" ||
      name === "affiliationDoc" ||
      name === "registrationDoc" ||
      name === "file" ||
      name === "cutoffExcel" ||
      name === "admissionsExcel" ||
      name === "placementsExcel"
    ) {
      setFiles({
        ...files,
        [name]: uploadedFiles[0], // Single file
      });
    } else {
      setFiles({
        ...files,
        [name]: Array.from(uploadedFiles), // Multiple files
      });
    }
  };

  const addAccreditation = (value) => {
    if (value && !selectedAccreditations.includes(value)) {
      setSelectedAccreditations([...selectedAccreditations, value]);
    }
  };

  const removeAccreditation = (index) => {
    const newList = [...selectedAccreditations];
    newList.splice(index, 1);
    setSelectedAccreditations(newList);
  };

  const addAffiliation = (value) => {
    if (value && !selectedAffiliations.includes(value)) {
      setSelectedAffiliations([...selectedAffiliations, value]);
    }
  };

  const removeAffiliation = (index) => {
    const newList = [...selectedAffiliations];
    newList.splice(index, 1);
    setSelectedAffiliations(newList);
  };

  const handleFacilityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedFacilities([...selectedFacilities, value]);
      setFormData((prev) => ({
        ...prev,
        facilities: [
          ...(prev.facilities || []),
          { name: value, description: "" },
        ],
      }));
    } else {
      setSelectedFacilities(selectedFacilities.filter((f) => f !== value));
      setFormData((prev) => ({
        ...prev,
        facilities: (prev.facilities || []).filter((f) => f.name !== value),
      }));
    }
  };

  const addBranch = () => {
    const newIndex = branches.length;
    setBranches([...branches, { name: "", avgLPA: "", highestLPA: "" }]);
    setExpandedBranches([...expandedBranches, newIndex]);
  };

  const removeBranch = (index) => {
    setBranches(branches.filter((_, i) => i !== index));
    setExpandedBranches(expandedBranches.filter((i) => i !== index));
  };

  const toggleExpand = (index) => {
    setExpandedBranches((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleBranchChange = (index, field, value) => {
    const newBranches = [...branches];
    newBranches[index][field] = value;
    setBranches(newBranches);
  };

  const next = () => {
    if (step === 1) {
      if (!files.bannerImage || files.bannerImage.length < 3) {
        alert("Please upload at least 3 banner images.");
        return;
      }
      if (!files.aboutImages || files.aboutImages.length < 5) {
        alert("Please upload at least 5 about images.");
        return;
      }
    }
    setStep((s) => Math.min(totalSteps, s + 1));
  };

  const prev = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Show loader

    try {
      // -----------------------------
      // 1. Prepare main payload
      // -----------------------------
      const payload = new FormData();

      // Append text fields except facilities
      Object.entries(formData).forEach(([key, val]) => {
        if (key !== "facilities") {
          payload.append(key, val);
        }
      });

      // Facilities (stringify array)
      if (formData.facilities?.length) {
        payload.append("facilities", JSON.stringify(formData.facilities));
      }

      // Branches
      if (branches?.length) {
        payload.append("branches", JSON.stringify(branches));
      }

      // Accreditations and Affiliations
      if (selectedAccreditations.length > 0) {
        payload.append("accreditations", JSON.stringify(selectedAccreditations));
      }
      if (selectedAffiliations.length > 0) {
        payload.append("affiliations", JSON.stringify(selectedAffiliations));
      }

      // ✅ Only files allowed in POST /api/universities
      const ALLOWED_MAIN_FILES = [
        "logo",
        "bannerImage",
        "aboutImages",
        "accreditationDoc",
        "affiliationDoc",
        "registrationDoc",
        "videos",
        "infraPhotos",
        "eventPhotos",
        "galleryImages",
        "recruitersLogos",
      ];

      Object.entries(files).forEach(([key, fileList]) => {
        if (!ALLOWED_MAIN_FILES.includes(key)) return;
        if (!fileList) return;

        if (Array.isArray(fileList)) {
          fileList.forEach((f) => payload.append(key, f));
        } else {
          payload.append(key, fileList);
        }
      });

      // -----------------------------
      // 2. Register institute
      // -----------------------------
      const baseUrl = "https://acvora-07fo.onrender.com";

      const res = await fetch(`${baseUrl}/api/universities`, {
        method: "POST",
        body: payload,
      });

      if (!res.ok) {
        console.error("❌ Registration failed:", await res.text());
        alert("❌ Institute registration failed!");
        return;
      }

      const data = await res.json();
      console.log("✅ Institute registered:", data);

      if (!data?.data?._id) {
        alert("❌ Institute not created!");
        return;
      }

      // ✅ store instituteId in localStorage and variable
      const instituteId = data.data._id;
      localStorage.setItem("instituteId", instituteId);

      // -----------------------------
      // 3. Helper for uploads
      // -----------------------------
      const uploadFile = async (url, formData, label) => {
        const r = await fetch(url, { method: "POST", body: formData });
        if (!r.ok) {
          console.error(`❌ ${label} upload failed:`, await r.text());
          alert(`❌ ${label} upload failed!`);
          throw new Error(`${label} upload failed`);
        }
        console.log(`✅ ${label} uploaded`);
      };

      // -----------------------------
      // 4. Upload extras (if provided)
      // -----------------------------
      if (files.file) {
        const fd = new FormData();
        fd.append("file", files.file);
        await uploadFile(
          `${baseUrl}/api/universities/${instituteId}/courses/upload`,
          fd,
          "Courses"
        );
      }

      if (files.cutoffExcel) {
        const fd = new FormData();
        fd.append("file", files.cutoffExcel);
        await uploadFile(
          `${baseUrl}/api/cutoff/${instituteId}/cutoff/upload`,
          fd,
          "Cutoff"
        );
      }

      if (files.admissionsExcel) {
        const fd = new FormData();
        fd.append("file", files.admissionsExcel);
        await uploadFile(
          `${baseUrl}/api/admissions/${instituteId}/admissions/upload`,
          fd,
          "Admissions"
        );
      }

      if (files.placementsExcel) {
        const fd = new FormData();
        fd.append("file", files.placementsExcel);
        await uploadFile(
          `${baseUrl}/api/universities/${instituteId}/placements/upload`,
          fd,
          "Placements"
        );
      }

      if (files.infraPhotos || files.eventPhotos || files.galleryImages) {
        const fd = new FormData();
        files.infraPhotos?.forEach((f) => fd.append("infraPhotos", f));
        files.eventPhotos?.forEach((f) => fd.append("eventPhotos", f));
        files.galleryImages?.forEach((f) => fd.append("galleryImages", f));
        await uploadFile(
          `${baseUrl}/api/universities/${instituteId}/gallery/upload`,
          fd,
          "Gallery"
        );
      }

      if (files.recruitersLogos?.length) {
        const fd = new FormData();
        files.recruitersLogos.forEach((f) => fd.append("recruitersLogos", f));
        await uploadFile(
          `${baseUrl}/api/recruiters/${instituteId}/recruiters/upload`,
          fd,
          "Recruiters logos"
        );
      }

      // -----------------------------
      // 5. Success
      // -----------------------------
      alert("🎉 Institute Registered Successfully!");
    } catch (err) {
      console.error("❌ Error submitting form:", err);
      alert("❌ Form submission failed!");
    } finally {
      setLoading(false); // ✅ Hide loader
    }
  };

  const facilityOptions = [
    "hostel",
    "library",
    "labs",
    "researchCenters",
    "sports",
    "cafeteria",
    "auditorium",
    "medical",
    "transport",
    "itFacilities",
    "placementCell",
    "internshipTieups",
  ];

  const getShortName = (fullName) => {
    const parts = fullName.split(' – ');
    return parts[0] || fullName;
  };

  const isExpanded = (index) => expandedBranches.includes(index);

  return (
    <div className="univ-app-container">
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
          <p>Processing... Please wait</p>
        </div>
      )}
     
      <header className="univ-header">
        <h1 className="univ-header-title">Institute Registration</h1>
        <p className="univ-header-subtitle">Complete the multi-step registration to showcase your institute</p>
      </header>

      <main className="univ-main-container">
        <form
          className="univ-multi-step-form wide-form"
          onSubmit={handleSubmit}
        >
          {step === 1 && (
            <div className="univ-form-step grid-3">
              <h3>Step 1: Institute Basics, Hero/About & Contact/Campus Info</h3>
              <div className="field-group">
                <h4>Basic Information</h4>
                <input
                  name="instituteName"
                  placeholder="Institute Name"
                  onChange={handleChange}
                  title="Enter the full name of the institute. This will appear in the hero section."
                />
                <select
                  name="type"
                  onChange={handleChange}
                  title="Select the type of institution. Used in hero display."
                >
                  <option value="">Select Type</option>
                  <option>University</option>
                  <option>College</option>
                  <option>Institute</option>
                </select>
                <input
                  name="year"
                  placeholder="Establishment Year"
                  onChange={handleChange}
                  title="Year the institute was established, e.g., 1998. Shown in hero."
                />
                <select
                  name="ownership"
                  onChange={handleChange}
                  title="Ownership type. Displayed in hero."
                >
                  <option value="">Select Ownership</option>
                  <option>Private</option>
                  <option>Government</option>
                  <option>Deemed</option>
                  <option>Autonomous</option>
                </select>
                <input
                  name="students"
                  placeholder="No. of Students (e.g., 78234)"
                  onChange={handleChange}
                  title="Total number of students. Hero display."
                />
                <input
                  name="faculty"
                  placeholder="No. of Faculty (e.g., 234)"
                  onChange={handleChange}
                  title="Total faculty count. Hero section."
                />
              </div>
              <div className="field-group">
                <h4>Accreditations & Affiliations</h4>
                <div className="acc-aff-row">
                  <div className="accreditation-section">
                    <label>Accreditations</label>
                    <div className="selected-tags">
                      {selectedAccreditations.map((acc, index) => (
                        <span key={index} className="tag">
                          {getShortName(acc)}
                          <button
                            type="button"
                            onClick={() => removeAccreditation(index)}
                            className="remove-tag"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          addAccreditation(e.target.value);
                          e.target.value = "";
                        }
                      }}
                      defaultValue=""
                    >
                      <option value="">Select from list</option>
                      {accreditations.map((acc) => (
                        <option key={acc} value={acc}>
                          {acc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="affiliation-section">
                    <label>Affiliations</label>
                    <div className="selected-tags">
                      {selectedAffiliations.map((aff, index) => (
                        <span key={index} className="tag">
                          {getShortName(aff)}
                          <button
                            type="button"
                            onClick={() => removeAffiliation(index)}
                            className="remove-tag"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          addAffiliation(e.target.value);
                          e.target.value = "";
                        }
                      }}
                      defaultValue=""
                    >
                      <option value="">Select from list</option>
                      {affiliations.map((aff) => (
                        <option key={aff} value={aff}>
                          {aff}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field-group">
                <h4>Visual Assets</h4>
                <label>Upload Logo</label>
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label>Upload Banner Images (at least 3)</label>
                <input
                  type="file"
                  name="bannerImage"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label>Upload About Images (at least 5)</label>
                <input
                  type="file"
                  name="aboutImages"
                  multiple
                  onChange={handleFileChange}
                  title="Upload at least 5 images for the about section (e.g., campus views)."
                />
              </div>
              <div className="field-group">
                <h4>Campus & Contact Info</h4>
                <input
                  name="address"
                  placeholder="Campus Address"
                  onChange={handleChange}
                  title="Full campus address. Used in info section."
                />
                <select
                  name="state"
                  onChange={handleChange}
                  title="Select state. Part of location in info."
                >
                  <option value="">Select State</option>
                  <option>Maharashtra</option>
                  <option>Karnataka</option>
                  <option>Delhi</option>
                  <option>Tamil Nadu</option>
                  <option>Uttar Pradesh</option>
                </select>
                <input
                  name="city"
                  placeholder="City (e.g., Gurgaon)"
                  onChange={handleChange}
                  title="City name. Displayed in hero and info."
                />
                <input
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  title="Contact email."
                />
                <input
                  name="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                  title="Contact phone number."
                />
                <input
                  name="website"
                  placeholder="Website"
                  onChange={handleChange}
                  title="Institute website URL."
                />
                <input
                  name="socialMedia"
                  placeholder="Social Media Links (comma-separated)"
                  onChange={handleChange}
                  title="List social media links, separated by commas."
                />
              </div>
              <div className="field-group">
                <h4>Placements & Campus Details</h4>
                <input
                  name="topRecruiters"
                  placeholder="Top Recruiters (comma-separated)"
                  onChange={handleChange}
                  title="List top recruiters for info section."
                />
                <input
                  name="highestPackage"
                  placeholder="Highest Package (LPA)"
                  onChange={handleChange}
                  title="Highest placement package. Info section."
                />
                <input
                  name="avgPackage"
                  placeholder="Average Package (LPA)"
                  onChange={handleChange}
                  title="Average placement package. Info section."
                />
                <input
                  name="campusSize"
                  placeholder="Campus Size (e.g., 50 acres)"
                  onChange={handleChange}
                  title="Campus size details."
                />
                <input
                  name="hostelFee"
                  placeholder="Hostel Fee"
                  onChange={handleChange}
                  title="Hostel fee details."
                />
                <input
                  name="studentRating"
                  placeholder="Student Rating (e.g., 4.5/5)"
                  onChange={handleChange}
                  title="Overall student rating."
                />
                <input
                  name="nirfRank"
                  placeholder="NIRF Rank"
                  onChange={handleChange}
                  title="NIRF ranking."
                />
              </div>
              <div className="field-group">
                <h4>About Description</h4>
                <textarea
                  name="description"
                  placeholder="About the Institute (Detailed Description)"
                  rows={4}
                  onChange={handleChange}
                  title="Provide a detailed description about the institute. This will be displayed in the about section."
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="univ-form-step grid-3">
              <h3>Step 2: Academics, Placements & Facilities/Gallery</h3>
              <div className="field-group">
                <h4>Academic Data Uploads</h4>
                <label>Upload Courses & Fees Excel (courses.xlsx)</label>
                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  accept=".xlsx"
                  title="Upload Excel file with columns: Course Name, Total Fee, Yearly Fees, Duration, Intake."
                />
                <label>Upload Cutoffs Excel (cutoff.xlsx)</label>
                <input
                  type="file"
                  name="cutoffExcel"
                  onChange={handleFileChange}
                  accept=".xlsx"
                  title="Upload Excel file with columns: Courses, Open, General, EWS, OBC, SC, ST, PWD."
                />
                <input
                  name="popularCourses"
                  placeholder="Popular Courses (comma-separated)"
                  onChange={handleChange}
                  title="List popular courses for info section."
                />
              </div>
              <div className="field-group">
                <h4>Placements Data</h4>
                <input
                  name="placementRate"
                  placeholder="Placement Rate (%)"
                  value={formData.placementRate || ""}
                  onChange={handleChange}
                  title="Overall placement rate."
                />
                <label>Upload Year-wise Placements Excel (placements.xlsx)</label>
                <input
                  type="file"
                  name="placementsExcel"
                  onChange={handleFileChange}
                  accept=".xlsx"
                  title="Upload Excel with columns: Year, Companies, Placed, Highest CTC, Avg CTC."
                />
                <label>Upload Top Recruiters Logos</label>
                <input
                  type="file"
                  name="recruitersLogos"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
              <div className="field-group" style={{ height: 'auto', minHeight: '300px' }}>
                <h4>Branch-wise Placements</h4>
                <button
                  type="button"
                  onClick={addBranch}
                  className="univ-add-btn"
                >
                  + Add Branch
                </button>

                {branches.map((branch, index) => (
                  <div key={index} className="branch-group">
                    <div 
                      className="branch-header"
                      onClick={() => toggleExpand(index)}
                    >
                      <h4>{branch.name || `Branch ${index + 1}`}</h4>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeBranch(index);
                        }}
                        className="remove-branch-btn"
                        title="Remove this branch"
                      >
                        × Remove
                      </button>
                    </div>
                    {isExpanded(index) && (
                      <div className="branch-inputs">
                        <input
                          placeholder="Branch Name"
                          value={branch.name}
                          onChange={(e) =>
                            handleBranchChange(index, "name", e.target.value)
                          }
                          title="Enter branch name for dropdown."
                        />
                        <input
                          placeholder="Avg Package (₹ LPA)"
                          value={branch.avgLPA || ""}
                          onChange={(e) =>
                            handleBranchChange(index, "avgLPA", e.target.value)
                          }
                          title="Average package for this branch."
                        />
                        <input
                          placeholder="Highest Package (₹ LPA)"
                          value={branch.highestLPA || ""}
                          onChange={(e) =>
                            handleBranchChange(
                              index,
                              "highestLPA",
                              e.target.value
                            )
                          }
                          title="Highest package for this branch."
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="field-group" style={{ height: 'auto', minHeight: '300px' }}>
                <h4>Facilities</h4>
                <p style={{ marginBottom: '0.75rem', fontSize: '0.8125rem', color: '#4a5568' }}>Select facilities</p>
                <div className="facilities-grid">
                  {facilityOptions.map((fac) => (
                    <label key={fac} className={`univ-checkbox-label ${selectedFacilities.includes(fac) ? 'checked' : ''}`}>
                      <input
                        type="checkbox"
                        value={fac}
                        checked={selectedFacilities.includes(fac)}
                        onChange={handleFacilityChange}
                      />
                      <span>{fac.charAt(0).toUpperCase() + fac.slice(1)}</span>
                    </label>
                  ))}
                </div>
                <div style={{ maxHeight: '200px', overflowY: 'auto', marginTop: '0.75rem' }}>
                  {selectedFacilities.map((fac) => (
                    <div key={fac} className="field-group" style={{ marginTop: '0.75rem', padding: '1rem' }}>
                      <label>Description for {fac.charAt(0).toUpperCase() + fac.slice(1)}</label>
                      <textarea
                        name={`facility_${fac}_desc`}
                        placeholder={`Description for ${
                          fac.charAt(0).toUpperCase() + fac.slice(1)
                        }`}
                        rows={3}
                        value={
                          (formData.facilities || []).find((f) => f.name === fac)
                            ?.description || ""
                        }
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            facilities: [
                              ...(prev.facilities || []).filter(
                                (f) => f.name !== fac
                              ),
                              { name: fac, description: e.target.value },
                            ],
                          }))
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="field-group" style={{ height: 'auto', minHeight: '300px' }}>
                <h4>Gallery Uploads</h4>
                <label>Upload Infrastructure Photos</label>
                <input
                  type="file"
                  name="infraPhotos"
                  multiple
                  onChange={handleFileChange}
                  title="Upload photos related to infrastructure for gallery."
                />
                <label>Upload Event Photos</label>
                <input
                  type="file"
                  name="eventPhotos"
                  multiple
                  onChange={handleFileChange}
                  title="Upload photos related to events for gallery."
                />
                <label>Upload Additional Gallery Images</label>
                <input
                  type="file"
                  name="galleryImages"
                  multiple
                  onChange={handleFileChange}
                  title="Upload any additional images for the gallery section."
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="univ-form-step grid-3">
              <h3>Step 3: Admissions, International, Documents & Account</h3>
              <div className="field-group">
                <h4>Admissions Data</h4>
                <label>Upload Admissions Excel (admissions.xlsx)</label>
                <input
                  type="file"
                  name="admissionsExcel"
                  onChange={handleFileChange}
                  accept=".xlsx"
                  title="Upload Excel with columns: Course Name, Eligibility, Specialization, Fee, Highest Pack, Avg Package."
                />
                <textarea
                  name="admissionDetails"
                  placeholder="Overall Admission Details"
                  rows={3}
                  onChange={handleChange}
                  title="Provide general admission information."
                />
                <input
                  name="scholarships"
                  placeholder="Scholarships (comma-separated)"
                  onChange={handleChange}
                  title="List available scholarships."
                />
              </div>
              <div className="field-group">
                <h4>International Students</h4>
                <input
                  name="intlStudentOffice"
                  placeholder="Intl. Student Office"
                  onChange={handleChange}
                  title="Details about international student office."
                />
                <input
                  name="countriesEnrolled"
                  placeholder="Countries Enrolled (comma-separated)"
                  onChange={handleChange}
                  title="Countries from which students are enrolled."
                />
                <input
                  name="foreignMoUs"
                  placeholder="Foreign MoUs (comma-separated)"
                  onChange={handleChange}
                  title="List of foreign MoUs."
                />
                <input
                  name="languageSupport"
                  placeholder="Language Support"
                  onChange={handleChange}
                  title="Language support details."
                />
                <input
                  name="visaSupport"
                  placeholder="Visa Support"
                  onChange={handleChange}
                  title="Visa assistance details."
                />
              </div>
              <div className="field-group">
                <h4>Documents</h4>
                <label>Upload Accreditation Doc</label>
                <input
                  type="file"
                  name="accreditationDoc"
                  onChange={handleFileChange}
                  title="Upload accreditation document."
                />
                <label>Upload Affiliation Doc</label>
                <input
                  type="file"
                  name="affiliationDoc"
                  onChange={handleFileChange}
                  title="Upload affiliation document."
                />
                <label>Upload Registration Doc</label>
                <input
                  type="file"
                  name="registrationDoc"
                  onChange={handleFileChange}
                  title="Upload registration document."
                />
                <label>Upload Videos</label>
                <input
                  type="file"
                  name="videos"
                  multiple
                  onChange={handleFileChange}
                  title="Upload promotional or campus videos."
                />
              </div>
              <div className="field-group">
                <h4>Account Setup</h4>
                <input
                  name="emailUsername"
                  placeholder="Email (Username)"
                  onChange={handleChange}
                  title="Email to use as username for account."
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  title="Set a password for the account."
                />
                <select
                  name="subscriptionPlan"
                  onChange={handleChange}
                  title="Select subscription plan."
                >
                  <option value="">Select Plan</option>
                  <option value="free">Free</option>
                  <option value="standard">Standard ₹999/mo</option>
                  <option value="premium">Premium ₹1999/mo</option>
                </select>
                <label className="univ-checkbox-label">
                  <input
                    type="checkbox"
                    name="declaration"
                    checked={formData.declaration || false}
                    onChange={handleChange}
                  />
                  I confirm all details are correct
                </label>
                <button type="submit" className="univ-submit-btn">
                  Submit & Register
                </button>
              </div>
            </div>
          )}

          <div className="univ-form-nav">
            {step > 1 && step <= totalSteps && (
              <button type="button" onClick={prev} className="univ-nav-btn">
                ⬅ Previous
              </button>
            )}
            {step < totalSteps && (
              <button 
                type="button" 
                onClick={next} 
                className="univ-nav-btn"
                style={{ marginLeft: 'auto' }}
              >
                Next ➡
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}