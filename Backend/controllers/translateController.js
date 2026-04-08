import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const translateSummary = async (req, res) => {
  try {
    const { text, language } = req.body;

    if (!text || !language) {
      return res.status(400).json({
        message: "Text and language are required",
      });
    }

    const prompt = `
Translate the following study summary into ${language}.
Keep the meaning simple and clear.
Do not add extra explanation.

Text:
${text}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const translatedText = response.text;

    res.status(200).json({
      success: true,
      translatedText,
    });
  } catch (error) {
    console.error("Translate Error:", error);
    res.status(500).json({
      success: false,
      message: "Translation failed",
    });
  }
};