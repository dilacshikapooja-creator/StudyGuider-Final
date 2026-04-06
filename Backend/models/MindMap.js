import mongoose from "mongoose";

const mindMapSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sourceText: {
      type: String,
      required: true,
    },
    originalFileName: {
      type: String,
      default: "",
    },
    mindMapData: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MindMap", mindMapSchema);