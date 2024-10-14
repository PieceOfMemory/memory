const db = require('../db');

//댓글 등록
exports.createComment = async({ postId, nickname, content, passwordHash }) => {
    const query = `
        INSERT INTO comments (postId, nickname, content, password, createdAt)
        VALUES (?, ?, ?, ?, ?)`;
    const values = [
        postId,
        nickname,
        content,
        passwordHash,
        new Date()
    ];

    const [result] = await db.query(query, values);
    return {
        id: result.insertId,
        nickname,
        content,
        createdAt: new Date().toISOString()
    };
};

//댓글 목록 조회
exports.getCommentsByPostId = async(postId, page, pageSize) => {
    const offset = (page - 1) * pageSize;

    // 댓글 목록 조회
    const query = `
        SELECT id, nickname, content, createdAt
        FROM comments
        WHERE postId = ?
        ORDER BY createdAt DESC
        LIMIT ? OFFSET ?`;

    const [comments] = await db.query(query, [postId, pageSize, offset]);

    // 전체 댓글 수 조회
    const [totalResult] = await db.query(`SELECT COUNT(*) as total FROM comments WHERE postId = ?`, [postId]);
    const totalItemCount = totalResult[0].total;

    return { comments, totalItemCount };
};


//댓글 수정
exports.getCommentById = async(commentId) => {
    const query = 'SELECT * FROM comments WHERE id = ?';
    const [result] = await db.query(query, [commentId]);
    return result.length ? result[0] : null;
};

exports.updateComment = async(commentId, nickname, content) => {
    const query = `
        UPDATE comments
        SET nickname = ?, content = ?, createdAt = ?
        WHERE id = ?`;
    const values = [nickname, content, new Date(), commentId];
    const [result] = await db.query(query, values);
    return result;
};


//댓글 삭제
exports.deleteComment = async(commentId) => {
    const query = 'DELETE FROM comments WHERE id = ?';
    const [result] = await db.query(query, [commentId]);
    return result;
};