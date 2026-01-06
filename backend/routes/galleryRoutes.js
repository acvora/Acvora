import express from "express";
import { uploadGallery, getGallery } from "../controllers/galleryController.js";
import { universityUpload } from "../middlewares/universityUpload.js"; // ✅ Already using university-specific

const router = express.Router();

router.post(
  "/:universityId/gallery/upload",
  universityUpload.fields([
    { name: "infraPhotos", maxCount: 10 },
    { name: "eventPhotos", maxCount: 10 },
    { name: "galleryImages", maxCount: 20 },
  ]),
  uploadGallery
);

router.get("/:universityId/gallery", getGallery);

export default router;