import express from "express";
import bcrypt from "bcryptjs";
import Signup from "../models/Signup.js";
import firebaseAuth from "../middleware/firebaseAuth.js";

const router = express.Router();

/**
 * POST /api/signup
 * Firebase → MongoDB (same structure)
 */
router.post("/", firebaseAuth, async (req, res) => {
  try {
    // 🔐 Firebase se aaya hua data
    const { uid, email } = req.user;

    // 📦 Frontend se aaya hua profile data
    const { name, phone, address, pincode } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    // 🔍 Check existing user
    let user = await Signup.findOne({ firebaseId: uid });

    // 🆕 First-time signup
    if (!user) {
      // 🔐 Dummy strong password (Firebase already handles auth)
      const hashedPassword = await bcrypt.hash(uid, 10);

      user = new Signup({
        name,
        phone,
        email,          // from Firebase
        password: hashedPassword, // 🔒 keep Mongo structure same
        firebaseId: uid,
        address,
        pincode,
      });

      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "User synced from Firebase to MongoDB",
      user,
    });

  } catch (err) {
    console.error("❌ Signup sync error:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

export default router;
