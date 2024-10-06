// controllers/searchController.js
const groupModel = require('../models/groupModel');
const postModel = require('../models/postModel');

exports.search = async (req, res) => {
    try {
        const { keyword, page = 1, pageSize = 10 } = req.query;

        // 검색어가 존재하지 않으면 오류 메시지 반환
        if (!keyword || keyword.trim() === "") {
            return res.status(400).json({ message: "검색어(keyword)를 입력해주세요." });
        }

        // 그룹과 포스트에서 검색
        const [groupResults, postResults] = await Promise.all([
            groupModel.searchGroups(keyword, page, pageSize),
            postModel.searchPosts(keyword, page, pageSize)
        ]);

        res.status(200).json({
            groups: groupResults,
            posts: postResults
        });
    } catch (error) {
        console.error("Error during search:", error);
        res.status(500).json({ message: "검색 중 오류가 발생했습니다." });
    }
};
