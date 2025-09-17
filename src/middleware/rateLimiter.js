// src/middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 5, // limit each IP to 5 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: { error: 'Too many requests from this IP, please try again later.' }
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = { authLimiter, generalLimiter };
