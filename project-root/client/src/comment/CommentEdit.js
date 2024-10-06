import React, { useState } from 'react';
import './CommentEdit.css'; // CSS 파일 연동

function CommentEdit({ commentId, currentNickname, currentContent, onSubmit }) {
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 입력 유효성 검사
    if (!nickname || !content || !password) {
      setErrorMessage('모든 항목을 입력해 주세요.');
      return;
    }

    // 수정할 데이터 구성
    const commentData = {
      nickname,
      content,
      password,
    };

    try {
      // API 요청
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        const updatedComment = await response.json();
        console.log('댓글 수정 성공:', updatedComment);

        // 수정된 댓글 데이터 전달
        onSubmit(updatedComment);

        // 입력 필드 초기화 및 에러 메시지 초기화
        setPassword('');
        setErrorMessage('');
      } else {
        // 오류 처리
        const errorData = await response.json();
        console.error('댓글 수정 실패:', errorData.message);
        setErrorMessage('댓글 수정에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('댓글 수정 에러:', error);
      setErrorMessage('오류가 발생했습니다. 다시 시도해 주세요.');
    }
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
