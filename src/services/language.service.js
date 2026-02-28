// src/services/language.service.js

import axios from "axios";

export const translateText = async (text, targetLanguage) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `
You are a professional translator.

Translate the text below into ${targetLanguage}.
Preserve structure and formatting.
Do not add extra commentary.

Text:
${text}
`
          }
        ],
        max_tokens: 600,
        temperature: 0.1
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
    console.error("Translation error:", error.response?.data || error.message);
    return text;
  }
};