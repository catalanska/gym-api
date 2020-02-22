const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.send('Create booking endpoint to be implemented');
});

module.exports = router;
