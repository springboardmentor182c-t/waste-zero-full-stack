const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const code = err.code || (statusCode >= 500 ? 'SERVER_ERROR' : 'ERROR');
  const message =
    process.env.NODE_ENV === 'production' && statusCode === 500
      ? 'Internal server error'
      : err.message || 'An unexpected error occurred';

  if (logger && logger.error) logger.error(err);
  else console.error(err);

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    },
  });
};
