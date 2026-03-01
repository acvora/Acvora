// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import PDFDocument from "pdfkit";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import UniversityRegistration from "./models/University.js";  // ✅ Single import: UniversityRegistration

// Routes
import cutoffRoutes from "./routes/cutoffRoutes.js";
import universityRoutes from "./routes/university.js";
import uploadCourseRoutes from "./routes/uploadCourses.js";
import admissionsRoutes from "./routes/admissions.js";
import recruitersRoutes from "./routes/recruitersRoutes.js";
import placementsRoutes from "./routes/placementsRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import scholarshipRoutes from "./routes/scholarshipRoutes.js";
import signupRoutes from "./routes/signup.js";
import instituteRoutes from "./routes/instituteRoutes.js";
import profileRoutes from "./routes/profile.js";
// ✅ New import for saved courses routes
import savedCoursesRoutes from "./routes/savedCourses.js";
import savedScholarshipsRoutes from "./routes/savedScholarships.js";
import counsellingRoutes from "./routes/counselling.js";
import savedExamsRouter from "./routes/savedExams.js";

// admin scholar routes
import adminScholarRoutes from "./routes/adminScholarRoutes.js";

dotenv.config();
const app = express();

/* ------------------------ Cloudinary config (FIXED: Use CLOUDINARY_ prefix) ------------------------ */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ------------------------ CORS (UPDATED - FIX 2) ------------------------ */
const ALLOWED_ORIGINS = [
  "http://localhost:3000",

  // Main Vercel deployments
  "https://acvora-theta.vercel.app",
  "https://acvora-acvoras-projects.vercel.app",
  "https://acvora-git-main-acvoras-projects.vercel.app",

  // Render backend 
  "https://acvora-07fo.onrender.com",
  "https://acvora-5d473m4wf-acvoras-projects.vercel.app",
  "https://acvora-6w211dktw-acvoras-projects.vercel.app",

  "https://www.acvora-theta.vercel.app",
  "https://www.acvora-git-main-acvoras-projects.vercel.app",
  "https://www.acvora-5d473m4wf-acvoras-projects.vercel.app"
];

// ✅ must be above express.json and all routes
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin.includes("localhost") ||
        origin.includes("vercel.app") ||
        origin.includes("acvora")
      ) {
        callback(null, true);
      } else {
        console.warn("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

// ✅ Parse JSON and URL-encoded data after CORS setup
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ✅ Ensure uploads folder exists (for local file storage)
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// ✅ Serve uploaded files publicly (e.g. course images)
app.use("/uploads", express.static("uploads"));

/* ------------------------ Multer + Cloudinary (Updated to match .env) ------------------------ */
const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "universities",
    resource_type: "auto",
  }),
});
const upload = multer({ storage });

/* ------------------------ Mongo connection (UPDATED - FIX 1) ------------------------ */
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ MONGO_URI not found in .env");
  process.exit(1);
}

mongoose
  .connect(mongoURI)  // ✅ Removed deprecated options: useNewUrlParser, useUnifiedTopology, serverSelectionTimeoutMS
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ MongoDB Atlas connection error:", err.message);
    process.exit(1);
  });

/* ------------------------ Registration Schema ------------------------ */
const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Registration = mongoose.model("Registration", registrationSchema);

/* ------------------------ News Schema ------------------------ */
const newsSchema = new mongoose.Schema({
  universityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UniversityRegistration",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: "General" },
  date: { type: Date, default: Date.now },
  image: { type: String },
});
const News = mongoose.model("News", newsSchema);

