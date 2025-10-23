const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiry = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Helper to send uniform error responses
 */
const sendError = (res, status, code, message, details) =>
  res.status(status).json({
    success: false,
    error: { code, message, details },
  });

/**
 * Helper to generate JWT with unified payload
 */
const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: jwtExpiry });

/**
 * Helper to parse request body if it's a raw string
 */
const parseRequestBody = (req, res) => {
  if (typeof req.body === 'string') {
    try {
      req.body = JSON.parse(req.body);
    } catch (err) {
      sendError(res, 400, 'INVALID_JSON', 'Request body must be valid JSON');
      return false;
    }
  }
  return true;
};

/**
 * @desc Register new user
 */
exports.registerUser = async (req, res) => {
  if (!parseRequestBody(req, res)) return;

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return sendError(res, 400, 'VALIDATION_ERROR', 'Invalid parameters', errors.array());

  try {
    const { username, email, password, role, name } = req.body;

    const userPayload = {
      username,
      email,
      password,
      role,
      ...(name && name.trim().length >= 2 ? { name } : {}), // optional name
    };

    // Check email
    if (await User.findOne({ email })) {
      return sendError(res, 400, 'EMAIL_EXISTS', 'Email already registered');
    }

    // Check username if provided
    if (username && (await User.findOne({ username }))) {
      return sendError(res, 400, 'USERNAME_EXISTS', 'Username already taken');
    }

    const user = new User(userPayload);
    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          name: user.name || '',
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return sendError(res, 400, 'DUPLICATE_KEY', `${field} already exists`);
    }
    console.error(err);
    return sendError(res, 500, 'SERVER_ERROR', err.message || 'Server error');
  }
};


/**
 * @desc Login user
 */
exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', errors.array());

  try {
    const { username, email, password } = req.body;

    if (!password || (!username && !email)) {
      return sendError(res, 400, 'MISSING_FIELDS', 'Provide email/username and password');
    }

    // Find user by username OR email
    const user = await User.findOne({
      $or: [
        ...(username ? [{ username }] : []),
        ...(email ? [{ email }] : []),
      ],
    });

    if (!user) return sendError(res, 400, 'INVALID_CREDENTIALS', 'Invalid credentials');

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return sendError(res, 400, 'INVALID_CREDENTIALS', 'Invalid credentials');

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          name: user.name || '',
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (err) {
    console.error(err);
    return sendError(res, 500, 'SERVER_ERROR', err.message || 'Server error');
  }
};


/**
 * @desc Get logged-in user's profile (jwt-authenticated)
 */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return sendError(res, 404, 'NOT_FOUND', 'User not found');

    res.json({ success: true, data: user });
  } catch (err) {
    console.error(err);
    return sendError(res, 500, 'SERVER_ERROR', err.message || 'Server error');
  }
};
