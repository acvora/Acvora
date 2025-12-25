import AdminScholar from "../models/AdminScholar.js";

/**
 * @desc    Create new scholarship
 * @route   POST /api/adminscholar
 */
export const createScholar = async (req, res) => {
  try {
    console.log("📥 Incoming Scholar Data:", req.body);

    // ✅ Required field validation
    if (!req.body.name || !req.body.provider) {
      return res.status(400).json({
        success: false,
        message: "Name and Provider are required",
      });
    }

    // ✅ Normalize status (extra safety)
    req.body.status = req.body.status
      ? req.body.status.charAt(0).toUpperCase() +
        req.body.status.slice(1).toLowerCase()
      : "Draft";

    // ✅ Clean tags
    if (Array.isArray(req.body.tags)) {
      req.body.tags = req.body.tags.map(t => t.trim()).filter(Boolean);
    }

    const scholar = new AdminScholar(req.body);
    const savedScholar = await scholar.save();

    return res.status(201).json({
      success: true,
      message: "Scholarship created successfully",
      data: savedScholar,
    });

  } catch (error) {
    console.error("❌ FULL SAVE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "AdminScholar save failed",
      error: error.message,
    });
  }
};

/**
 * @desc    Get all scholarships
 * @route   GET /api/adminscholar
 */
export const getAllScholars = async (req, res) => {
  try {
    const scholars = await AdminScholar.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: scholars.length,
      data: scholars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
