const createBookingService = require('../lib/createBookingService');

exports.createClass = function createClass(req, res) {
  createBookingService.init(req.body)
    .then((data) => res.json(data))
    .catch((error) => {
      if (error.message === 'DateCanNotBeBooked') {
        res.status(422).json({ error: 'The given date is not available for booking' });
        return;
      }

      res.status(500).json({ error: 'Booking could not be created' });
    });
};
