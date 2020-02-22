const express = require('express');

const server = express();
const classesRouter = require('../routes/classes');
const bookingsRouter = require('../routes/bookings');

server.use(express.json());
server.use('/classes', classesRouter);
server.use('/bookings', bookingsRouter);

module.exports = server;
