import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./api/modules/user/user.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/users", userRoutes);

export default app;
