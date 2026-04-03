import fs from "fs";
import { GoogleGenAI, createPartFromUri } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateQuizFromPdf = async (req, res) => {
  try {
    const file = req.file;
    const questionCount = Number(req.body.questionCount || 10);

    if (!file) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    if (!questionCount || questionCount < 1 || questionCount > 20) {
      return res.status(400).json({ message: "Question count must be between 1 and 20" });
    }

    const uploadedFile = await ai.files.upload({
      file: file.path,
      config: {
        mimeType: "application/pdf",
      },
    });

    const prompt = `
You are a quiz generator.

Read the uploaded PDF and create exactly ${questionCount} multiple-choice questions.

Return ONLY valid JSON in this format:
[
  {
    "question": "Question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Correct option text",
    "explanation": "Short explanation"
  }
]

Rules:
- Create exactly ${questionCount} questions
- Each question must have 4 options
- answer must exactly match one option
- Keep questions clear and based only on the PDF
- Do not include markdown
- Do not include extra text
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        createPartFromUri(uploadedFile.uri, uploadedFile.mimeType),
        prompt,
      ],
    });

    const rawText = response.text.trim();

    let quiz;
    try {
      quiz = JSON.parse(rawText);
    } catch (parseError) {
      return res.status(500).json({
        message: "AI returned invalid JSON",
        raw: rawText,
      });
    }

    if (!Array.isArray(quiz)) {
      return res.status(500).json({ message: "Quiz format is invalid" });
    }

    res.status(200).json({
      message: "Quiz generated successfully",
      quiz,
    });
  } catch (error) {
    console.error("Quiz generation error:", error);
    res.status(500).json({
      message: "Failed to generate quiz",
      error: error.message,
    });
  }
};