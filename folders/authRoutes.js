const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Get user profile (protected)
router.get('/me', authMiddleware, getProfile);

module.exports = router;
