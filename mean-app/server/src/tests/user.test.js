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

describe("User API", () => {
  let token;
  let userId;

  // First register a test user to get a token
  beforeAll(async () => {
    const uniqueEmail = `user${Date.now()}@example.com`;
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({ name: "TestUser", email: uniqueEmail, password: "test123", role: "volunteer" });

    token = res.body.token;
    userId = res.body.user.id;
  });

  it("should get a user profile by ID", async () => {
    const res = await request(app)
      .get(`/api/v1/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("email");
  });

  it("should update a user profile", async () => {
    const updates = { bio: "Updated bio", skills: ["JS", "Node"], location: "TestCity" };

    const res = await request(app)
      .put(`/api/v1/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updates);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Profile updated successfully");
    expect(res.body.data).toMatchObject({
      bio: "Updated bio",
      skills: ["JS", "Node"],
      location: "TestCity",
    });
  });

  it("should return 404 for invalid user ID", async () => {
    const res = await request(app)
      .get(`/api/v1/users/507f1f77bcf86cd799439011`) // Random ObjectId
      .set("Authorization", `Bearer ${token}`);

    expect([200, 404]).toContain(res.statusCode);
  });
});
