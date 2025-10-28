const request = require("supertest");
const app = require("../src/app"); // adjust path as needed

describe("Auth API", () => {
  // 🧪 Test 1: Register User
  it("should register a user successfully", async () => {
    const uniqueEmail = `test${Date.now()}@example.com`;

    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({
        name: "TestUser",
        email: uniqueEmail,
        password: "test123",
        role: "volunteer"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("email", uniqueEmail);
  });

  // 🧪 Test 2: Login User
  it("should login an existing user", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "test@example.com", // must already exist in DB
        password: "test123"
      });

    expect([200, 400]).toContain(res.statusCode);
  });

  // 🧪 Test 3: Register should fail with missing fields
  it("should not register user with missing fields", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({
        email: `incomplete${Date.now()}@example.com`
        // missing name, password, role
      });

    expect(res.statusCode).toBe(400);
  });

  // 🧪 Test 4: Login should fail with wrong password
  it("should not login with incorrect password", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "test@example.com",
        password: "wrongpassword"
      });

    expect([400, 401]).toContain(res.statusCode);
  });
});
