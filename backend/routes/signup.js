// routes/signup.js
import express from "express";
import Signup from "../models/Signup.js";

const router = express.Router();

// CREATE user after Firebase signup
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
    console.error("❌ Signup save error:", err.message);
    res.status(500).json({ message: "Signup failed" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await Signup.find({}); // Queries the 'signups' collection
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
