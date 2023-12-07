const express = require('express');
const router = express.Router();
const geojsonRouter = require('./geojson-router.js');
const mapRouter = require('./map-router');
const metaDataRouter = require('./mapmetadata-router')


router.use('/geojson', geojsonRouter);
router.use('/map', mapRouter)
router.use('/metadata', metaDataRouter)
module.exports = router;
