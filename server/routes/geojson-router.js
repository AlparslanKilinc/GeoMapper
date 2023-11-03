const express = require('express');
const router = express.Router();
const GeojsonController = require('../controllers/geojson-controller.js');

router.get('/', GeojsonController.getGeojsonIdNamePairs);
router.get('/:id', GeojsonController.getGeojsonById);

module.exports = router;
