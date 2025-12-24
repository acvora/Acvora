import AdminScholar from "../models/AdminScholar.js";

/**
 * CREATE SCHOLARSHIP
 */
export const createScholar = async (req, res, next) => {
  try {
    const data = req.body;

    // Basic validation
    if (!data.name?.trim()) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }
    if (!data.provider?.trim()) {
      return res.status(400).json({ success: false, message: "Provider is required" });
    }
    if (!data.status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    // Auto-generate code if missing
    if (!data.code) {
      data.code = `SCH-${Date.now()}`;
    }

    // Convert date fields safely
    if (data.startDate) data.startDate = new Date(data.startDate);
    if (data.endDate) data.endDate = new Date(data.endDate);

    // Ensure arrays
    const arrayFields = [
      "type",
      "discipline",
      "degreeTypes",
      "categoryEligibility",
      "yearOfStudy",
      "requiredDocuments",
      "selectionMethod",
      "tags",
    ];

    arrayFields.forEach((field) => {
      if (data[field] && !Array.isArray(data[field])) {
        data[field] = [data[field]];
      }
    });

    const scholar = new AdminScholar(data);
    const savedScholar = await scholar.save();

    return res.status(201).json({
      success: true,
      message: "Scholarship created successfully",
      scholar: savedScholar,
    });
  } catch (err) {
    console.error("Create Scholar Error:", err);
    next(err);
  }
};

/**
 * GET ALL SCHOLARSHIPS
 */
export const getAllScholars = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.status) filter.status = req.query.status;
    if (req.query.state) filter.state = req.query.state;
    if (req.query.level) filter.level = req.query.level;

    const scholars = await AdminScholar.find(filter)
      .sort({ createdAt: -1 })
      .limit(1000);

    res.json({
      success: true,
      count: scholars.length,
      scholars,
    });
  } catch (err) {
    console.error("Get Scholars Error:", err);
    next(err);
  }
};
