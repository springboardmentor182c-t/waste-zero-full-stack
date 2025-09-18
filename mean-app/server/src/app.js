
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./api/modules/user/user.routes.js";
import { errorHandler } from "./api/middlewares/errorHandler.js";


const app = express();

// MongoDB connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/mean-app";
mongoose.connect(mongoURI)
	.then(() => {
		console.log("MongoDB connected successfully");
	})
	.catch((err) => {
		console.error("MongoDB connection error:", err);
		process.exit(1);
	});

app.use(express.json());
app.use("/api/auth", userRoutes);
app.use(errorHandler);

export default app;
