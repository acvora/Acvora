// backend/models/AdminScholar.js
import mongoose from "mongoose";

const adminScholarSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    provider: { type: String, required: true, trim: true },
    type: { type: String, trim: true },
    category: { type: String, trim: true },
    generalQuota: { type: String, trim: true },
    region: { type: String, trim: true },
    income: { type: String, trim: true },
    educationLevel: { type: String, trim: true },
    benefits: { type: String, trim: true },
    deadline: { type: Date },
    status: {
      type: String,
      trim: true,
      enum: ["Open", "Upcoming", "Closed"],
      default: "Open",
    },
    description: { type: String, trim: true },
    eligibility: { type: String, trim: true },
    tags: { type: [String], default: [] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  },
  { timestamps: true }
);

const AdminScholar = mongoose.models.AdminScholar || mongoose.model("AdminScholar", adminScholarSchema);
export default AdminScholar;
