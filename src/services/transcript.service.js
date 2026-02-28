// src/services/transcript.service.js

import { fetchTranscript as ytFetchTranscript } from "youtube-transcript-plus";

const transcriptCache = new Map();

export const fetchTranscript = async (videoId) => {
  try {
    //Check cache first
    if (transcriptCache.has(videoId)) {
      return transcriptCache.get(videoId);
    }

    const transcript = await ytFetchTranscript(videoId, {
      lang: "en"
    });

    if (!transcript || transcript.length === 0) {
      return null;
    }

    const cleaned = transcript.map((item) => ({
      text: item.text.replace(/\s+/g, " ").trim(),
      offset: item.offset,
      duration: item.duration,
    }));

    //Cache it
    transcriptCache.set(videoId, cleaned);

    return cleaned;

  } catch (error) {
    console.error("Transcript error:", error.message);
    return null;
  }
};