import React, { useState } from 'react';
import './CommentEdit.css'; // CSS 파일 연동

function CommentEdit({ currentNickname, currentContent, onSubmit }) {
  const [nickname, setNickname] = useState(currentNickname);
  const [content, setContent] = useState(currentContent);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 입력 필드 핸들러
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // 댓글 수정 버튼 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 입력 유효성 검사
    if (!nickname || !content || !password) {
      setErrorMessage('모든 항목을 입력해 주세요.');
      return;
    }

    // 댓글 수정 처리
    onSubmit({ nickname, content, password });

    // 입력 필드 초기화 및 에러 메시지 초기화
    setPassword('');
    setErrorMessage('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>댓글 수정</h2>
        <form onSubmit={handleSubmit} className="edit-form">
          {/* 닉네임 입력 */}
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={handleNicknameChange}
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

          {/* 수정하기 버튼 */}
          <button type="submit" className="submit-button">수정하기</button>
        </form>
      </div>
    </div>
  );
}

export default CommentEdit;
