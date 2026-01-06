import University from "../models/University.js";

// ✅ Upload Gallery
export const uploadGallery = async (req, res) => {
  try {
    const { universityId } = req.params;
    const uni = await University.findById(universityId);

    if (!uni) {
      return res.status(404).json({ success: false, message: "University not found" });
    }

    // Safety: Initialize gallery if not exists
    if (!uni.gallery) {
      uni.gallery = {
        infraPhotos: [],
        eventPhotos: [],
        otherPhotos: [],
      };
    }

    // Helper to get Cloudinary URL safely
    const getFileUrl = (file) => file.secure_url || file.path || "";

    if (req.files.infraPhotos) {
      const urls = req.files.infraPhotos.map(getFileUrl).filter(Boolean); // Filter empty
      uni.gallery.infraPhotos.push(...urls);
      console.log("✅ Saved infra URLs:", urls); // Debug
    }
    if (req.files.eventPhotos) {
      const urls = req.files.eventPhotos.map(getFileUrl).filter(Boolean);
      uni.gallery.eventPhotos.push(...urls);
      console.log("✅ Saved event URLs:", urls); // Debug
    }
    if (req.files.galleryImages) {
      const urls = req.files.galleryImages.map(getFileUrl).filter(Boolean);
      uni.gallery.otherPhotos.push(...urls);
      console.log("✅ Saved other URLs:", urls); // Debug
    }

    await uni.save();

    res.json({
      success: true,
      message: "Gallery uploaded successfully",
      gallery: uni.gallery,
    });
  } catch (err) {
    console.error("❌ Error uploading gallery:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Get Gallery (to fetch in frontend)
export const getGallery = async (req, res) => {
  try {
    const { universityId } = req.params;
    const uni = await University.findById(universityId);

    if (!uni) {
      return res
        .status(404)
        .json({ success: false, message: "University not found" });
    }

    // Ensure gallery is initialized even if empty
    if (!uni.gallery) {
      uni.gallery = { infraPhotos: [], eventPhotos: [], otherPhotos: [] };
    }

    res.json({
      success: true,
      gallery: uni.gallery,
    });
  } catch (err) {
    console.error("❌ Error fetching gallery:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};