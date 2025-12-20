// backend/controllers/adminScholarController.js
import AdminScholar from "../models/AdminScholar.js";

/**
 * Create a new admin scholar (scholarship)
 */
export const createScholar = async (req, res, next) => {
  try {
    const data = req.body || {};

    // Basic server-side validation
    if (!data.name || !data.name.toString().trim()) {
      return res.status(400).json({ success: false, error: "Name is required" });
    }
    if (!data.provider || !data.provider.toString().trim()) {
      return res.status(400).json({ success: false, error: "Provider is required" });
    }

    // Build tags (if not provided)
    let tags = Array.isArray(data.tags) ? data.tags.map(String).filter(Boolean) : [];
    if (!tags.length) {
      if (data.category) tags.push(String(data.category));
      if (data.income) tags.push(String(data.income));
      if (data.educationLevel) tags.push(String(data.educationLevel));
    }

    // Parse deadline if present
    let deadline = undefined;
    if (data.deadline) {
      const d = new Date(data.deadline);
      if (!isNaN(d.getTime())) deadline = d;
      else return res.status(400).json({ success: false, error: "Invalid deadline date" });
    }

    const doc = new AdminScholar({
      name: data.name,
      provider: data.provider,
      type: data.type || "",
      category: data.category || "",
      generalQuota: data.generalQuota || "",
      region: data.region || "",
      income: data.income || "",
      educationLevel: data.educationLevel || "",
      benefits: data.benefits || "",
      deadline,
      status: data.status || "Open",
      description: data.description || "",
      eligibility: data.eligibility || "",
      tags,
      createdBy: data.createdBy || undefined,
    });

    const saved = await doc.save();
    return res.status(201).json({ success: true, message: "Scholarship created", scholar: saved });
  } catch (err) {
    console.error("createScholar error:", err);
    next(err);
  }
};

/**
 * Get all admin scholars
 */
export const getAllScholars = async (req, res, next) => {
  try {
    const filter = {};
    // Optional query filters (e.g., ?status=Open or ?region=Karnataka)
    if (req.query.status) filter.status = req.query.status;
    if (req.query.region) filter.region = req.query.region;

    const list = await AdminScholar.find(filter).sort({ createdAt: -1 }).limit(1000);
    return res.json({ success: true, scholars: list });
  } catch (err) {
    console.error("getAllScholars error:", err);
    next(err);
  }
};
