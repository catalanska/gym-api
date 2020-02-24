const express = require('express');

const router = express.Router();
const classesController = require('../controllers/bookingsController');

router.post('/', classesController.createClass);

module.exports = router;
