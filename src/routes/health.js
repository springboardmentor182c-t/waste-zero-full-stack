const express = require('express');
const router = express.Router();

// Simple health check endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

module.exports = router;
