// routes/adminScholarshipRoutes.js
import express from "express";
import {
  createAdminScholarship,
  getAdminScholarshipsByUniversity,
  getAllAdminScholarships,
} from "../controllers/adminScholarshipController.js";

const router = express.Router();

// Public routes (no auth)
router.post("/admin-scholarships", createAdminScholarship);
router.get("/admin-scholarships", getAllAdminScholarships);
router.get("/universities/:id/admin-scholarships", getAdminScholarshipsByUniversity);

export default router;
