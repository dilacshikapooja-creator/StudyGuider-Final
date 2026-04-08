import User from "../models/User.js";
import Note from "../models/Note.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalNotes = await Note.countDocuments();

    res.status(200).json({
      totalUsers,
      totalStudents,
      totalAdmins,
      totalNotes,
      recentUsers,
      recentNotes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Note.deleteMany({ user: user._id });
    await user.deleteOne();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await note.deleteOne();

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};