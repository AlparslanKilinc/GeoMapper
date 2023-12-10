const express = require('express');
const router = express.Router();
const GraphicsController = require('../controllers/graphics-controller.js');

router.post('/',GraphicsController.saveMapGraphicsData)


module.exports = router;
