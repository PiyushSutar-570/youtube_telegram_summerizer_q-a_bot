// src/middleware/error.middleware.js

const errorMiddleware = (err, req, res, next) => {

  console.error("🔥 Error:", err.stack || err.message);

  const status = err.status || 500;

  // For Telegram webhook safety
  if (req.originalUrl.includes("/webhook")) {
    return res.sendStatus(200);
  }

  res.status(status).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong."
        : err.message
  });
};

export default errorMiddleware;