const express = require('express');
const router = express.Router();
const StylesController = require('../controllers/styles-controller.js');

router.post('/',StylesController.saveMapStylesData)

module.exports = router;
