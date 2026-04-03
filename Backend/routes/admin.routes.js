import express from "express";
import {
  getAdminStats,
  getRecentUsers,
  getRecentNotes,
} from "../controllers/admin.controller.js";
import { protect}from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/stats", protect, adminMiddleware, getAdminStats);
router.get("/recent-users", protect, adminMiddleware, getRecentUsers);
router.get("/recent-notes", protect, adminMiddleware, getRecentNotes);

export default router;