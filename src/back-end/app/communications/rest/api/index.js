'use strict';

const express = require('express');
const router = express.Router();

router.get('/api/', function (req, res) {
  res.send('Hello World!')
})

router.use('/api/question', require('./questionRoutes'));

module.exports = router;
