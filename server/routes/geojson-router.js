const express = require('express');
const router = express.Router();
const auth = require('../auth');
const GeojsonController = require('../controllers/geojson-controller.js');

// Middleware for parsing raw binary data
const rawBodyParser = express.raw({
  type: 'application/octet-stream',
  limit: '50mb' // Example: increase the limit to 50MB
});
router.get('/', GeojsonController.getGeojsonIdNamePairs);
router.get('/:id', GeojsonController.getGeojsonById);
router.get('/search/:query', GeojsonController.searchGeojson);
router.delete('/:id', auth.verify, GeojsonController.deleteGeojsonById);

// Use the rawBodyParser middleware only for the POST route
router.post('/', auth.verify, rawBodyParser, GeojsonController.createGeojson);

module.exports = router;
