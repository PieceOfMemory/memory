import React, { useState } from 'react';
import './CommentCreate.css'; // CSS 파일 연동

function CommentCreate({ onSubmit }) {
  const [commentId, setCommentId] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 입력 필드 핸들러
  const handleCommentIdChange = (e) => {
    setCommentId(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // 댓글 등록 버튼 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 입력 유효성 검사
    if (!commentId || !content || !password) {
      setErrorMessage('모든 항목을 입력해 주세요.');
      return;
    }

    // 댓글 등록 처리
    onSubmit({ commentId, content, password });

    // 입력 필드 초기화 및 에러 메시지 초기화
    setCommentId('');
    setContent('');
    setPassword('');
    setErrorMessage('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>댓글 등록</h2>
        <form onSubmit={handleSubmit} className="create-form">
          {/* 닉네임 입력 */}
          <label htmlFor="commentId">닉네임</label>
          <input
            type="text"
            id="commentId"
            value={commentId}
            onChange={handleCommentIdChange}
            placeholder="닉네임을 입력해 주세요"
            required
          />

          {/* 댓글 내용 입력 */}
          <label htmlFor="content">댓글</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            placeholder="댓글을 입력해 주세요"
            required
          />

          {/* 비밀번호 입력 */}
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력해 주세요"
            required
          />

          {/* 에러 메시지 */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* 등록하기 버튼 */}
          <button type="submit" className="submit-button">등록하기</button>
        </form>
      </div>
    </div>
  );
}

export default CommentCreate;
