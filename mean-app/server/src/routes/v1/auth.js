const express = require("express");
const { body } = require("express-validator");
const { registerUser, loginUser, getProfile } = require("../../controllers/authcontroller");
const authMiddleware = require("../../middleware/auth");
const validate = require("../../middleware/validate");

const router = express.Router();

// Register
router.post(
  "/register",
  [
    body("username").optional().isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
    body("name").optional().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("role").optional().isIn(["volunteer", "ngo", "admin"]).withMessage("Role must be volunteer, ngo, or admin"),
  ],
  validate,
  registerUser
);

// Login
router.post(
  "/login",
  [
    body("password").notEmpty().withMessage("Password is required"),
    body("email").optional().isEmail().withMessage("Invalid email"),
    body("username").optional().isString(),
  ],
  validate,
  loginUser
);

// Get logged-in user's profile
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
