import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateMindMapFromText = async (text, mode = "normal") => {
  let styleInstruction = "";

  if (mode === "exam") {
    styleInstruction =
      "Make it exam-focused. Keep only high-value concepts, definitions, and key points.";
  } else if (mode === "short") {
    styleInstruction =
      "Make it short and simple. Use fewer child nodes.";
  } else {
    styleInstruction =
      "Make it balanced and clear for student learning.";
  }

  const prompt = `
You convert study notes into a mind map JSON.

Rules:
- Return ONLY valid JSON
- No markdown
- No explanation
- No extra text
- Keep structure simple and clean

Expected format:
{
  "title": "Main Topic",
  "children": [
    {
      "title": "Sub Topic 1",
      "children": [
        { "title": "Point 1" },
        { "title": "Point 2" }
      ]
    }
  ]
}

${styleInstruction}

Study notes:
${text}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const raw = (response.text || "").trim();

  const cleaned = raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    throw new Error("Gemini returned invalid JSON");
  }
};