// export const uploadAndSummarizeNote = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         message: "No file uploaded",
//       });
//     }

//     const fileName = req.file.originalname;

//     // Temporary demo summary
//     // Later you can replace this with OpenAI / Gemini / PDF parser
//     const summary = `
// This is an AI-generated summary for the uploaded file "${fileName}".

// Main Points:
// 1. The note contains important study content.
// 2. Key ideas are extracted for quick revision.
// 3. This summary helps students understand the lesson faster.
// 4. Use this summary before exams for quick preparation.
//     `.trim();

//     return res.status(200).json({
//       message: "File uploaded successfully",
//       fileName,
//       summary,
//     });
//   } catch (error) {
//     console.error("Upload summary error:", error);
//     return res.status(500).json({
//       message: "Server error while generating summary",
//     });
//   }
// };

import fs from "fs";
import { PDFParse } from "pdf-parse";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const uploadNote = async (req, res) => {
  let parser;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const fileName = req.file.originalname;
    const mimeType = req.file.mimetype;

    let extractedText = "";

    if (mimeType === "application/pdf") {
      const dataBuffer = fs.readFileSync(filePath);

      parser = new PDFParse({ data: dataBuffer });
      const result = await parser.getText();

      extractedText = result.text || "";
    } else if (mimeType === "text/plain") {
      extractedText = fs.readFileSync(filePath, "utf-8");
    } else {
      return res.status(400).json({
        message: "Only PDF and TXT files are supported for summary right now",
      });
    }

    if (!extractedText.trim()) {
      return res.status(400).json({
        message: "Could not extract text from this file",
      });
    }

    const shortText = extractedText.slice(0, 12000);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Summarize the following study note in simple student-friendly English.

Text:
${shortText}`,
      config: {
        temperature: 0.3,
      },
    });

    return res.status(200).json({
      message: "Summary generated successfully",
      fileName,
      summary: response.text,
    });
  } catch (error) {
    console.error("Upload Note Error:", error);
    return res.status(500).json({
      message: "Server error while generating summary",
      error: error.message,
    });
  } finally {
    if (parser) {
      try {
        await parser.destroy();
      } catch {}
    }
  }
};