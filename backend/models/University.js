import mongoose from "mongoose";

/* ---------------- Courses Sub-schema ---------------- */
const courseSchema = new mongoose.Schema({
  courseName: String,
  duration: String,
  totalFees: String,
  yearlyFees: String,
  intake: String,
  applyLink: String,
});

/* ---------------- Cutoff Sub-schema ---------------- */
const cutoffSchema = new mongoose.Schema({
  course: String,
  open: String,
  general: String,
  ews: String,
  obc: String,
  sc: String,
  st: String,
  pwd: String,
});

/* ---------------- Placements Sub-schema ---------------- */
const placementSchema = new mongoose.Schema({
  year: String,
  companies: String,
  placed: String,
  highestCTC: String,
  avgCTC: String,
});

/* ---------------- Admissions Sub-schema ---------------- */
const admissionSchema = new mongoose.Schema({
  courseName: String,
  eligibility: String,
  specialization: String,
  fee: String,
  highestPack: String,
  avgPack: String,
});

/* ---------------- Branch Sub-schema ---------------- */
const branchSchema = new mongoose.Schema({
  name: String,
  avgPackage: String,
  highestPackage: String,
});

/* ---------------- Facilities Sub-schema ---------------- */
const facilitySchema = new mongoose.Schema({
  name: String,
  description: String,
});

/* ---------------- University Schema ---------------- */
const universityRegistrationSchema = new mongoose.Schema({
  // Step 0: Basic Info
  instituteName: String,
  type: String,
  year: String,
  ownership: String,
  // ✅ FIXED: Updated to arrays to match frontend (selectedAccreditations/selectedAffiliations)
  accreditations: [String],  // e.g., ["NAAC A++", "UGC"]
  affiliations: [String],    // e.g., ["AICTE", "University Grants Commission"]
  students: String,
  faculty: String,
  modeOfEducation: [String], // ✅ NEW: Added from frontend form

  // Step 1: About Section
  description: String, // ✅ matches frontend AboutUs.jsx
  aboutImages: [String],

  // Step 2: Contact & Location
  address: String,
  state: String,
  city: String,
  pinCode: String, // ✅ NEW: Added from frontend form
  email: String,
  phone: String,
  website: String,
  socialMedia: String,

  // Step 3: Key Persons
  contactPerson: String, // ✅ NEW: Added from frontend form
  chancellor: String,
  viceChancellor: String,
  registrar: String,
  deans: String,
  principal: String,
  admissionOfficer: String,
  placementOfficer: String,
  researchHead: String,
  intlRelationsOfficer: String,

  // Step 4: Courses & Cutoffs
  courses: [courseSchema],
  cutoffs: [cutoffSchema],

  // Step 5: Placements
  placements: [placementSchema],
  branches: [branchSchema],
  recruitersLogos: [String],
  placementRate: String,

  // Step 6: Admissions
  admissions: [admissionSchema],
  admissionDetails: String,
  scholarships: [String],

  // Step 7: Facilities
  facilities: [facilitySchema],

  // Step 8: International Section
  intlStudentOffice: String,
  countriesEnrolled: String,
  foreignMoUs: String,
  languageSupport: String,
  visaSupport: String,

  // Step 9: Gallery (✅ Fixed)
  gallery: {
    infraPhotos: { type: [String], default: [] },
    eventPhotos: { type: [String], default: [] },
    otherPhotos: { type: [String], default: [] },
  },

  // Step 9: Documents
  docs: {
    type: Object,
    default: {
      accreditationDoc: [],
      affiliationDoc: [],
      registrationDoc: [],
      videos: [],
      courseFiles: [],
    },
  },

  /* ---------------- Info Section Extras ---------------- */
  highestPackage: String,
  avgPackage: String,
  topRecruiters: [String],
  popularCourses: [String],
  campusSize: String,
  hostelFee: String,
  nirfRank: String,
  library: String,
  sportsFacilities: String,
  studentRating: String,

  // File uploads
  logo: [String],
  bannerImage: [String],
  photos: [String],
  videos: [String],
  courseFiles: [String],
  accreditationDoc: [String],
  affiliationDoc: [String],
  registrationDoc: [String],

  // Auth Section
  emailUsername: String,
  password: String,
  subscriptionPlan: {
    type: String,
    enum: ["free", "standard", "premium"],
    default: "free",
  },

  status: {
    type: String,
    enum: ["hold", "approved", "flagged", "blocked"],
    default: "hold", // All new registrations start here
  },

  // ✅ NEW: Admin Remarks (Optional)
  adminRemarks: { type: String, default: "" },

  // Declaration
  declaration: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
});

const UniversityRegistration = mongoose.model(
  "UniversityRegistration",
  universityRegistrationSchema
);

export default UniversityRegistration;