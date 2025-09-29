const express = require("express");
const router = express.Router();

// Health check
router.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

module.exports = router;
