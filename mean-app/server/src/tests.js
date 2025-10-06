const request = require('supertest');
const app = require('../server'); // Express app

describe('POST /api/opportunities', () => {
  it('should create new opportunity when data is valid', async () => {
    const res = await request(app)
      .post('/api/opportunities')
      .send({
        title: 'Tree Plantation',
        description: 'Plant trees in community area',
        duration: '2 days',
        location: 'Bangalore'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Tree Plantation');
  });

  it('should return 400 if required fields missing', async () => {
    const res = await request(app).post('/api/opportunities').send({});
    expect(res.statusCode).toBe(400);
  });
});
describe('DELETE /api/opportunities/:id', () => {
  it('should delete opportunity if NGO is owner', async () => {
    const res = await request(app)
      .delete('/api/opportunities/1')
      .set('Authorization', 'Bearer valid_token');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Opportunity deleted successfully');
  });

  it('should return 403 if user unauthorized', async () => {
    const res = await request(app)
      .delete('/api/opportunities/2')
      .set('Authorization', 'Bearer invalid_token');
    expect(res.statusCode).toBe(403);
  });
});

