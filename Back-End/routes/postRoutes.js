const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// 게시글 등록
router.post('/groups/:groupId/posts', postController.createPostInGroup);

//게시글 조회
router.get('/groups/:groupId/posts', postController.getPostsInGroup);

//게시글 수정
router.put('/posts/:postId', postController.updatePost);

//게시글 삭제
router.delete('/posts/:postId', postController.deletePost);

//게시글 상세 조회
router.get('/posts/:postId', postController.getPostDetails);

//게시글 조회 권한 확인
router.post('/posts/:postId/verify-password', postController.verifyPostPassword)

//게시글 공감하기
router.post('/posts/:postId/like', postController.likePost);

//게시글 공개 여부 확인
router.get('/posts/:postId/is-public', postController.getPostPublicStatus);

module.exports = router;