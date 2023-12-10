const express = require('express');
const router = express.Router();
const MapController = require('../controllers/map-controller.js');

const graphicsRouter = require('./graphics-router');
router.use('/graphics', graphicsRouter);

const stylesRouter = require('./styles-router');
router.use('/styles', stylesRouter);

router.post('/', MapController.createMap);

module.exports = router;
