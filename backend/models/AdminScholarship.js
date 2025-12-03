// models/AdminScholarship.js
import mongoose from "mongoose";

const AdminScholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  provider: { type: String, required: true, trim: true },
  category: { type: String, trim: true },
  income: { type: String, trim: true },
  educationLevel: { type: String, trim: true },
  benefits: { type: String, trim: true },
  // store deadline as Date
  deadline: { type: Date },
  status: { type: String, trim: true },
  description: { type: String, trim: true },
  eligibility: { type: String, trim: true },
  type: { type: String, trim: true },
  region: { type: String, trim: true },
  generalQuota: { type: String, trim: true },
  tags: [{ type: String, trim: true, lowercase: true }],

  // optional if needed later
  universityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UniversityRegistration",
  },
}, { timestamps: true });

export default mongoose.model("AdminScholarship", AdminScholarshipSchema);
