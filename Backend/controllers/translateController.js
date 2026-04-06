import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const translateText = async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;

    if (!text || !targetLanguage) {
      return res.status(400).json({
        success: false,
        message: "Text and targetLanguage are required",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are a helpful AI study assistant.

Translate the following study content into ${targetLanguage}.
Use simple and clear language for students.
Do not change the meaning.
Keep the output neat and readable.

Text:
${text}
      `,
    });

    res.status(200).json({
      success: true,
      translatedText: response.text,
    });
  } catch (error) {
    console.error("Translation Error:", error);
    res.status(500).json({
      success: false,
      message: "Translation failed",
      error: error.message,
    });
  }
};