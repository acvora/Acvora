import express from "express";
import {
  createScholar,
  getAllScholars,
} from "../controllers/adminScholarController.js";

const router = express.Router();

router.post("/", createScholar);
router.get("/", getAllScholars);

export default router;
