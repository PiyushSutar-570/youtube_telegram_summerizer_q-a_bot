// src/utils/chunk.util.js

export const chunkTranscript = (
  transcript,
  chunkSize = 800,        // characters
  overlapSize = 150       // overlap
) => {
  const fullText = transcript.map(t => t.text).join(" ");

  const chunks = [];
  let start = 0;

  while (start < fullText.length) {
    const end = start + chunkSize;

    const chunk = fullText.slice(start, end).trim();
    chunks.push(chunk);

    start += chunkSize - overlapSize;
  }

  return chunks;
};