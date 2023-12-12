const express = require('express');
const router = express.Router();
const StylesController = require('../controllers/styles-controller.js');

router.post('/',StylesController.saveMapStylesData);
router.put('/:mapStylesId',StylesController.updateMapStylesDataById);
router.get('/:mapStylesId',StylesController.getMapStylesDataById);

module.exports = router;
