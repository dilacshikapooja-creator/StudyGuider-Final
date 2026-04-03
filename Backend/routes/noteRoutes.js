// import express from "express";
// import multer from "multer";
// import path from "path";
// import { uploadAndSummarizeNote } from "../controllers/notecontroller.js";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueName =
//       Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
//     cb(null, uniqueName);
//   },
// });

// const upload = multer({ storage });

// router.post("/upload", upload.single("note"), uploadAndSummarizeNote);

// export default router;

import express from "express";
import multer from "multer";
import path from "path";
import { uploadNote } from "../controllers/notecontroller.js";

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

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "text/plain",
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, TXT, and image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.post("/upload", upload.single("note"), uploadNote);

export default router;