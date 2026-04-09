// import jwt from "jsonwebtoken";
// import User from "../models/User.model.js";
 
// export const protect = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!token) {
//       return res.status(401).json({ message: "No token, access denied" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect route - check token
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized, no token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-passwordHash");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, token failed",
      error: error.message,
    });
  }
};

// Admin only middleware
export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin only",
    });
  }

  next();
};