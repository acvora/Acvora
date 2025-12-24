// backend/controllers/adminScholarController.js
import AdminScholar from "../models/AdminScholar.js";

/**
 * CREATE SCHOLARSHIP
 */
export const createScholar = async (req, res) => {
  try {
    const data = req.body;

    if (!data.name || !data.provider || !data.status) {
      return res.status(400).json({
        success: false,
        error: "Name, Provider and Status are required",
      });
    }

    // Auto-generate tags if not sent
    let tags = data.tags || [];
    if (!tags.length) {
      if (data.educationLevel) tags.push(data.educationLevel);
      if (data.categoryEligibility?.length) tags.push(...data.categoryEligibility);
      if (data.discipline?.length) tags.push(...data.discipline);
    }

    const scholar = new AdminScholar({
      ...data,
      tags,
      createdBy: req.user?.id, // optional (JWT)
    });

    const saved = await scholar.save();

    res.status(201).json({
      success: true,
      message: "Scholarship added successfully",
      scholarshipCode: saved.code,
      scholar: saved,
    });
  } catch (err) {
    console.error("Create Scholar Error:", err);
    res.status(500).json({
      success: false,
      error: "Server error while creating scholarship",
    });
  }
};

/**
 * GET ALL SCHOLARSHIPS
 */
export const getAllScholars = async (req, res) => {
  try {
    const filter = {};

    if (req.query.status) filter.status = req.query.status;
    if (req.query.region) filter.region = req.query.region;
    if (req.query.educationLevel) filter.educationLevel = req.query.educationLevel;

    const scholars = await AdminScholar.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      total: scholars.length,
      scholars,
    });
  } catch (err) {
    console.error("Get Scholars Error:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch scholarships",
    });
  }
};
