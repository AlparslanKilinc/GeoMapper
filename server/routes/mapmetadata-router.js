const express = require('express');
const router = express.Router();
const MapMetaDataController = require('../controllers/mapmetadata-controller');


router.post('/addmetadata',MapMetaDataController.addMetaData);
router.get('/:id', MapMetaDataController.getDraftedMetaData)

module.exports = router;
