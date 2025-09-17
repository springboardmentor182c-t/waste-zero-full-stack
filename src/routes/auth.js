const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authcontroller');
const { body } = require('express-validator');
const validateRequest = require('../middleware/validateRequest');

// ✅ Register route with validation
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email')
      .isEmail()
      .withMessage('Valid email is required')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('role')
      .isIn(['volunteer', 'ngo'])
      .withMessage('Role must be volunteer or ngo')
  ],
  validateRequest,
  register
);

// ✅ Login route with validation
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validateRequest,
  login
);

module.exports = router;
