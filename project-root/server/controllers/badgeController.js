const groupModel = require('../models/groupModel');
const postModel = require('../models/postModel');
const db = require('../db'); // 데이터베이스 연결

exports.checkAndAwardBadges = async(groupId) => {
    try {
        // 그룹 정보를 가져옵니다
        const group = await groupModel.getGroupById(groupId);
        if (!group) {
            throw new Error('존재하지 않는 그룹입니다.');
        }

        // 현재 그룹의 배지 상태 가져오기
        let badges = await groupModel.getGroupBadges(groupId);

        // 배지 조건 체크 및 배지 획득 처리

        // 1. 7일 연속 추억 등록 체크
        const postCounts = await groupModel.getPostCountForLast7Days(groupId);
        if (postCounts.length === 7 && !badges.includes("7일 연속 추억 등록")) {
            badges.push("7일 연속 추억 등록");
        }

        // 2. 추억 수 20개 이상 등록
        if (group.postCount >= 20 && !badges.includes("추억 수 20개 이상 등록")) {
            badges.push("추억 수 20개 이상 등록");
        }

        // 3. 그룹 생성 후 1년 달성
        const oneYearInMs = 365 * 24 * 60 * 60 * 1000; // 1년 밀리초 환산
        if (new Date() - new Date(group.createdAt) >= oneYearInMs && !badges.includes("그룹 생성 후 1년 달성")) {
            badges.push("그룹 생성 후 1년 달성");
        }

        // 4. 그룹 공감 1만 개 이상 받기
        if (group.likeCount >= 10000 && !badges.includes("그룹 공감 1만 개 이상 받기")) {
            badges.push("그룹 공감 1만 개 이상 받기");
        }

        // 5. 추억 공감 1만 개 이상 받은 추억 존재 여부 확인
        const query = 'SELECT COUNT(*) as highLikeCount FROM posts WHERE groupId = ? AND likeCount >= 10000';
        const [result] = await db.query(query, [groupId]);
        if (result[0].highLikeCount > 0 && !badges.includes("추억 공감 1만 개 이상 받기")) {
            badges.push("추억 공감 1만 개 이상 받기");
        }

        // 업데이트된 배지 정보를 저장
        await groupModel.updateGroupBadges(groupId, badges);

    } catch (error) {
        console.error("Error checking and awarding badges:", error);
    }
};