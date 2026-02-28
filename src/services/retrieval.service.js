import { generateEmbedding } from "./embedding.service.js";
import { cosineSimilarity } from "../utils/embedding.util.js";

export const retrieveRelevantChunks = async (chunks, question) => {
  const questionEmbedding = await generateEmbedding(question);

  const scored = [];

  for (const chunk of chunks) {
    const chunkEmbedding = await generateEmbedding(chunk);

    const score = cosineSimilarity(questionEmbedding, chunkEmbedding);

    scored.push({ chunk, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.chunk);
};