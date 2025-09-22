import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import authRoutes from "./src/api/modules/user/user.routes.js";
import errorHandler from "./src/api/middleware/errorHandler.js";

dotenv.config();
const app = express();

// -------------------- MIDDLEWARES --------------------
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: "Too many requests, try again later" }
});
app.use("/api/", limiter);

// -------------------- ROUTES --------------------
// Mount user routes under /api/v1/users
app.use("/api/v1", authRoutes);

// Health Check
app.get("/api/v1/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// -------------------- ERROR HANDLER --------------------
app.use(errorHandler);

// -------------------- DATABASE CONNECTION --------------------
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// -------------------- SERVER --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
