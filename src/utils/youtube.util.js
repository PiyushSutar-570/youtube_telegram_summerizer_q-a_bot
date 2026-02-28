// src/utils/youtube.util.js

export const extractVideoId = (url) => {
  const regex =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(regex);
  return match ? match[1] : null;
};

export const isYouTubeLink = (text) => {
  return extractVideoId(text) !== null;
};