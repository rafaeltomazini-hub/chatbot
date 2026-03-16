import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes";
import { validateSessionData } from "./middlewares/sessionMiddleware";

import { AppDataSource } from "./data-source";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/chat", chatRoutes);

// Basic Health Check Route
app.get("/health", validateSessionData, (req, res) => {
  console.log("health endpoitn running");
  res.json({ status: "ok", message: "Chatbot API is running!" });
});

// Initialize Database and Start the server
AppDataSource.initialize()
  .then(() => {
    console.log("------------------------------");
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("------------------------------");
    console.error("Error during Data Source initialization:", err);
  });
