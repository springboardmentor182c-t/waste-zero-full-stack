const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../swagger/swagger.json');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const logger = require('./utils/logger'); // use logger from utils

dotenv.config();

// Connect to DB
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Security middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Sanitize body and params only (skip req.query)
app.use((req, res, next) => {
  if (req.body) req.body = mongoSanitize.sanitize(req.body);
  if (req.params) req.params = mongoSanitize.sanitize(req.params);
  next();
});

// Cache-Control for GET
app.use((req, res, next) => {
  if (req.method === 'GET') {
    res.set('Cache-Control', 'public, max-age=60');
  }
  next();
});

// Rate limiting for auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    error: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});

// Health Check endpoint
app.get('/api/v1/health', (req, res) => {
  logger.info('Health check accessed');
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

// Routes
app.use('/api/v1/auth', authLimiter, require('./routes/auth'));
app.use('/api/v1/users', require('./routes/users'));

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

module.exports = app;
