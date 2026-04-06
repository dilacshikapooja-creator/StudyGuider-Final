import fs from "fs";
import MindMap from "../models/MindMap.js";
import { extractPdfText } from "../utils/extractPdfText.js";
import { generateMindMapFromText } from "../utils/geminiMindmap.js";

export const generateMindMap = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    const filePath = req.file.path;
    const originalFileName = req.file.originalname;

    const text = await extractPdfText(filePath);

    if (!text.trim()) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: "Could not extract text from PDF" });
    }

    const mindMapData = await generateMindMapFromText(text);

    fs.unlinkSync(filePath);

    return res.status(200).json({
      message: "Mind map generated successfully",
      title: mindMapData.title,
      sourceText: text,
      originalFileName,
      mindMapData,
    });
  } catch (error) {
    console.error("Generate mind map error:", error);
    return res.status(500).json({
      message: "Failed to generate mind map",
      error: error.message,
    });
  }
};

export const saveMindMap = async (req, res) => {
  try {
    const { title, sourceText, originalFileName, mindMapData } = req.body;

    if (!title || !sourceText || !mindMapData) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newMap = await MindMap.create({
      title,
      sourceText,
      originalFileName,
      mindMapData,
    });

    return res.status(201).json({
      message: "Mind map saved successfully",
      data: newMap,
    });
  } catch (error) {
    console.error("Save mind map error:", error);
    return res.status(500).json({
      message: "Failed to save mind map",
      error: error.message,
    });
  }
};

export const regenerateMindMap = async (req, res) => {
  try {
    const { sourceText, mode } = req.body;

    if (!sourceText) {
      return res.status(400).json({ message: "Source text is required" });
    }

    const mindMapData = await generateMindMapFromText(sourceText, mode);

    return res.status(200).json({
      message: "Mind map regenerated successfully",
      title: mindMapData.title,
      mindMapData,
    });
  } catch (error) {
    console.error("Regenerate mind map error:", error);
    return res.status(500).json({
      message: "Failed to regenerate mind map",
      error: error.message,
    });
  }
};

export const getAllMindMaps = async (req, res) => {
  try {
    const maps = await MindMap.find().sort({ createdAt: -1 });
    return res.status(200).json(maps);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch mind maps" });
  }
};

export const getSingleMindMap = async (req, res) => {
  try {
    const map = await MindMap.findById(req.params.id);

    if (!map) {
      return res.status(404).json({ message: "Mind map not found" });
    }

    return res.status(200).json(map);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch mind map" });
  }
};