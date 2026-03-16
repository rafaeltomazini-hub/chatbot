import { Request, Response } from "express";
import { generateChatResponse } from "../services/openaiService";

/**
 * Handles incoming chat messages from the frontend
 */
export async function handleChat(
  req: Request,
  res: Response,
): Promise<Response | void> {
  try {
    const { message } = req.body;

    if (!message) {
      return res
        .status(400)
        .json({ error: "Message is required in the request body." });
    }

    // Call our service to get the AI response
    const aiResponse = await generateChatResponse(message);

    // Send the response back to the widget
    return res.json({
      success: true,
      reply: aiResponse,
    });
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
