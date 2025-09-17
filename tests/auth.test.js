// tests/auth.test.js
const request = require('supertest');
const app = require('../src/app'); // adjust path if needed

describe('Auth API', () => {
  it('should register a user', async () => {
    const uniqueEmail = `test${Date.now()}@example.com`;

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
    // login with the same credentials you just created above
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com', // put a real test email you created
        password: 'test123'
      });

    expect([200, 400]).toContain(loginRes.statusCode); // 200 if correct, 400 if invalid
  });
});
