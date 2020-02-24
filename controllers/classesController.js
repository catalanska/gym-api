const createClassService = require('../lib/createClassService');

exports.createClass = function createClass(req, res) {
  createClassService.init(req.body)
    .then((data) => res.json(data))
    .catch((error) => {
      if (error.message === 'Invalid dates') {
        res.status(422).json({ error: 'The given dates are invalid' });
        return;
      }
      if (error.message === 'Unavailable dates') {
        res.status(422).json({ error: 'The provided dates are already assigned to another class' });
        return;
      }

      res.status(500).json({ error: 'Class could not be created' });
    });
};
