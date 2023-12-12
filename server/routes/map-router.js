const express = require('express');
const router = express.Router();
const MapController = require('../controllers/map-controller.js');
const auth = require('../auth');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const graphicsRouter = require('./graphics-router');
router.use('/graphics', graphicsRouter);

const stylesRouter = require('./styles-router');
router.use('/styles', stylesRouter);

router.post('/', auth.verify, upload.single('image'), MapController.createMap);

router.get('/drafts', auth.verify, MapController.getAllDrafts);
router.get('/published', auth.verify, MapController.getAllPublishedMaps);
router.get('/:mapId', MapController.getMapDataById);
router.put('/:mapId', auth.verify, upload.single('image'), MapController.updateMap);

module.exports = router;