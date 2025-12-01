// models/Signup.js
import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  firebaseId: { type: String },
  address: String,
  pincode: String,
  createdAt: { type: Date, default: Date.now },
  savedCourses: [
    {
      courseId: String,
      courseTitle: String,
      eligibility: String,
    },
  ],
  savedScholarships: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Scholarship" }
  ],
  // ----------------- NEW: savedExams -----------------
  savedExams: [
    {
      examId: String,
      examName: String,
      conductingBody: String,
      nextEvent: String, // e.g. "2025-12-10" or "Dec 10, 2025" (whatever you store)
      // add any other properties you want to store with the saved exam
    },
  ],
});

const Signup = mongoose.model("Signup", signupSchema);
export default Signup;
