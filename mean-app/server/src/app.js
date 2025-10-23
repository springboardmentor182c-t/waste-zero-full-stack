require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

const connectDB = require("./utils/connectDB");
const logger = require("./utils/logger");
const swaggerSetup = require("./docs/swagger");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(
  morgan("combined", {
    stream: { write: (msg) => logger.info(msg.trim()) },
  })
);

// Body & param sanitization
app.use((req, res, next) => {
  if (req.body) req.body = mongoSanitize.sanitize(req.body);
  if (req.params) req.params = mongoSanitize.sanitize(req.params);
  next();
});

// Rate limiting
const globalLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
  max: Number(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: "Too many requests from this IP, please try again after 15 minutes." },
});

app.use(globalLimiter);

// Routes
app.use("/api/v1/auth", authLimiter, require("./routes/v1/auth"));
app.use("/api/v1/users", require("./routes/v1/users"));
app.use("/api/v1/health", require("./routes/v1/health"));

// Swagger docs
swaggerSetup(app);

// Error handler (last)
app.use(errorHandler);

module.exports = app;
