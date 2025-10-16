import express from "express";
import mongoose from "mongoose";
import{ MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import authRoutes from "./src/api/modules/user/user.routes.js";
import errorHandler from "./src/api/middleware/errorHandler.js";
import dashboardRoutes from "./src/api/modules/dashboard/dashboard.routes.js";

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
const client = new MongoClient(process.env.DB_URI);
let db;
client.connect()
  .then(() => {
    db = client.db("atlas"); // use your DB name here
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
// CREATE
app.post('/api/opportunities', async (req, res) => {
  try {
    const result = await db.collection("opportunities").insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ all
app.get('/api/opportunities', async (req, res) => {
  try {
    const opportunities = await db.collection("opportunities").find().toArray();
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ one by ID
app.get('/api/opportunities/:id', async (req, res) => {
  try {
    const opportunity = await db.collection("opportunities").findOne({ _id: new ObjectId(req.params.id) });
    if (!opportunity) return res.status(404).json({ message: "Not found" });
    res.json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
app.put('/api/opportunities/:id', async (req, res) => {
  try {
    const result = await db.collection("opportunities").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
app.delete('/api/opportunities/:id', async (req, res) => {
  try {
    const result = await db.collection("opportunities").deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// -------------------- ERROR HANDLER --------------------
app.use(errorHandler);

// -------------------- DATABASE CONNECTION --------------------
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

app.use("/api/v1", dashboardRoutes);
// -------------------- SERVER --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));