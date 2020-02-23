const express = require('express');

const router = express.Router();
const classesController = require('../controllers/classesController');

router.post('/', classesController.createClass);

module.exports = router;
