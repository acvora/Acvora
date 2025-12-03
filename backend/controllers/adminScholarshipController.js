// controllers/adminScholarshipController.js
import AdminScholarship from "../models/AdminScholarship.js";

const sanitizeTags = (tags = []) => {
  if (!Array.isArray(tags)) return [];
  const cleaned = tags
    .map((t) => (typeof t === "string" ? t.trim().toLowerCase() : ""))
    .filter((t) => t.length > 0);
  return Array.from(new Set(cleaned));
};

export const createAdminScholarship = async (req, res) => {
  try {
    const body = req.body || {};

    // Required fields
    if (!body.name || !body.provider) {
      return res.status(400).json({
        success: false,
        message: "Name and Provider are required",
      });
    }

    // Parse deadline (convert to Date)
    let deadlineDate = null;
    if (body.deadline) {
      const parsed = new Date(body.deadline);
      if (isNaN(parsed.getTime())) {
        return res.status(400).json({ success: false, message: "Invalid deadline date" });
      }
      deadlineDate = parsed;

      if (deadlineDate < new Date()) {
        return res.status(400).json({ success: false, message: "Deadline must be a future date" });
      }
    }

    // Tags
    let tags = [];
    if (Array.isArray(body.tags)) tags = body.tags;

    if (body.category) tags.push(body.category);
    if (body.income) tags.push(`income:${body.income}`);
    if (body.educationLevel) tags.push(body.educationLevel);
    if (body.type) tags.push(body.type);

    tags = sanitizeTags(tags);

    const scholarshipData = {
      ...body,
      deadline: deadlineDate || undefined,
      tags,
    };

    const newScholarship = new AdminScholarship(scholarshipData);
    await newScholarship.save();

    res.status(201).json({
      success: true,
      message: "Admin scholarship added successfully",
      data: newScholarship,
    });
  } catch (err) {
    console.error("createAdminScholarship error:", err);
    res.status(500).json({ success: false, message: "Server error", details: err.message });
  }
};

export const getAdminScholarshipsByUniversity = async (req, res) => {
  try {
    const scholarships = await AdminScholarship.find({
      universityId: req.params.id,
    }).sort({ createdAt: -1 });

    res.json({ success: true, data: scholarships });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", details: err.message });
  }
};

export const getAllAdminScholarships = async (req, res) => {
  try {
    const scholarships = await AdminScholarship.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: scholarships });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", details: err.message });
  }
};
