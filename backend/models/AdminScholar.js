import mongoose from "mongoose";

const adminScholarSchema = new mongoose.Schema(
  {
    /* ===============================
       1. Basic Scholarship Info
    ================================ */
    name: { type: String, required: true, trim: true },
    code: { type: String, trim: true },
    provider: { type: String, required: true, trim: true },
    providerType: { type: String, trim: true },
    country: { type: String, default: "India" },
    state: { type: String, trim: true },
    websiteURL: { type: String, trim: true },

    /* ===============================
       2. Category & Type
    ================================ */
    level: { type: String, trim: true },
    type: [{ type: String }],
    coverageType: { type: String },

    /* ===============================
       3. Courses & Study
    ================================ */
    discipline: [{ type: String }],
    degreeTypes: [{ type: String }],
    modeOfStudy: { type: String },

    /* ===============================
       4. Eligibility
    ================================ */
    nationality: { type: String },
    domicileReq: { type: String },
    categoryEligibility: [{ type: String }],
    genderEligibility: { type: String },
    disabilityEligibility: { type: String },
    incomeLimitMin: { type: Number },
    incomeLimitMax: { type: Number },
    minAcademicQual: { type: String },
    minMarksCGPA: { type: String },
    gapYearAllowed: { type: String },

    /* ===============================
       5. Age & Academic Limits
    ================================ */
    minAge: { type: Number },
    maxAge: { type: Number },
    yearOfStudy: [{ type: String }],

    /* ===============================
       6. Benefits
    ================================ */
    tuitionCoverage: { type: String },
    tuitionAmount: { type: Number },
    monthlyStipend: { type: Number },
    annualAllowance: { type: Number },
    hostelCoverage: { type: String },
    booksAllowance: { type: Number },
    travelAllowance: { type: Number },
    examFeeCoverage: { type: String },
    otherBenefits: { type: String },
    benefits: { type: String },

    /* ===============================
       7. Duration
    ================================ */
    durationType: { type: String },
    totalDuration: { type: Number },
    totalDurationUnit: { type: String },
    renewalCriteria: { type: String },

    /* ===============================
       8. Application Details
    ================================ */
    appMode: { type: String },
    appURL: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    deadlineTime: { type: String },
    appFee: { type: Number },

    /* ===============================
       9. Documents
    ================================ */
    requiredDocuments: [{ type: String }],

    /* ===============================
       10. Selection
    ================================ */
    selectionMethod: [{ type: String }],
    interviewMode: { type: String },

    /* ===============================
       11. Disbursement
    ================================ */
    disbursementMode: { type: String },
    disbursementFrequency: { type: String },

    /* ===============================
       12. Status & Visibility
    ================================ */
    status: {
      type: String,
      enum: ["Draft", "Active", "Closed", "Expired"],
      default: "Draft",
    },
    visibility: { type: String },
    featured: { type: String },

    /* ===============================
       13. Search & Tags
    ================================ */
    tags: [{ type: String }],

    /* ===============================
       14. Verification
    ================================ */
    verifiedAdmin: { type: String, default: "No" },
    sourceVerified: { type: String, default: "No" },

    /* ===============================
       Extra
    ================================ */
    description: { type: String },
    eligibility: { type: String },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const AdminScholar =
  mongoose.models.AdminScholar ||
  mongoose.model("AdminScholar", adminScholarSchema);

export default AdminScholar;
