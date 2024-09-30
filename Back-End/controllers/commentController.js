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


//댓글 수정

exports.updateComment = async(req, res) => {
    try {
        const { commentId } = req.params;
        const { nickname, content, password } = req.body;

        // 필수 데이터 유효성 검증
        if (!nickname || !content || !password) {
            return res.status(400).json({ message: "닉네임, 내용, 비밀번호는 필수입니다." });
        }

        // 댓글 조회
        const comment = await commentModel.getCommentById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "존재하지 않습니다" });
        }

        // 비밀번호 검증
        const isMatch = await bcrypt.compare(password, comment.password);
        if (!isMatch) {
            return res.status(403).json({ message: "비밀번호가 틀렸습니다" });
        }

        // 댓글 수정
        await commentModel.updateComment(commentId, nickname, content);

        // 성공 응답
        res.status(200).json({
            id: commentId,
            nickname,
            content,
            createdAt: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({ message: "댓글 수정에 실패했습니다." });
    }
};


//댓글 삭제
exports.deleteComment = async(req, res) => {
    try {
        const { commentId } = req.params;
        const { password } = req.body;

        // 필수 데이터 유효성 검증
        if (!password) {
            return res.status(400).json({ message: "비밀번호는 필수입니다." });
        }

        // 댓글 조회
        const comment = await commentModel.getCommentById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "존재하지 않습니다" });
        }

        // 비밀번호 검증
        const isMatch = await bcrypt.compare(password, comment.password);
        if (!isMatch) {
            return res.status(403).json({ message: "비밀번호가 틀렸습니다" });
        }

        // 댓글 삭제
        await commentModel.deleteComment(commentId);

        // 성공 응답
        res.status(200).json({ message: "댓글이 성공적으로 삭제되었습니다" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ message: "댓글 삭제에 실패했습니다." });
    }
};