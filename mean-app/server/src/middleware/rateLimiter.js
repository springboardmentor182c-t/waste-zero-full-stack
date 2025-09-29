const rateLimit = require("express-rate-limit");

const globalLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000, // 1 minute
  max: Number(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: {
    error: "Too many requests from this IP, please try again after 15 minutes.",
  },
});

module.exports = {
  globalLimiter,
  authLimiter,
};
