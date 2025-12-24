import mongoose from "mongoose";

// 🔥 FORCE DELETE OLD MODEL IF EXISTS (IMPORTANT)
if (mongoose.models.AdminScholar) {
  delete mongoose.models.AdminScholar;
}

const adminScholarSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, trim: true },
    provider: { type: String, required: true, trim: true },
    providerType: { type: String },
    country: { type: String, default: "India" },
    state: { type: String },
    websiteURL: { type: String },

    level: { type: String },

    // ✅ MUST BE ARRAY
    type: [{ type: String }],

    coverageType: { type: String },

    discipline: [{ type: String }],
    degreeTypes: [{ type: String }],
    modeOfStudy: { type: String },

    nationality: String,
    domicileReq: String,
    categoryEligibility: [{ type: String }],
    genderEligibility: String,
    disabilityEligibility: String,

    incomeLimitMin: Number,
    incomeLimitMax: Number,

    minAcademicQual: String,
    minMarksCGPA: String,
    gapYearAllowed: String,

    minAge: Number,
    maxAge: Number,
    yearOfStudy: [{ type: String }],

    tuitionCoverage: String,
    tuitionAmount: Number,
    monthlyStipend: Number,
    annualAllowance: Number,
    hostelCoverage: String,
    booksAllowance: Number,
    travelAllowance: Number,
    examFeeCoverage: String,

    otherBenefits: String,
    benefits: String,

    durationType: String,
    totalDuration: Number,
    totalDurationUnit: String,
    renewalCriteria: String,

    appMode: String,
    appURL: String,
    startDate: Date,
    endDate: Date,
    deadlineTime: String,
    appFee: Number,

    requiredDocuments: [{ type: String }],
    selectionMethod: [{ type: String }],
    interviewMode: String,

    disbursementMode: String,
    disbursementFrequency: String,

    status: {
      type: String,
      enum: ["Draft", "Active", "Closed", "Expired"],
      default: "Draft",
    },

    visibility: String,
    featured: String,

    tags: [{ type: String }],

    verifiedAdmin: { type: String, default: "No" },
    sourceVerified: { type: String, default: "No" },

    description: String,
    eligibility: String,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
  timestamps: true,
  collection: "admin_scholarships"
}

);

const AdminScholar = mongoose.model("AdminScholar", adminScholarSchema);
export default AdminScholar;
