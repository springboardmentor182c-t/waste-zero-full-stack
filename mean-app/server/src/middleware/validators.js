const { body, oneOf } = require('express-validator');

exports.registerValidation = [
  // require at least one of username or name
  oneOf(
    [
      body('username')
        .exists()
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters'),
      body('name')
        .exists()
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters'),
    ],
    'Either username or name is required'
  ),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['volunteer', 'ngo', 'admin'])
    .withMessage('Role must be volunteer, ngo, or admin'),
];

exports.loginValidation = [
  body('email')
    .optional()
    .isEmail()
    .withMessage('Valid email is required'),
  body('username').optional().isString(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

exports.profileUpdateValidation = [
  body('bio')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Bio cannot exceed 200 characters'),
  body('skills')
    .optional()
    .custom((value) => {
      if (typeof value === 'string') return true; // allow comma-separated string
      if (Array.isArray(value))
        return value.every((skill) => typeof skill === 'string');
      throw new Error(
        'Skills must be an array of strings or a comma-separated string'
      );
    }),
  body('location')
    .optional()
    .isString()
    .withMessage('Location must be a string'),
];
