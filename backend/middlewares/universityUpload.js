import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({  // ✅ Now async with (req, file) for field access
    folder: "universities/gallery",
    resource_type: "image",
    public_id: `${file.fieldname}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,  // ✅ Unique: field + timestamp + random hex
  }),
});

export const universityUpload = multer({ storage });