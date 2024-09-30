const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

//댓글 등록
router.post('/posts/:postId/comments', commentController.createComment);

//댓글 목록 조회
router.get('/posts/:postId/comments', commentController.getComments);

module.exports = router;