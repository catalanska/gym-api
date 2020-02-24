const classModel = require('../models/classModel');

exports.createClass = function createClass(req, res) {
  classModel.storeClass(req.body)
    .then((data) => res.json(data))
    .catch((error) => {
      if (error.message === 'Invalid dates') res.status(422);
      else res.status(500);
      res.json({ error: 'Class could not be created' });
    });
};
