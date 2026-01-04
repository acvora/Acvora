// backend/routes/university.js
import express from "express";
import UniversityRegistration from "../models/University.js";  // ✅ Single: UniversityRegistration
import { uploadCoursesExcel } from "../controllers/uploadController.js";
import multer from "multer";  // For Excel disk storage
import path from "path";
import upload from "../middlewares/multer.js";
import { universityUpload } from "../middlewares/universityUpload.js";

// ✅ NEW: Shared Cloudinary uploader

const router = express.Router();

/* ✅ Multer DiskStorage Setup (for Excel only) */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder jaha file save hogi
  },
  filename: function (req, file, cb) {
    // unique filename (date + extension)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const excelUpload = multer({ storage });

// ✅ Get all universities
router.get("/", async (req, res) => {
  try {
    const universities = await UniversityRegistration.find(); // ✅ Uses UniversityRegistration
    res.json({ success: true, data: universities });
  } catch (err) {
    console.error("Error fetching universities:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Get university by ID (SINGLE ROUTE: Consolidated)
router.get("/:id", async (req, res) => {
  try {
    const university = await UniversityRegistration.findById(req.params.id);  // ✅ Uses UniversityRegistration
    if (!university) {
      return res.status(404).json({ success: false, message: "University not found" });
    }
    res.json({ success: true, data: university });  // ✅ Standardized response
  } catch (err) {
    console.error("Error fetching university:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ NEW: Dedicated Gallery endpoint (for frontend Gallery.jsx)
router.get("/:id/gallery", async (req, res) => {
  try {
    const university = await UniversityRegistration.findById(req.params.id).select("gallery");  // Only fetch gallery
    if (!university) {
      return res.status(404).json({ success: false, message: "University not found" });
    }
    res.json({ success: true, data: university.gallery });  // Returns { infraPhotos: [...], eventPhotos: [...], otherPhotos: [...] }
  } catch (err) {
    console.error("Error fetching gallery:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Upload & parse courses Excel
// Form field name must be: "file"
router.post(
  "/:universityId/courses/upload",
  excelUpload.single("file"),
  uploadCoursesExcel
);

// ✅ POST new university (NOW USES SHARED universityUpload)
router.post(
  "/",
  universityUpload.fields(  // ✅ FIXED: Uses shared Cloudinary uploader
    [
      { name: "logo", maxCount: 1 },
      { name: "bannerImage", maxCount: 10 },
      { name: "aboutImages", maxCount: 10 },
      { name: "accreditationDoc", maxCount: 5 },
      { name: "affiliationDoc", maxCount: 5 },
      { name: "registrationDoc", maxCount: 5 },
      { name: "videos", maxCount: 10 },
      { name: "infraPhotos", maxCount: 20 },
      { name: "eventPhotos", maxCount: 20 },
      { name: "galleryImages", maxCount: 20 },  // Maps to otherPhotos
      { name: "recruitersLogos", maxCount: 20 },
    ]
  ),
  async (req, res) => {
    try {
      // text fields
      const uniData = { ...req.body };

      // handle file fields (Cloudinary URLs guaranteed)
      const fileFields = [
        "logo",
        "bannerImage",
        "aboutImages",
        "accreditationDoc",
        "affiliationDoc",
        "registrationDoc",
        "videos",
        "recruitersLogos",
      ];

      fileFields.forEach((field) => {
        if (req.files[field]) {
          uniData[field] = req.files[field].map((f) => f.path);  // ✅ Now always Cloudinary path
        }
      });

      // gallery special handling
      uniData.gallery = {
        infraPhotos: req.files["infraPhotos"]?.map((f) => f.path) || [],
        eventPhotos: req.files["eventPhotos"]?.map((f) => f.path) || [],
        otherPhotos: req.files["galleryImages"]?.map((f) => f.path) || [],
      };

      const newUni = await UniversityRegistration.create(uniData);  // ✅ Uses UniversityRegistration
      res.json({ success: true, data: newUni });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

// ✅ Update university by ID
router.put("/:id", async (req, res) => {
  try {
    const uni = await UniversityRegistration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!uni)
      return res
        .status(404)
        .json({ success: false, message: "University not found" });
    res.json({ success: true, data: uni });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Delete university by ID
router.delete("/:id", async (req, res) => {
  try {
    const uni = await UniversityRegistration.findByIdAndDelete(req.params.id);
    if (!uni)
      return res
        .status(404)
        .json({ success: false, message: "University not found" });
    res.json({ success: true, message: "University deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Get all courses of a university
// Endpoint: GET /api/universities/:id/courses
router.get("/:id/courses", async (req, res) => {
  try {
    const university = await UniversityRegistration.findById(req.params.id);  // ✅ Uses UniversityRegistration
    if (!university) {
      return res.status(404).json({ success: false, message: "University not found" });
    }
    res.json({ success: true, data: { courses: university.courses } });  // ✅ Standardized
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ success: false, error: "Server error", details: err.message });
  }
});

// ✅ Route for Admin Status Updates
router.patch("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedUni = await UniversityRegistration.findByIdAndUpdate(  // ✅ Uses UniversityRegistration
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedUni)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: updatedUni });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;