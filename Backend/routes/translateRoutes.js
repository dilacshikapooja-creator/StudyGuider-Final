import express from "express";
import { translateSummary } from "../controllers/translateController.js";

const router = express.Router();

router.post("/translate-summary", translateSummary);

export default router;