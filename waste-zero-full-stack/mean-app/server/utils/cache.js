const Redis = require("ioredis");
const client = new Redis(process.env.REDIS_URL);

const cache = (keyBuilder, ttl = 60) => async (req, res, next) => {
  const key = keyBuilder(req);
  const cached = await client.get(key);
  if (cached) return res.json(JSON.parse(cached));

  res.sendResponse = res.json;
  res.json = (body) => {
    client.setex(key, ttl, JSON.stringify(body));
    res.sendResponse(body);
  };

  next();
};

module.exports = { client, cache };
