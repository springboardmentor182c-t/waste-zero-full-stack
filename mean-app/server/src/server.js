const app = require("./app");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 5000;

// Start the server
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Graceful shutdown on SIGTERM
process.on("SIGTERM", () => {
  logger.info("SIGTERM received, shutting down gracefully");
  server.close(() => {
    logger.info("Server closed");
    process.exit(0);
  });
});
