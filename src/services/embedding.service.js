// src/services/embedding.service.js

import axios from "axios";

export const generateEmbedding = async (text) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/embeddings",
      {
        model: "openai/text-embedding-3-small",
        input: text
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.data[0].embedding;

  } catch (error) {
    console.error("Embedding error:", error.response?.data || error.message);
    throw new Error("Failed to generate embedding");
  }
};