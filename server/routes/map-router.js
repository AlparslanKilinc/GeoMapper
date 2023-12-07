const express = require('express');
const router = express.Router();
const MapController = require('../controllers/map-controller.js');


router.post('/addMap',MapController.addMap);
router.post('/updateMap', MapController.updateMap);
//router.get('/getMapById',MapController.getMapById);
//router.delete('/deleteMapById',MapController.deleteMapById);
module.exports = router;
