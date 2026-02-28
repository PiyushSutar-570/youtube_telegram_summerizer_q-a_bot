// src/middleware/rateLimit.middleware.js

const userRequests = new Map();
const COOLDOWN_MS = 3000; // 3 seconds

export const rateLimit = (req, res, next) => {

  const chatId =
    req.body.message?.chat?.id ||
    req.body.callback_query?.message?.chat?.id;

  if (!chatId) return next();

  const now = Date.now();
  const lastRequest = userRequests.get(chatId) || 0;

  if (now - lastRequest < COOLDOWN_MS) {
    return res.sendStatus(200);
  }

  userRequests.set(chatId, now);

  // Auto-clean after 1 minute
  setTimeout(() => {
    userRequests.delete(chatId);
  }, 60000);

  next();
};