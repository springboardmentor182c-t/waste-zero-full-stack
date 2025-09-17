const { body } = require('express-validator');

exports.registerValidation = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email')
    .isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role')
    .isIn(['volunteer', 'ngo']).withMessage('Role must be volunteer or ngo')
];

exports.loginValidation = [
  body('email')
    .isEmail().withMessage('Valid email is required'),
  body('password')
    .notEmpty().withMessage('Password is required')
];

exports.profileUpdateValidation = [
  body('bio')
    .optional()
    .isLength({ max: 200 }).withMessage('Bio cannot exceed 200 characters'),
  body('skills')
    .optional()
    .custom((value) => {
      if (typeof value === 'string') return true; // allow comma-separated string
      if (Array.isArray(value)) return value.every(skill => typeof skill === 'string');
      throw new Error('Skills must be an array of strings or a comma-separated string');
    }),
  body('location')
    .optional()
    .isString().withMessage('Location must be a string')
];
