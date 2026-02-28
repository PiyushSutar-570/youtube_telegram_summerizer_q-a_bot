// src/services/summary.service.js

import axios from "axios";

export const generateSummary = async (
  transcriptArray,
  language = "English",
  mode = "summary"
) => {
  try {
    const fullText = transcriptArray.map(t => t.text).join(" ");

    let instruction = "";

    if (mode === "summary") {
      instruction = `
Return:

🎥 Video Overview
📌 5 Key Points (bullet format)
⏱ Important Topics Covered
🧠 Core Takeaway
`;
    }

    if (mode === "deepdive") {
      instruction = `
Return:

🔎 Detailed Explanation of All Major Concepts
📚 Technical Insights
⚙️ Real-world Applications
`;
    }

    if (mode === "actionpoints") {
      instruction = `
Return:

✅ Actionable Steps
📌 Implementation Guidance
🎯 Key Practical Takeaways
`;
    }

    const prompt = `
You are a strict AI research assistant.

Respond ONLY in ${language}.

Summarize the transcript below.

Do NOT use external knowledge.
Base your answer strictly on transcript content.

${instruction}

Transcript:
${fullText.slice(0, 4000)}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 800
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
    console.error("Summary error:", error.response?.data || error.message);
    return "Failed to generate summary ❌";
  }
};