// routes/examRoutes.js
import express from "express";
import mongoose from "mongoose";
import Signup from "../models/Signup.js"; // ensure path is correct

const router = express.Router();

console.log("[examRoutes] loaded routes/examRoutes.js");

/**
 * Simple ping route to verify the router is mounted and reachable.
 * GET  /api/exams/ping
 */
router.get("/ping", (req, res) => {
  console.log("[examRoutes] /ping hit");
  res.json({ ok: true, route: "/api/exams/ping" });
});

/**
 * POST /save-exam
 * Body (recommended): { userId, title, description, meta, questions, raw }
 * This handler will try to find the user by Mongo _id OR by firebaseId.
 */
router.post("/save-exam", async (req, res) => {
  try {
    console.log("[examRoutes] /save-exam called. body keys:", Object.keys(req.body));
    const { userId, title, description, meta = {}, questions = [], raw = {} } = req.body;

    if (!userId || !title) {
      return res.status(400).json({ message: "userId and title required" });
    }

    // Try to find by Mongo _id first. If not found, try firebaseId field on Signup.
    let user = null;

    // if userId looks like ObjectId, try findById
    if (mongoose.Types.ObjectId.isValid(userId)) {
      user = await Signup.findById(userId).select("savedExams");
    }

    if (!user) {
      // try firebaseId fallback
      user = await Signup.findOne({ firebaseId: userId }).select("savedExams");
    }

    if (!user) {
      // Not found: return 404 JSON (route exists, so frontend won't get Express default HTML)
      console.warn(`[examRoutes] save-exam: user not found for id: ${userId}`);
      return res.status(404).json({ message: "User not found (tried _id and firebaseId)" });
    }

    const newExam = {
      title,
      description,
      meta,
      questions,
      raw,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // push subdocument and return the created subdoc
    user.savedExams.push(newExam);
    await user.save();

    const added = user.savedExams[user.savedExams.length - 1];
    console.log(`[examRoutes] Exam saved for user ${user._id} examId=${added._id}`);
    return res.status(201).json({ message: "Saved", exam: added });
  } catch (err) {
    console.error("Error in save-exam:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * GET /my-exams/:userId
 * tries both _id and firebaseId
 */
router.get("/my-exams/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    let user = null;

    if (mongoose.Types.ObjectId.isValid(userId)) {
      user = await Signup.findById(userId).select("savedExams");
    }
    if (!user) user = await Signup.findOne({ firebaseId: userId }).select("savedExams");

    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user.savedExams || []);
  } catch (err) {
    console.error("Error in my-exams:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * PUT /edit-exam/:userId/:examId
 */
router.put("/edit-exam/:userId/:examId", async (req, res) => {
  try {
    const { userId, examId } = req.params;
    const { title, description, meta, questions } = req.body;

    // find user by _id or firebaseId and exam subdoc
    const query = mongoose.Types.ObjectId.isValid(userId)
      ? { _id: userId, "savedExams._id": examId }
      : { firebaseId: userId, "savedExams._id": examId };

    const updateObj = {};
    if (title !== undefined) updateObj["savedExams.$.title"] = title;
    if (description !== undefined) updateObj["savedExams.$.description"] = description;
    if (meta !== undefined) updateObj["savedExams.$.meta"] = meta;
    if (questions !== undefined) updateObj["savedExams.$.questions"] = questions;
    updateObj["savedExams.$.updatedAt"] = new Date();

    const updated = await Signup.findOneAndUpdate(query, { $set: updateObj }, { new: true }).select("savedExams");

    if (!updated) return res.status(404).json({ message: "Exam or user not found" });

    const exam = updated.savedExams.find((e) => e._id.toString() === examId);
    return res.json({ message: "Updated", exam });
  } catch (err) {
    console.error("Error in edit-exam:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * DELETE /delete-exam/:userId/:examId
 */
router.delete("/delete-exam/:userId/:examId", async (req, res) => {
  try {
    const { userId, examId } = req.params;

    const filter = mongoose.Types.ObjectId.isValid(userId) ? { _id: userId } : { firebaseId: userId };

    const updated = await Signup.findOneAndUpdate(filter, { $pull: { savedExams: { _id: examId } } }, { new: true }).select("savedExams");

    if (!updated) return res.status(404).json({ message: "User not found" });

    console.log(`[examRoutes] Deleted exam ${examId} for user ${userId}`);
    return res.json({ message: "Deleted", savedExams: updated.savedExams });
  } catch (err) {
    console.error("Error in delete-exam:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
