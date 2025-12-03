// controllers/adminScholarshipController.js
import AdminScholarship from "../models/AdminScholarship.js";

/*
  All function names changed to admin versions.
*/

// @desc    Create an admin scholarship
// @route   POST /api/admin-scholarships
export const createAdminScholarship = async (req, res) => {
  try {
    const newScholarship = new AdminScholarship(req.body);
    await newScholarship.save();

    res.status(201).json({
      message: "Admin scholarship added successfully",
      data: newScholarship,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// @desc    Get all admin scholarships for a specific university
// @route   GET /api/universities/:id/admin-scholarships
export const getAdminScholarshipsByUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const scholarships = await AdminScholarship.find({ universityId: id });
    res.status(200).json(scholarships);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get all admin scholarships
// @route   GET /api/admin-scholarships
export const getAllAdminScholarships = async (req, res) => {
  try {
    const scholarships = await AdminScholarship.find({});
    res.status(200).json(scholarships);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
