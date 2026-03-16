import { Router } from "express";
import { handleChat } from "../controllers/chatController";
import { validateSessionData } from "../middlewares/sessionMiddleware";

const router = Router();

// POST /api/chat
router.post("/", handleChat);

export default router;
