const request = require('supertest');
const server = require('./index');

describe('Endpoints', () => {
  it('should return 404 when endpoint does not exist', async () => {
    const res = await request(server).get('/customers');
    expect(res.statusCode).toEqual(404);
  });

  it('should not return 404 for existing POST /classes endpoint', async () => {
    const res = await request(server).post('/classes');
    expect(res.statusCode).not.toEqual(404);
  });

  it('should not return 404 for existing POST /bookings endpoint', async () => {
    const res = await request(server).post('/bookings');
    expect(res.statusCode).not.toEqual(404);
  });
});
