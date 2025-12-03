// models/AdminScholarship.js
import mongoose from "mongoose";

/*
  Renamed from the uploaded Scholarship.js file.
*/

const AdminScholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  provider: { type: String, required: true },
  category: String,
  income: String,
  educationLevel: String,
  benefits: String,
  deadline: String,
  status: String,
  description: String,
  eligibility: String,
  type: String,
  region: String,
  generalQuota: String,
  tags: [String],
}, { timestamps: true });

// Model renamed as AdminScholarship
export default mongoose.model("AdminScholarship", AdminScholarshipSchema);
