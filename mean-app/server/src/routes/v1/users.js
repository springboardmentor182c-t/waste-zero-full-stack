const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../../controllers/usercontroller");
const authMiddleware = require("../../middleware/auth");
const { profileUpdateValidation } = require("../../middleware/validators");
const validate = require("../../middleware/validate");

// Get user profile by ID
router.get("/:id", authMiddleware, getProfile);

// Update user profile by ID
router.put("/:id", authMiddleware, profileUpdateValidation, validate, updateProfile);

module.exports = router;
