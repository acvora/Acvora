// backend/routes/adminScholarRoutes.js
import express from "express";
import { createScholar, getAllScholars } from "../controllers/adminScholarController.js";

const router = express.Router();

// POST /api/adminscholar
router.post("/", createScholar);

// GET /api/adminscholar
router.get("/", getAllScholars);

export default router;
