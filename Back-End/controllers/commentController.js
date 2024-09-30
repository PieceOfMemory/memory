const bcrypt = require('bcryptjs');
const groupModel = require('../models/groupModel');
const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel');

exports.createComment = async(req, res) => {
    try {
        const { postId } = req.params; // 게시글 ID는 URL에서 가져옵니다
        const { nickname, content, password } = req.body;

        // 필수 데이터 유효성 검증
        if (!nickname || !content || !password) {
            return res.status(400).json({ message: "닉네임, 내용, 비밀번호는 필수입니다" });
        }

        // 비밀번호 해시 처리
        const passwordHash = await bcrypt.hash(password, 10);

        // 댓글 생성
        const newComment = await commentModel.createComment({
            postId,
            nickname,
            content,
            passwordHash
        });

        // 성공 응답
        res.status(200).json(newComment);
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ message: "댓글 등록에 실패했습니다." });
    }
};

//댓글 목록 조회

exports.getComments = async(req, res) => {
    try {
        const { postId } = req.params;
        const { page = 1, pageSize = 10 } = req.query;

        // 댓글 목록 및 전체 댓글 수 조회
        const { comments, totalItemCount } = await commentModel.getCommentsByPostId(postId, parseInt(page), parseInt(pageSize));

        // 전체 페이지 수 계산
        const totalPages = Math.ceil(totalItemCount / pageSize);

        // 응답 구성
        res.status(200).json({
            currentPage: parseInt(page),
            totalPages,
            totalItemCount,
            data: comments
        });
    } catch (error) {
        console.error("Error retrieving comments:", error);
        res.status(500).json({ message: "댓글 조회에 실패했습니다." });
    }
};