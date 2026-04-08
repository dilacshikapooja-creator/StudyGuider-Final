import express from "express";
import {
  getAdminStats,
  getAllUsers,
  deleteUser,
  getAllNotes,
  deleteNote,
} from "../controllers/admin.controller.js";

const router = express.Router();

// Admin stats
router.get("/stats", getAdminStats);

// Users
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

// Notes
router.get("/notes", getAllNotes);
router.delete("/notes/:id", deleteNote);

export default router;