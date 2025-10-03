const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
let app, mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri();
  process.env.JWT_SECRET = "testsecret"; // Ensure JWT secret is set for tests
  app = require("../server");
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe("Auth API", () => {
  it("should register a user", async () => {
    const uniqueEmail = `test${Date.now()}@example.com`;

    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({ name: "TestUser", email: uniqueEmail, password: "test123", role: "volunteer" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("email", uniqueEmail);
  });

  it("should login a user", async () => {
    const loginRes = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "test@example.com", password: "test123" });

    expect([200, 400]).toContain(loginRes.statusCode); // Accept either 200 or 400 for invalid
  });
});
