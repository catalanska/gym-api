const fs = require('fs');
const request = require('supertest');
const server = require('../server');
const { resetDB, writeRecord } = require('../lib/dbInterface');

const fsPromises = fs.promises;

describe('POST /bookings', () => {
  beforeEach(async () => {
    await resetDB('classes');
    await resetDB('calendar');
  });

  afterAll(async () => {
    await resetDB('classes');
    await resetDB('calendar');
  });

  const validBookingParams = {
    name: 'Javier J',
    date: '2020-01-01',
  };

  it('should return 400 when request does not match Schema', async () => {
    await request(server)
      .post('/bookings')
      .send({
        name: 'Javier',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('should return 422 when booking is not available', async () => {
    await request(server)
      .post('/bookings')
      .send({
        ...validBookingParams,
        date: '2019-01-01',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);
  });

  it('should return 200 when booking has been created', async () => {
    const date = '2020-01-01';
    await writeRecord('calendar', {
      [date]: {
        date,
        bookings: [],
        classId: 'foo',
      },
    });

    await request(server)
      .post('/bookings')
      .send(validBookingParams)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('should return 500 when booking could not be created', async () => {
    const date = '2020-01-01';
    await writeRecord('calendar', {
      [date]: {
        date,
        bookings: [],
        classId: 'foo',
      },
    });
    jest.spyOn(fsPromises, 'writeFile').mockImplementationOnce(() => { throw new Error('error happened'); });

    await request(server)
      .post('/bookings')
      .send(validBookingParams)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500);
  });
});
