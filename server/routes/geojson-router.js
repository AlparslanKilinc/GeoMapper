const express = require('express');
const router = express.Router();
const GeojsonController = require('../controllers/geojson-controller.js');

// Middleware for parsing raw binary data
const rawBodyParser = express.raw({
  type: 'application/octet-stream',
  limit: '50mb'
});
router.get('/', GeojsonController.getGeojsonIdNamePairs);
router.get('/:id', GeojsonController.getGeojsonById);
router.get('/search/:query', GeojsonController.searchGeojson);
// Use the rawBodyParser middleware only for the POST route
router.post('/', rawBodyParser, GeojsonController.createGeojson);

module.exports = router;
