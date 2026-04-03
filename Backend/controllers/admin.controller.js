import User from "../models/User.js";
import Note from "../models/Note.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalNotes = await Note.countDocuments();
    const activeStudents = await User.countDocuments({ role: "student" });

    const totalQuizzes = 0;

    res.json({
      totalUsers,
      totalNotes,
      totalQuizzes,
      activeStudents,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load admin stats" });
  }
};

export const getRecentUsers = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email role createdAt");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recent users" });
  }
};

export const getRecentNotes = async (req, res) => {
  try {
    const notes = await Note.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title subject userId createdAt");

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recent notes" });
  }
};