// models/Signup.js
import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  qText: { type: String },
  options: [{ type: String }],
  correctAnswer: { type: String },
  // any other question-level fields you want
}, { _id: false });

const SavedExamSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  meta: { type: mongoose.Schema.Types.Mixed }, // flexible object for subject, duration, etc.
  questions: [QuestionSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { _id: true });

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
  // NEW: embedded saved exams
  savedExams: [SavedExamSchema]
});

const Signup = mongoose.model("Signup", signupSchema);
export default Signup;
