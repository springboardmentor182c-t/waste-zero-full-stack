import express from "express";
import userRoutes from "./api/modules/user/user.routes.js";
import { errorHandler } from "./api/middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use("/api/auth", userRoutes);
app.use(errorHandler);

export default app;
