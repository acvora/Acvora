// routes/savedExams.js
import express from "express";
import Signup from "../models/Signup.js";

const router = express.Router();

// GET saved exams for a user
router.get("/:userId", async (req, res) => {
  try {
    const user = await Signup.findOne({ firebaseId: req.params.userId }).select("savedExams");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.savedExams || []);
  } catch (err) {
    console.error("GET /savedExams error:", err);
    res.status(500).json({ message: err.message });
  }
});

// POST add a saved exam (atomic: addToSet to avoid duplicates)
router.post("/:userId", async (req, res) => {
  console.log("🔥 POST /api/savedExams hit — params:", req.params, "body:", req.body);
  try {
    const { examId, examName, conductingBody, nextEvent } = req.body;
    if (!examId || !examName) return res.status(400).json({ message: "Missing required fields" });

    const updated = await Signup.findOneAndUpdate(
      { firebaseId: req.params.userId },
      { $addToSet: { savedExams: { examId, examName, conductingBody, nextEvent } } },
      { new: true, select: "savedExams" }
    );

    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json(updated.savedExams);
  } catch (err) {
    console.error("POST /savedExams error:", err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE remove a saved exam (atomic)
router.delete("/:userId/:examId", async (req, res) => {
  try {
    const updated = await Signup.findOneAndUpdate(
      { firebaseId: req.params.userId },
      { $pull: { savedExams: { examId: req.params.examId } } },
      { new: true, select: "savedExams" }
    );
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json(updated.savedExams);
  } catch (err) {
    console.error("DELETE /savedExams error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;