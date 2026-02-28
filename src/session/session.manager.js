// src/session/session.manager.js

const sessionStore = new Map();

export const setSession = (chatId, data) => {
  const existing = sessionStore.get(chatId) || {};
  sessionStore.set(chatId, { ...existing, ...data });
};

export const getSession = (chatId) => {
  return sessionStore.get(chatId);
};

export const clearSession = (chatId) => {
  sessionStore.delete(chatId);
};

const transcriptCache = new Map();

export const cacheTranscript = (videoId, transcript) => {
  transcriptCache.set(videoId, transcript);
};

export const getCachedTranscript = (videoId) => {
  return transcriptCache.get(videoId);
};