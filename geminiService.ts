import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getStyleAdvice(productName: string, description: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "You are a professional Nike fashion stylist. Provide concise styling advice for the given footwear. Focus on outfit combinations, color coordination, and activity suitability. Keep it energetic, modern, and brand-aligned.",
      },
      contents: `Product: ${productName}. Description: ${description}. Provide 3 short bullet points of styling advice.`,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error getting style advice. But hey, these shoes look great with anything!";
  }
}

export async function getRecommendations(preferences: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "You are an AI shopping assistant for Nike. Based on user preferences, suggest a focus category or style of shoe. Return a JSON object with 'suggestion' and 'reason'.",
        responseMimeType: "application/json",
      },
      contents: `User says: ${preferences}`,
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Error:", error);
    return { suggestion: "N/A", reason: "Error" };
  }
}
