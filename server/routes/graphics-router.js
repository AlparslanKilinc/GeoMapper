const express = require('express');
const router = express.Router();
const auth = require('../auth');
const GraphicsController = require('../controllers/graphics-controller.js');

router.post('/', auth.verify, GraphicsController.saveMapGraphicsData);
router.put('/:mapGraphicsId', auth.verify, GraphicsController.updateMapGraphicsDataById);
router.get('/:mapGraphicsId',auth.verify, GraphicsController.getMapGraphicsDataById);


module.exports = router;