/* ------------------------ Student Schema ------------------------ */
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  university: { type: String, required: true },
  status: { type: String, default: "Pending" },
  details: {
    fullName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    parentName: { type: String, required: true },
    parentContact: { type: String, required: true },
    board: { type: String, required: true },
    stream: { type: String, required: true },
    schoolName: { type: String, required: true },
    yearOfPassing: { type: String, required: true },
    subjects: [{ type: String }],
    totalPercentage: { type: String, required: true },
    rollNumber: { type: String, required: true },
    course: { type: String, required: true },
    specialization: { type: String },
    mode: { type: String, required: true },
    hostelRequired: { type: String, required: true },
    university: { type: String, required: true },
    documents: {
      marksheet: { type: String, required: true },
      tc: { type: String, required: true },
      migration: { type: String, required: true },
      photo: { type: String, required: true },
      idProof: { type: String, required: true },
    },
    paymentReceipt: { type: String },
    declaration: { type: Boolean, required: true },
    studentSignature: { type: String },
    guardianSignature: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Student = mongoose.model("Student", studentSchema);

/* ------------------------ REMOVED: Duplicate university routes (now in routes/university.js) ------------------------ */

/* ------------------------ Student Routes ------------------------ */

app.post("/api/students", async (req, res) => {
  try {
    const { name, email, university, status, details, createdAt, updatedAt } = req.body;

    if (!name || !email || !university || !details) {
      return res.status(400).json({
        success: false,
        message: "Name, email, university, and details are required",
      });
    }

    const newStudent = new Student({
      name,
      email,
      university,
      status,
      details,
      createdAt,
      updatedAt,
    });

    await newStudent.save();
    res.status(201).json({
      success: true,
      message: "Student added successfully",
      data: newStudent,
    });
  } catch (err) {
    console.error("❌ Error adding student:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

app.put("/api/students/:id", async (req, res) => {
  try {
    const { name, email, university, status, details, updatedAt } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, university, status, details, updatedAt },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (err) {
    console.error("❌ Error updating student:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// Get all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ success: true, data: students });  // ✅ Standardized response
  } catch (err) {
    console.error("❌ Error fetching students:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// Delete student
app.delete("/api/students/:id", async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.json({ success: true, message: "Student deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting student:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// ✅ Recent Applications (last 5 students)
app.get("/api/students/recent", async (req, res) => {
  try {
    const recent = await Student.find().sort({ createdAt: -1 }).limit(5);
    res.json({ success: true, data: recent });  // ✅ Standardized
  } catch (err) {
    console.error("❌ Error fetching recent applications:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/students/stats", async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const applicationsThisMonth = await Student.countDocuments({
      createdAt: { $gte: startOfMonth },
    });

    const confirmedAdmissions = await Student.countDocuments({ status: "Approved" });
    const pendingApplications = await Student.countDocuments({ status: "Pending" });

    // Example commission logic (₹500 per confirmed admission)
    const commissionEarned = confirmedAdmissions * 500;

    res.json({
      success: true,
      data: {  // ✅ Wrapped in data
        applicationsThisMonth,
        confirmedAdmissions,
        commissionEarned,
        pendingApplications, // 👈 renamed here
      },
    });
  } catch (err) {
    console.error("❌ Error fetching stats:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// example
app.get("/api/students/:id/pdf", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).send("Student not found");

    // generate PDF dynamically
    const pdf = generateStudentPdf(student); // <- you need a function here
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="application_${student._id}.pdf"`,
    });
    res.send(pdf);
  } catch (err) {
    res.status(500).send("Error generating PDF");
  }
});

/* ------------------------ Mount Routers ------------------------ */
app.use("/api/signup", signupRoutes);
app.use("/api/universities", universityRoutes);  // ✅ Consolidated
app.use("/api/universities", uploadCourseRoutes);
app.use("/api/cutoff", cutoffRoutes);
app.use("/api/admissions", admissionsRoutes);
app.use("/api/recruiters", recruitersRoutes);
app.use("/api/universities", placementsRoutes);
app.use("/api/universities", galleryRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/universities", scholarshipRoutes);
app.use("/api/institutes", instituteRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/savedCourses", savedCoursesRoutes);
app.use("/api/savedScholarships", savedScholarshipsRoutes);
app.use("/api/counselling", counsellingRoutes);
console.log("Mounting savedExams router at /api/savedExams");
app.use("/api/savedExams", savedExamsRouter);

// mount adminscholar API
app.use("/api/adminscholar", adminScholarRoutes);

/* ------------------------ Health check ------------------------ */
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

/* ------------------------ Error handler ------------------------ */
app.use((err, req, res, next) => {
  console.error("🔥 FULL ERROR:", err);

  res.status(500).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

/* ------------------------ Start server ------------------------ */
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('Database connected:');
  console.log("Health check available at /api/health");
});