const request = require('supertest');
const fs = require('fs');
const server = require('../server');
const { resetDB } = require('../lib/dbInterface');

const fsPromises = fs.promises;

describe('POST /classes', () => {
  beforeEach(async () => {
    await resetDB('classes');
    await resetDB('calendar');
  });

  afterAll(async () => {
    await resetDB('classes');
    await resetDB('calendar');
  });

  const validClassParams = {
    name: 'Yoga Class Foo',
    startDate: '2020-01-01',
    endDate: '2020-12-31',
    capacity: 15,
  };

  it('should return 400 when request does not match Schema', async () => {
    await request(server)
      .post('/classes')
      .send({
        name: 'Yoga Class Foo',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('should return 422 when validation of dates fail', async () => {
    await request(server)
      .post('/classes')
      .send({
        ...validClassParams,
        endDate: '2019-01-01',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);
  });

  it('should return 500 when class could not be created', async () => {
    jest.spyOn(fsPromises, 'writeFile').mockImplementationOnce((fileName, content, callback) => callback('error happened'));

    await request(server)
      .post('/classes')
      .send(validClassParams)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500);
  });

  it('should return 200 when class has been created', async () => {
    const response = await request(server)
      .post('/classes')
      .send(validClassParams)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      id: expect.any(String),
      ...validClassParams,
    });
  });
});
