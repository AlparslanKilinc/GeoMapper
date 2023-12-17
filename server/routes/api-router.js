const express = require('express');
const router = express.Router();
const geojsonRouter = require('./geojson-router.js');
const mapRouter = require('./map-router.js');
const commentRouter = require('./comment-router.js')

router.use('/geojson', geojsonRouter);
router.use('/map', mapRouter);
router.use('/comment', commentRouter)

module.exports = router;
