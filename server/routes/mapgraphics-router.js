const express = require('express');
const router = express.Router();
const MapGraphicsController = require('../controllers/mapgraphics-controller.js');


router.get('/addChoropleth', MapGraphicsController.addChoroplethMapGraphics);


module.exports = router;
