// src/routes/telegram.routes.js

import express from "express";
import { handleTelegramUpdate } from "../controllers/telegram.controller.js";
import { rateLimit } from "../middleware/rateLimit.middleware.js";

const router = express.Router();

/*
  Health Check Route
  Useful for testing webhook endpoint manually
*/
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Telegram webhook route is active 🚀"
  });
});

/*
  Telegram Webhook Endpoint
  POST requests from Telegram land here
*/
router.post(
  "/",
  rateLimit,               // Protect against spam
  handleTelegramUpdate     // Main controller
);

export default router;