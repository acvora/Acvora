// routes/signup.js
import express from "express";
import Signup from "../models/Signup.js";

const router = express.Router();

// CREATE user after Firebase signup
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, firebaseId } = req.body;

    if (!firebaseId || !email) {
      return res.status(400).json({ message: "firebaseId and email required" });
    }

    let user = await Signup.findOne({ firebaseId });

    if (!user) {
      user = await Signup.create({
        name,
        email,
        phone,
        firebaseId,
      });
      console.log("✅ User created in MongoDB:", firebaseId);
    } else {
      console.log("ℹ️ User already exists:", firebaseId);
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("❌ Signup save error:", err.message);
    res.status(500).json({ message: "Signup failed" });
  }
});

export default router;
