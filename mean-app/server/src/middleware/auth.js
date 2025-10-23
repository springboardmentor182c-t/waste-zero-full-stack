const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        code: "NO_TOKEN",
        message: "No token, authorization denied",
      },
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // support tokens that might have been signed as { user: {...} } or flat { id, role }
    if (decoded.user) req.user = decoded.user;
    else if (decoded.id) req.user = { id: decoded.id, role: decoded.role };
    else req.user = decoded;

    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({
      success: false,
      error: {
        code: "INVALID_TOKEN",
        message: "Token is not valid",
      },
    });
  }
};
