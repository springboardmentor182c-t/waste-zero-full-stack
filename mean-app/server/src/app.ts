import express from "express";
import messageRoutes from "./api/modules/messages/messages.routes";

const app = express();

app.use(express.json());

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("🚀 Messages API is running!");
});

app.use("/api/messages", messageRoutes);

export default app;
