import express from "express";
import {
  createScholar,
  getAllScholars,
} from "../controllers/adminScholarController.js";

const router = express.Router();

// POST → Create Scholarship
router.post("/", createScholar);

// GET → List Scholarships
router.get("/", getAllScholars);

export default router;
