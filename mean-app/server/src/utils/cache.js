// const Redis = require('ioredis');
// let client;
// try {
//   client = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');
//   client.on('error', (err) => {
//     console.error('[ioredis] Redis error:', err.message);
//   });
// } catch (err) {
//   console.warn('[ioredis] Redis not initialized:', err.message);
// }

// Cache middleware
const cache = (keyBuilder, ttl = 60) => async (req, res, next) => {
  if (!client) return next(); // Redis not available

  try {
    const key = keyBuilder(req);
    const cached = await client.get(key);
    if (cached) return res.json(JSON.parse(cached));

    res.sendResponse = res.json;
    res.json = (body) => {
      try {
        client.setex(key, ttl, JSON.stringify(body));
      } catch {}
      res.sendResponse(body);
    };
  } catch {
    return next();
  }

  next();
};

module.exports = { cache };
