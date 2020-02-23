const classModel = require('../models/classModel');

exports.createClass = function createClass(req, res) {
  classModel.storeClass(req.body)
    .then((data) => res.json(data))
    .catch(() => {
      res.status(500).json({ error: 'Class could not be created' });
    });
};
