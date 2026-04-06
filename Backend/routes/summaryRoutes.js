import express from "express";
import multer from "multer";
import path from "path";
import { uploadNote, generateSummaryFromText } from "../controllers/text-summarycontroller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/upload-summary", upload.single("file"), uploadNote);
router.post("/text-summary", generateSummaryFromText);

export default router;