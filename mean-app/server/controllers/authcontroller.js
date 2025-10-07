const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiry = process.env.JWT_EXPIRES_IN || '7d';

const sendError = (res, status, code, message, details) =>
  res.status(status).json({ success: false, error: { code, message, details } });

const generateToken = (user) => {
  // Use unified payload structure
  return jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: jwtExpiry });
};

/**
 * @desc Register new user
 * Validates input, checks for duplicate, creates user, returns JWT
 */
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return sendError(res, 400, 'VALIDATION_ERROR', "Invalid parameters", errors.array());

  try {
    const { username, email, password, role, name } = req.body;
    // Support both username (AUTH API) and name (PROFILE API)
    const userPayload = username
      ? { username, email, password, role }
      : { name, email, password, role };

    let user = await User.findOne({ email });
    if (user) return sendError(res, 400, 'EMAIL_EXISTS', 'Email already registered');

    if (username && (await User.findOne({ username })))
      return sendError(res, 400, 'USERNAME_EXISTS', 'Username already taken');

    user = new User(userPayload);
    await user.save();

    const token = generateToken(user);

    // Return unified response
    res.status(201).json({
      success: true,
      data: {
        token,
        user: { id: user.id, username: user.username, name: user.name, email: user.email, role: user.role }
      }
    });
  } catch (err) {
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
    const { email, username, password } = req.body;

    // Support login by username (AUTH API) or just email (PROFILE API)
    const user =
      username
        ? await User.findOne({ $or: [{ email }, { username }] })
        : await User.findOne({ email });

    if (!user) return sendError(res, 400, 'INVALID_CREDENTIALS', 'Invalid credentials');

    // Use schema method for password (PROFILE API)
    const isMatch = user.matchPassword
      ? await user.matchPassword(password)
      : await bcrypt.compare(password, user.password);

    if (!isMatch) return sendError(res, 400, 'INVALID_CREDENTIALS', 'Invalid credentials');

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      data: {
        token,
        user: { id: user.id, username: user.username, name: user.name, email: user.email, role: user.role }
      }
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
    if (!user)
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'User not found' } });
    res.json({ success: true, data: user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: err.message || 'Server error' }
    });
  }
};
