const express = require('express');
const router = express.Router();
const MapMetaDataController = require('../controllers/mapmetadata-controller');


router.post('/addmetadata',MapMetaDataController.addMetaData);

module.exports = router;
