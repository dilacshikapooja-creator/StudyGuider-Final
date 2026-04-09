// import express from "express";
// import {
//   getAdminStats,
//   getAllUsers,
//   deleteUser,
//   getAllNotes,
//   deleteNote,
// } from "../controllers/admin.controller.js";

// const router = express.Router();

// // Admin stats
// router.get("/stats", getAdminStats);

// // Users
// router.get("/users", getAllUsers);
// router.delete("/users/:id", deleteUser);

// // Notes
// router.get("/notes", getAllNotes);
// router.delete("/notes/:id", deleteNote);

// export default router;
import express from "express";
import {
  getAdminStats,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  getAllNotes,
  getSingleNote,
  deleteNote,
} from "../controllers/admin.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Dashboard stats
router.get("/stats", protect, adminOnly, getAdminStats);

// User management
router.get("/users", protect, adminOnly, getAllUsers);
router.get("/users/:id", protect, adminOnly, getSingleUser);
router.put("/users/:id/role", protect, adminOnly, updateUserRole);
router.delete("/users/:id", protect, adminOnly, deleteUser);

// Notes management
router.get("/notes", protect, adminOnly, getAllNotes);
router.get("/notes/:id", protect, adminOnly, getSingleNote);
router.delete("/notes/:id", protect, adminOnly, deleteNote);

export default router;