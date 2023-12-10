const express = require('express');
const router = express.Router();
const MapController = require('../controllers/map-controller.js')

const graphicsRouter = require('./graphics-router');
router.use('/graphics', graphicsRouter);

const stylesRouter = require('./styles-router')
router.use('/styles',stylesRouter)

router.post('/',MapController.createMap)

// make a router for create map and update map

router.use('/map', mapRouter);

module.exports = router;