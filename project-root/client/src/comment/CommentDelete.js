import React, { useState } from 'react';
import './CommentDelete.css'; // CSS 파일 연동

function CommentDelete({ commentId, onClose, onDelete }) {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // 삭제 확인 버튼 핸들러
  const handleDelete = async (e) => {
    e.preventDefault();

    // 비밀번호 및 댓글 ID를 이용한 삭제 처리 로직
    const response = await onDelete(commentId, password);

    if (response.success) {
      // 삭제 성공 시 모달 닫기
      onClose();
    } else {
      // 비밀번호 불일치 시 에러 메시지 표시
      setErrorMessage('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>댓글 삭제</h2>
        <form onSubmit={handleDelete} className="delete-form">
          {/* 비밀번호 입력 */}
          <label htmlFor="password">삭제 권한 인증</label>
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

          {/* 삭제하기 버튼 */}
          <button type="submit" className="delete-button">삭제하기</button>
        </form>
        {/* 닫기 버튼 */}
        <button className="close-button" onClick={onClose}>X</button>
      </div>
    </div>
  );
}

export default CommentDelete;
