import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

// Initialize the OpenAI client using the key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Sends a message block to OpenAI and returns the response.
 * Later, we will use this function to include the vector DB context.
 */
export async function generateChatResponse(
  userMessage: string,
): Promise<string | null> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful industrial equipment assistant for Isofluid. Keep your answers concise, professional, and in Portuguese.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.2, // Low temperature for more factual, less creative responses
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to communicate with OpenAI");
  }
}
