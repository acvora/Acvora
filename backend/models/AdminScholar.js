import mongoose from "mongoose";

const adminScholarSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, trim: true },

    provider: { type: String, required: true, trim: true },
    providerType: String,

    country: { type: String, default: "India", trim: true },
    state: String,
    websiteURL: String,

    level: String,
    type: [{ type: String }],
    coverageType: String,

    discipline: [{ type: String }],
    degreeTypes: [{ type: String }],
    modeOfStudy: String,

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

    benefits: String,
    otherBenefits: String,

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

    // ✅ FIXED ENUM (THIS WAS THE BUG)
    status: {
      type: String,
      enum: ["Draft", "Active", "Closed", "Expired"],
      default: "Draft",
      trim: true,
    },

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
    collection: "admin_scholarships",
  }
);

const AdminScholar = mongoose.model("AdminScholar", adminScholarSchema);
export default AdminScholar;
