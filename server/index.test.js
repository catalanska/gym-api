const request = require('supertest');
const server = require('./index');

describe('Endpoints', () => {
  it('should return 404 when endpoint does not exist', async () => {
    const res = await request(server).get('/customers');
    expect(res.statusCode).toEqual(404);
  });
});
