const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController');

// 그룹의 배지 상태를 확인하고 부여하는 라우터
router.post('/groups/:groupId/check-badges', badgeController.checkAndAwardBadges);

module.exports = router;