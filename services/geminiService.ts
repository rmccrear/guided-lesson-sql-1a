import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const askAiTutor = async (
  prompt: string,
  context: {
    currentQuery: string;
    error?: string;
    lessonTitle: string;
    lessonInstructions: string;
  }
): Promise<string> => {
  try {
    const ai = getClient();
    
    // Construct a context-aware prompt
    const fullPrompt = `
      You are a helpful and encouraging SQL Tutor.
      
      Current Lesson: ${context.lessonTitle}
      Instructions: ${context.lessonInstructions}
      
      Student's Query: 
      \`\`\`sql
      ${context.currentQuery}
      \`\`\`
      
      Error (if any): ${context.error || "None"}
      
      Student Question: ${prompt}
      
      Provide a concise, helpful explanation. If there is an error, explain why it happened and hint at how to fix it without directly giving the code unless explicitly asked for the solution. Keep the tone educational.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });

    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the AI tutor right now. Please check your API key configuration.";
  }
};
