const express = require('express');
const router = express.Router();
const MapStylesController = require('../controllers/mapstyles-controller.js');


router.get('/:id', MapStylesController.getMapStylesById);
router.post('/', MapStylesController.updateMapStylesById);

module.exports = router;
