// routes/examRoutes.js
import express from "express";
import mongoose from "mongoose";
import Signup from "../models/Signup.js";

const router = express.Router();
console.log("[examRoutes] Loaded examRoutes.js");

// Helper: find user by either ObjectId _id or firebaseId
async function findUserById(userId) {
  if (!userId) return null;
  try {
    if (mongoose.Types.ObjectId.isValid(userId)) {
      const byId = await Signup.findById(userId).select("savedExams");
      if (byId) return byId;
    }
    // fallback to firebaseId or other string id
    const byFirebase = await Signup.findOne({ firebaseId: userId }).select("savedExams");
    return byFirebase;
  } catch (err) {
    console.error("[findUserById] Error finding user:", err);
    throw err;
  }
}

/** Ping route to quickly check router is mounted */
router.get("/ping", (req, res) => {
  console.log("[examRoutes] ping");
  return res.json({ ok: true, route: "/api/exams/ping" });
});

/** Save exam: push a subdoc into Signup.savedExams */
router.post("/save-exam", async (req, res) => {
  console.log("[examRoutes] POST /save-exam - body:", req.body && { ...req.body, raw: undefined });
  try {
    const { userId, title, description = "", meta = {}, questions = [], raw = {} } = req.body || {};

    if (!userId || !title) {
      console.warn("[examRoutes] save-exam missing userId or title");
      return res.status(400).json({ message: "userId and title are required" });
    }

    const user = await findUserById(userId);
    if (!user) {
      console.warn("[examRoutes] save-exam user not found:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    const newExam = {
      title,
      description,
      meta: meta || {},
      questions: Array.isArray(questions) ? questions : [],
      raw: raw || {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    user.savedExams.push(newExam);
    await user.save();

    const added = user.savedExams[user.savedExams.length - 1];
    console.log("[examRoutes] Saved exam for user:", user._id.toString(), "examId:", added._id.toString());
    return res.status(201).json({ message: "Saved", exam: added });
  } catch (err) {
    console.error("[examRoutes] Error in POST /save-exam:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

/** Get user's saved exams (returns array) */
router.get("/my-exams/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("[examRoutes] GET /my-exams/:userId -", userId);
  try {
    const user = await findUserById(userId);

    // IMPORTANT CHANGE: if user not found, return empty array instead of 404
    if (!user) {
      console.warn("[examRoutes] GET my-exams user not found:", userId);
      return res.json([]); // 200 OK with empty list
    }

    // return the raw savedExams array (subdocs)
    return res.json(user.savedExams || []);
  } catch (err) {
    console.error("[examRoutes] Error in GET /my-exams/:userId:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * Delete a saved exam. Supports:
 * - subdoc _id (most common) -> delete by { _id: examId }
 * - or meta.examId stored inside the subdoc -> delete by { 'meta.examId': examIdValue }
 */
router.delete("/delete-exam/:userId/:examId", async (req, res) => {
  const { userId, examId } = req.params;
  console.log("[examRoutes] DELETE /delete-exam/:userId/:examId", { userId, examId });

  try {
    const user = await findUserById(userId);
    if (!user) {
      console.warn("[examRoutes] delete-exam user not found:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    const userFilter = mongoose.Types.ObjectId.isValid(userId)
      ? { _id: userId }
      : { firebaseId: userId };

    // Try removing by subdoc _id first (only if examId looks like ObjectId)
    if (mongoose.Types.ObjectId.isValid(examId)) {
      const updated = await Signup.findOneAndUpdate(
        userFilter,
        { $pull: { savedExams: { _id: examId } } },
        { new: true }
      ).select("savedExams");

      if (updated) {
        console.log("[examRoutes] Deleted savedExam by subdoc _id:", examId);
        return res.json({ message: "Deleted", savedExams: updated.savedExams });
      }
    }

    // Fallback: try pulling by meta.examId (string match)
    const updatedByMeta = await Signup.findOneAndUpdate(
      userFilter,
      { $pull: { savedExams: { "meta.examId": examId } } },
      { new: true }
    ).select("savedExams");

    if (updatedByMeta) {
      console.log("[examRoutes] Deleted savedExam by meta.examId:", examId);
      return res.json({ message: "Deleted", savedExams: updatedByMeta.savedExams });
    }

    // If nothing deleted, still return 404
    console.warn("[examRoutes] delete-exam: nothing removed (exam not found):", examId);
    return res.status(404).json({ message: "Exam not found for user" });
  } catch (err) {
    console.error("[examRoutes] Error in DELETE /delete-exam:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

/** Optional: Edit a saved exam (update subdoc) */
router.put("/edit-exam/:userId/:examId", async (req, res) => {
  const { userId, examId } = req.params;
  console.log("[examRoutes] PUT /edit-exam", { userId, examId, body: req.body && { ...req.body, raw: undefined } });

  try {
    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const update = {};
    const { title, description, meta, questions } = req.body || {};
    if (title !== undefined) update["savedExams.$.title"] = title;
    if (description !== undefined) update["savedExams.$.description"] = description;
    if (meta !== undefined) update["savedExams.$.meta"] = meta;
    if (questions !== undefined) update["savedExams.$.questions"] = questions;
    update["savedExams.$.updatedAt"] = new Date();

    // Try matching by subdoc _id first
    const queryBySubdoc = mongoose.Types.ObjectId.isValid(userId)
      ? { _id: userId, "savedExams._id": examId }
      : { firebaseId: userId, "savedExams._id": examId };

    let updatedDoc = await Signup.findOneAndUpdate(queryBySubdoc, { $set: update }, { new: true }).select(
      "savedExams"
    );

    if (!updatedDoc) {
      // Try matching by meta.examId
      const queryByMeta = mongoose.Types.ObjectId.isValid(userId)
        ? { _id: userId, "savedExams.meta.examId": examId }
        : { firebaseId: userId, "savedExams.meta.examId": examId };

      updatedDoc = await Signup.findOneAndUpdate(queryByMeta, { $set: update }, { new: true }).select(
        "savedExams"
      );
      if (!updatedDoc) {
        console.warn("[examRoutes] edit-exam: not found:", examId);
        return res.status(404).json({ message: "Exam not found for user" });
      }
    }

    // find updated subdoc
    const found = (updatedDoc.savedExams || []).find((s) => {
      if (!s) return false;
      if (s._id && s._id.toString() === examId) return true;
      if (s.meta && (s.meta.examId === examId || s.meta.examId?.toString?.() === examId)) return true;
      return false;
    });

    return res.json({ message: "Updated", exam: found || null });
  } catch (err) {
    console.error("[examRoutes] Error in PUT /edit-exam:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
