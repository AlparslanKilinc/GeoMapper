const express = require('express');
const router = express.Router();
const geojsonRouter = require('./geojson-router.js');

router.use('/geojson', geojsonRouter);

module.exports = router;
