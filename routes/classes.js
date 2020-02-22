const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.send('Create class endpoint to be implemented');
});

module.exports = router;
