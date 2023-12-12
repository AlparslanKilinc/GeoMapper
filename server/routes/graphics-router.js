const express = require('express');
const router = express.Router();
const GraphicsController = require('../controllers/graphics-controller.js');

router.post('/',GraphicsController.saveMapGraphicsData);
router.put('/:mapGraphicsId',GraphicsController.updateMapGraphicsDataById);
router.get('/:mapGraphicsId',GraphicsController.getMapGraphicsDataById);


module.exports = router;
