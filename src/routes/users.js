const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/usercontroller');
const auth = require('../middleware/auth');

// ✅ Get user profile by ID (requires auth)
router.get('/:id', auth, getProfile);

// ✅ Update user profile by ID (requires auth)
router.put('/:id', auth, updateProfile);

module.exports = router;
