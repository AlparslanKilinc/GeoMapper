const express = require('express');
const router = express.Router();
const geojsonRouter = require('./geojson-router.js');
const mapRouter = require('./map-router.js');

router.use('/geojson', geojsonRouter);
router.use('/map', mapRouter);

module.exports = router;
