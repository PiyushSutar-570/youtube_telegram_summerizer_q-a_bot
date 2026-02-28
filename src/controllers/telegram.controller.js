// src/controllers/telegram.controller.js

import axios from "axios";
import { extractVideoId, isYouTubeLink } from "../utils/youtube.util.js";
import { fetchTranscript } from "../services/transcript.service.js";
import { generateSummary } from "../services/summary.service.js";
import { answerQuestion } from "../services/qa.service.js";
import { setSession, getSession } from "../session/session.manager.js";

export const handleTelegramUpdate = async (req, res) => {
  const TELEGRAM_API = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

  const sendMessage = async (chatId, text, extra = {}) => {
    return axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text,
      ...extra
    });
  };

  try {
    // =========================================
    // 1️⃣ HANDLE CALLBACK BUTTONS
    // =========================================
    const callback = req.body.callback_query;

    if (callback) {
      const chatId = callback.message.chat.id;
      const data = callback.data;
      const session = getSession(chatId);

      // Language selection
      if (data.startsWith("lang_")) {
        const selectedLang = data.split("_")[1];

        setSession(chatId, { language: selectedLang });

        await sendMessage(chatId, `Language set to ${selectedLang} ✅`);
      }

      // Summary Modes
      if (data.startsWith("cmd_")) {
        if (!session?.transcript) {
          await sendMessage(chatId, "Send a YouTube link first 🎥");
          return res.sendStatus(200);
        }

        const mode = data.split("_")[1];

        await sendMessage(chatId, "Generating content... 🧠");

        const updatedSession = getSession(chatId);

        const result = await generateSummary(
          updatedSession.transcript,
          updatedSession?.language || "English",
          mode
        );

        await sendMessage(chatId, result);
      }

      return res.sendStatus(200);
    }

    // =========================================
    // 2️⃣ HANDLE NORMAL MESSAGES
    // =========================================
    const message = req.body.message;
    if (!message || !message.text) return res.sendStatus(200);

    const chatId = message.chat.id;
    const text = message.text.trim();
    const session = getSession(chatId);

    // =========================================
    // Language Command
    // =========================================
    if (text === "/language") {
      await sendMessage(chatId, "Choose language:", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "English 🇬🇧", callback_data: "lang_English" },
              { text: "Hindi 🇮🇳", callback_data: "lang_Hindi" }
            ]
          ]
        }
      });

      return res.sendStatus(200);
    }

    // =========================================
    // Summary Commands
    // =========================================
    if (["/summary", "/deepdive", "/actionpoints"].includes(text)) {
      if (!session?.transcript) {
        await sendMessage(chatId, "Send a YouTube link first 🎥");
        return res.sendStatus(200);
      }

      const mode = text.replace("/", "");

      await sendMessage(chatId, "Generating content... 🧠");

      const result = await generateSummary(
        session.transcript,
        session?.language || "English",
        mode
      );

      await sendMessage(chatId, result);

      return res.sendStatus(200);
    }

    // =========================================
    // YouTube Link Handling
    // =========================================
    if (isYouTubeLink(text)) {
      const videoId = extractVideoId(text);

      if (!videoId) {
        await sendMessage(chatId, "Invalid YouTube link ❌");
        return res.sendStatus(200);
      }

      await sendMessage(chatId, "Fetching transcript... ⏳");

      const transcript = await fetchTranscript(videoId);

      if (!transcript) {
        await sendMessage(chatId, "Transcript not available ❌");
        return res.sendStatus(200);
      }

      // Store transcript
      setSession(chatId, { transcript });

      const updatedSession = getSession(chatId);

      await sendMessage(chatId, "Generating summary... 🧠");

      const summary = await generateSummary(
        transcript,
        updatedSession?.language || "English",
        "summary"
      );

      await sendMessage(chatId, summary, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🔎 Deep Dive", callback_data: "cmd_deepdive" },
              { text: "📝 Action Points", callback_data: "cmd_actionpoints" }
            ]
          ]
        }
      });

      return res.sendStatus(200);
    }

    // =========================================
    // Follow-up Q&A
    // =========================================
    if (session?.transcript) {
      await sendMessage(chatId, "Analyzing question... 🔍");

      const answer = await answerQuestion(
        session.transcript,
        text,
        session?.language || "English"
      );

      await sendMessage(chatId, answer);

      return res.sendStatus(200);
    }

    // =========================================
    // Default Fallback
    // =========================================
    await sendMessage(chatId, "Send a YouTube link to begin 🎥");

    return res.sendStatus(200);

  } catch (error) {
    console.error("Controller error:", error.message);
    return res.sendStatus(200);
  }
};