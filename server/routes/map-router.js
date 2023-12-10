const express = require('express');
const router = express.Router();
const MapController = require('../controllers/map-controller.js');
const auth = require('../auth');

const graphicsRouter = require('./graphics-router');
router.use('/graphics', graphicsRouter);

const stylesRouter = require('./styles-router');
router.use('/styles', stylesRouter);

router.post('/', auth.verify, MapController.createMap);

module.exports = router;
