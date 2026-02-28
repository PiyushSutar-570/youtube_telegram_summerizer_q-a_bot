// src/server.js

import express from "express";
import dotenv from "dotenv";
import telegramRoutes from "./routes/telegram.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

// Parse JSON
app.use(express.json({ limit: "1mb" }));

// Mount Telegram Webhook
app.use("/webhook", telegramRoutes);

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "YouTube Telegram Bot running 🚀"
  });
});

// Global Error Handler (must be last)
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});