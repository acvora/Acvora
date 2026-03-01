import express from "express";
import bcrypt from "bcryptjs";
import Signup from "../models/Signup.js";

const router = express.Router();

// POST /api/signup
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, password, address, pincode, firebaseId } =
      req.body;

    if (!name || !phone || !email) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    const existing = await Signup.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, error: "Email already exists" });
    }

    let hashedPassword = "";
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const newUser = new Signup({
      name,
      phone,
      email,
      password: hashedPassword,
      firebaseId,
      address,
      pincode,
    });

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "Signup successful", user: newUser });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ NEW: Add this GET route to fetch all users for the dashboard
router.get("/", async (req, res) => {
  try {
    const users = await Signup.find({}).sort({ createdAt: -1 }); // Fetch all from 'signups'
    res.status(200).json(users); 
  } catch (err) {
    console.error("❌ Error fetching signups:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});
export default router;
