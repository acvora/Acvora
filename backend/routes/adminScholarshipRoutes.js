// routes/adminScholarshipRoutes.js
import express from "express";
import {
  createAdminScholarship,
  getAdminScholarshipsByUniversity,
  getAllAdminScholarships,
} from "../controllers/adminScholarshipController.js";

const router = express.Router();

router.post("/admin-scholarships", createAdminScholarship);
router.get("/universities/:id/admin-scholarships", getAdminScholarshipsByUniversity);
router.get("/admin-scholarships", getAllAdminScholarships);

export default router;
