const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment-controller');


router.post('/addComment', CommentController.addComment);
router.get('/:mapId', CommentController.getMapComments)

module.exports = router;
