import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    noteType: {
      type: String,
      enum: ["pdf", "text", "image"],
      required: true,
    },
    textContent: {
      type: String,
      default: "",
    },
    fileUrl: {
      type: String,
      default: "",
    },
    originalName: {
      type: String,
      default: "",
    },
    mimeType: {
      type: String,
      default: "",
    },
    fileSize: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;