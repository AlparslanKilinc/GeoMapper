const express = require('express');
const router = express.Router();
const auth = require('../auth');
const StylesController = require('../controllers/styles-controller.js');

router.post('/', auth.verify, StylesController.saveMapStylesData);
router.put('/:mapStylesId',auth.verify, StylesController.updateMapStylesDataById);
router.get('/:mapStylesId',auth.verify, StylesController.getMapStylesDataById);
router.post('/deleteStyles', StylesController.deleteMapStylesById)

module.exports = router;
