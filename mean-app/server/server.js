import express from "express";
import mongoose from "mongoose";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import http from "http";
import { Server } from "socket.io";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import authRoutes from "./src/api/modules/user/user.routes.js";
import opportunityRoutes from "./src/api/modules/opportunity/opportunity.routes.js";
import dashboardRoutes from "./src/api/modules/dashboard/dashboard.routes.js";
import adminPanelRoutes from "./src/api/modules/adminpanel/adminpanel.routes.js";
import messageRoutes from "./src/api/modules/messages/message.routes.js";

import errorHandler from "./src/api/middleware/errorHandler.js";
import pickupRoutes from "./src/api/modules/pickup/pickup.routes.js"; // <-- Pickup routes

dotenv.config();
const app = express();

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Waste Zero API Documentation',
      version: '1.0.0',
      description: 'Documentation for the Waste Zero application API',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
  },
  apis: [
    './src/api/modules/**/*.js',  // Path to the API routes
    './server.js',                // Main server file
  ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Expose raw OpenAPI JSON for debugging (visit /api-docs.json)
app.get('/api-docs.json', (req, res) => res.json(swaggerSpec));

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
// User routes
app.use("/api/v1", authRoutes);

// ---------- DATABASE (optional) ----------

const dbUri = process.env.DB_URI;
let db;
if (dbUri) {
  try {
    const client = new MongoClient(dbUri);
    client.connect()
      .then(() => {
        db = client.db("atlas"); // use your DB name here
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
      });
  } catch (err) {
    console.error('MongoClient creation failed:', err);
  }
} else {
  console.warn('DB_URI is not set. Skipping MongoDB client connection. Set DB_URI in .env to enable DB.');
}

// Register opportunity routes

// Opportunity routes
app.use("/api/opportunities", opportunityRoutes);

// Pickup routes
app.use("/api/v1/pickup", pickupRoutes);  // <-- Added Schedule Pickup API

// Messages routes
app.use("/api/v1/messages", messageRoutes);

// Dashboard routes
app.use("/api/v1/dashboard", dashboardRoutes);

// -------------------- ERROR HANDLER --------------------
app.use(errorHandler);

// -------------------- DATABASE CONNECTION --------------------
// Only connect mongoose if DB_URI is present to avoid startup failure when
// the environment variable is missing.
if (process.env.DB_URI) {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ DB Connection Error:", err));
} else {
  console.warn('DB_URI is not set. Skipping mongoose.connect.');
}

app.use("/api/v1/admin", adminPanelRoutes);

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*", // your frontend URL if needed
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// -------------------- SERVER --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
