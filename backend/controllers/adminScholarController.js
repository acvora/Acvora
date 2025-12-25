import AdminScholar from "../models/AdminScholar.js";

/**
 * @desc    Create new scholarship
 * @route   POST /api/admin/scholars
 */
export const createScholar = async (req, res) => {
  try {
    console.log("📥 Incoming Scholar Data:", req.body); // 👈 ADD THIS

    // ✅ FIX 4: Backend validation (safety net)
    if (!req.body.name || !req.body.provider) {
      return res.status(400).json({
        success: false,
        message: "Name and Provider are required",
      });
    }

    const scholar = new AdminScholar(req.body);
    const savedScholar = await scholar.save();

    res.status(201).json({
      success: true,
      message: "Scholarship created successfully",
      data: savedScholar,
    });
  } catch (error) {
    console.error("❌ Save error:", error); // 👈 ADD THIS
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get all scholarships
 * @route   GET /api/admin/scholars
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