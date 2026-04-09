// import User from "../models/User.js";
// import Note from "../models/Note.js";

// export const getAdminStats = async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     const totalStudents = await User.countDocuments({ role: "student" });
//     const totalAdmins = await User.countDocuments({ role: "admin" });
//     const totalNotes = await Note.countDocuments();

//     res.status(200).json({
//       totalUsers,
//       totalStudents,
//       totalAdmins,
//       totalNotes,
//       recentUsers,
//       recentNotes,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-passwordHash").sort({ createdAt: -1 });
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     await Note.deleteMany({ user: user._id });
//     await user.deleteOne();

//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getAllNotes = async (req, res) => {
//   try {
//     const notes = await Note.find()
//       .populate("user", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json(notes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const deleteNote = async (req, res) => {
//   try {
//     const note = await Note.findById(req.params.id);

//     if (!note) {
//       return res.status(404).json({ message: "Note not found" });
//     }

//     await note.deleteOne();

//     res.status(200).json({ message: "Note deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import User from "../models/User.js";
import Note from "../models/Note.js";

// Get dashboard stats
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalNotes = await Note.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalStudents,
        totalAdmins,
        totalNotes,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin stats",
      error: error.message,
    });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-passwordHash")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// Get single user
export const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

// Update user role
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role || !["student", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be either student or admin",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user role",
      error: error.message,
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

// Get all notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notes.length,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
      error: error.message,
    });
  }
};

// Get single note
export const getSingleNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate(
      "user",
      "name email role"
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch note",
      error: error.message,
    });
  }
};

// Delete note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    await Note.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete note",
      error: error.message,
    });
  }
};