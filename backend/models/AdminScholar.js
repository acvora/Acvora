// backend/models/AdminScholar.js
import mongoose from "mongoose";

const adminScholarSchema = new mongoose.Schema(
  {
    // 1. Basic Info
    name: { type: String, required: true, trim: true },
    code: { type: String, unique: true },
    provider: { type: String, required: true, trim: true },
    providerType: { type: String },
    country: { type: String },
    region: { type: String },
    website: { type: String },

    // 2. Category & Type
    educationLevel: { type: String },
    type: [{ type: String }],
    coverageType: { type: String },

    // 3. Courses
    discipline: [{ type: String }],
    degreeType: [{ type: String }],
    modeOfStudy: [{ type: String }],

    // 4. Eligibility
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

    // 5. Age & Study Year
    minAge: { type: Number },
    maxAge: { type: Number },
    yearOfStudy: [{ type: String }],

    // 6. Benefits
    tuitionCoverage: { type: String },
    tuitionAmount: { type: String },
    monthlyStipend: { type: String },
    annualAllowance: { type: String },
    hostelCoverage: { type: String },
    booksAllowance: { type: String },
    travelAllowance: { type: String },
    examFeeCoverage: { type: String },
    otherBenefits: { type: String },

    // 7. Duration
    durationType: { type: String },
    totalDuration: { type: String },
    renewalCriteria: { type: String },

    // 8. Application
    applicationMode: { type: String },
    applicationURL: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    deadlineTime: { type: String },
    applicationFee: { type: Number },

    // 9. Documents
    documentsRequired: [{ type: String }],

    // 10. Selection
    selectionMethod: [{ type: String }],
    interviewMode: { type: String },

    // 11. Disbursement
    disbursementMode: { type: String },
    disbursementFrequency: { type: String },

    // 12. Status Control
    status: {
      type: String,
      enum: ["Draft", "Active", "Closed", "Expired"],
      required: true,
    },
    visibility: { type: String },
    featured: { type: String },

    // 13. Tags & SEO
    searchKeywords: { type: String },
    popularTags: { type: String },
    courseTags: { type: String },
    locationTags: { type: String },
    tags: [{ type: String }],

    // 14. Verification
    verifiedByAdmin: { type: String },
    sourceVerified: { type: String },

    // Legacy
    benefits: { type: String },
    description: { type: String },
    eligibility: { type: String },
    generalQuota: { type: String },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Auto-generate scholarship code
adminScholarSchema.pre("save", function (next) {
  if (!this.code) {
    this.code = "SCH-" + Date.now();
  }
  next();
});

export default mongoose.model("AdminScholar", adminScholarSchema);
