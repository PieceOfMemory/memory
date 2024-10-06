// routes/searchRoutes.js
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// 그룹과 포스트 검색 엔드포인트
router.get('/search', searchController.search);

module.exports = router;
