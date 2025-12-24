import AdminScholar from "../models/AdminScholar.js";

/**
 * CREATE SCHOLARSHIP
 */
export const createScholar = async (req, res, next) => {
  try {
    const data = { ...req.body }; // clone body

    if (!data.name?.trim())
      return res.status(400).json({ success: false, message: "Name is required" });

    if (!data.provider?.trim())
      return res.status(400).json({ success: false, message: "Provider is required" });

    if (!data.status)
      return res.status(400).json({ success: false, message: "Status is required" });

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
      if (!Array.isArray(data[field])) {
        data[field] = data[field] ? [data[field]] : [];
      }
    });

    const scholar = await AdminScholar.create(data);

    return res.status(201).json({
      success: true,
      message: "Scholarship created successfully",
      scholar,
    });
  } catch (err) {
    console.error("Create Scholar Error:", err);
    next(err);
  }
};

/**
 * GET ALL SCHOLARSHIPS ✅ (THIS WAS MISSING)
 */
export const getAllScholars = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.status) filter.status = req.query.status;
    if (req.query.state) filter.state = req.query.state;
    if (req.query.level) filter.level = req.query.level;

    const scholars = await AdminScholar.find(filter)
      .sort({ createdAt: -1 });

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
