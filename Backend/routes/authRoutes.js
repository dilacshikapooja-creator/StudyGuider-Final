import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
const router = express.Router();
import {
  register,
  login,
  googleLogin,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";


// ===================== AUTH ROUTES =====================

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Google Login
router.post("/google", googleLogin);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password", resetPassword);


router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);


router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, role: req.user.role || "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    
    res.redirect(`http://localhost:3000/google-success?token=${token}`);
  }
);

export default router;