// src/services/qa.service.js

import axios from "axios";
import { chunkTranscript } from "../utils/chunk.util.js";
import { retrieveRelevantChunks } from "./retrieval.service.js";

export const answerQuestion = async (
  transcript,
  question,
  language = "English"
) => {
  try {
    const chunks = chunkTranscript(transcript);

    const relevant = retrieveRelevantChunks(chunks, question);

    // 🔥 NEVER early exit
    const context = relevant.length
      ? relevant.join("\n\n").slice(0, 3000)
      : chunks.slice(0, 5).join("\n\n"); // fallback context

    const prompt = `
You are an AI assistant.

Answer the user's question in ${language}.
Use ONLY the transcript context below.

If the transcript discusses the topic, answer clearly.
If truly not mentioned, then say it is not covered.

Transcript Context:
${context}

User Question:
${question}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 400,
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error("QA error:", error.response?.data || error.message);
    return "Failed to generate answer ❌";
  }
};