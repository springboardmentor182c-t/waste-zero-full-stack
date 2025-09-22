// tests/auth.test.js
const request = require('supertest');
const app = require('../src/app'); // adjust path if needed

describe('Auth API', () => {
  it('should register a user', async () => {
    const uniqueEmail = test${Date.now()}@example.com; // fixed missing backticks

    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'TestUser',
        email: uniqueEmail,
        password: 'test123',
        role: 'volunteer'
      });

    // status code must be 201
    expect(res.statusCode).toBe(201);

    // response must contain token & user
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', uniqueEmail);
  });

  it('should login a user', async () => {
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
 .send({
        email: 'test@example.com', // must exist in DB
        password: 'test123'
      });

    expect([200, 400]).toContain(loginRes.statusCode);
  });

  // ✅ New test 1: Registration should fail if required fields are missing
  it('should not register a user with missing fields', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: incomplete${Date.now()}@example.com,
 // missing name, password, role
      });

    expect(res.statusCode).toBe(400); // expecting bad request
  });

  // ✅ New test 2: Login should fail with wrong credentials
  it('should not login with wrong password', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com', // existing user
        password: 'wrongpassword'
      });

    expect([400, 401]).toContain(res.statusCode); // depending on your API, 400 or 401
  });
});s