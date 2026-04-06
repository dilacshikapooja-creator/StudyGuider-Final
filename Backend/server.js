import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import session from "express-session";
import passport from "passport";
import "./config/passport.js";
import mongoose from "mongoose";
import path from "path";
import{ fileURLToPath } from "url";
import noteRoutes from "./routes/noteRoutes.js";
import adminRoutes from "./routes/admin.routes.js";
import quizRoutes from "./routes/quizRoutes.js";
import mindmapRoutes from "./routes/mindmapRoutes.js"; 
import translateRoutes from "./routes/translateRoutes.js";
import summaryRoutes from "./routes/summaryRoutes.js";

dotenv.config();

const app = express();

app.use("/api/admin", adminRoutes);
app.use("/api/translate", translateRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(
  session({
    secret:"secretkey",
    resave: false,
    saveUninitialized: false,
  })
)

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/notes", noteRoutes);
app.use("/api/mindmap", mindmapRoutes);

app.use(passport.initialize());
app.use(passport.session());

connectDB();

const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/text-summary", summaryRoutes);
 
app.get("/", (req, res) => {
  res.send("API running...");
});

app.get("/", (req, res) => {
  res.send("Study Guider Notes API is running... ");
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//MongoDB connection 
mongoose
.connect(process.env.MONGO_URI)
.then(() =>  {
  console.log("MongoDB connected");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  }); 
})
.catch((err) => {
  console.error("MongoDB connection error:", err.message);    

});