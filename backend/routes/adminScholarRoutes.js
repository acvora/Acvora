// backend/routes/adminScholarRoutes.js
import express from "express";
import {
  createScholar,
  getAllScholars,
} from "../controllers/adminScholarController.js";

const router = express.Router();

// POST – Add scholarship
router.post("/", createScholar);

// GET – Fetch scholarships
router.get("/", getAllScholars);

export default router;
