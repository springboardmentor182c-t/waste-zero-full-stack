const app = require("./app");
const PORT = process.env.PORT || 5000;
const connectDB = require("./utils/db");
const opportunityRoutes = require("./routes/v1/opportunityRoutes"); // adjust path if needed

app.use("/api/opportunities", opportunityRoutes); // PLACE THIS ABOVE listen()

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

["SIGTERM", "SIGINT"].forEach((signal) =>
  process.on(signal, () => {
    console.info(`${signal} received, shutting down gracefully`);
    server.close(() => {
      console.log("Closed out remaining connections");
      process.exit(0);
    });
  })
);

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
  process.exit(1);
});
