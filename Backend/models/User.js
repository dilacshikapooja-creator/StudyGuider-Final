import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trium: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

  
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
    },

    resetPasswordToken: {
      type: String,
      default:null,
      
    },

    resetPasswordExpires: {
      type: Date,
      default:null,
      
    },
  
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local"
    },
    googleId: {
      type: String,
      
    },
    avatar: {
      type: String,
      
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    
  },
  { timestamps: true }
);
 
const User = mongoose.model("User", userSchema);

export default User;