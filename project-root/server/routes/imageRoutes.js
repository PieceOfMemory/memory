const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const upload = require('../imageConfig');

// 이미지 업로드 경로 설정 (multipart/form-data 사용)
router.post('/image', upload.single('image'), imageController.uploadImage);

module.exports = router;