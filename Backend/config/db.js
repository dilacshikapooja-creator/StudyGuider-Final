import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URL;

    if (!uri) {
      throw new Error("MongoDB connection string not defined");
    }

    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;