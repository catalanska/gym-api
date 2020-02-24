const express = require('express');
const { Validator, ValidationError } = require('express-json-validator-middleware');

const classesRouter = require('../routes/classes');
const classSchema = require('../public/schemas/class.json');

const bookingsRouter = require('../routes/bookings');
const bookingSchema = require('../public/schemas/booking.json');

const validator = new Validator({ allErrors: true });
const { validate } = validator;

const server = express();

server.use(express.json());
server.use('/classes', validate({ body: classSchema }), classesRouter);
server.use('/bookings', validate({ body: bookingSchema }), bookingsRouter);

server.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(400).send(err.validationErrors.body);
    next();
  } else next(err);
});

module.exports = server;
