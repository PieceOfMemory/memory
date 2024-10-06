import React, { useState } from 'react';
import './CommentDelete.css'; // CSS 파일 연동

function CommentDelete({ commentId, onClose, onDeleteSuccess }) {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // 삭제 확인 버튼 핸들러
  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      // 서버에 DELETE 요청
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('댓글 삭제 성공:', result.message);

        // 삭제 성공 시 부모 컴포넌트로 성공 상태 전달
        onDeleteSuccess();
        onClose();
      } else {
        // 오류 처리
        const errorData = await response.json();
        console.error('댓글 삭제 실패:', errorData.message);
        setErrorMessage('댓글 삭제에 실패했습니다. 비밀번호를 확인해 주세요.');
      }
    } catch (error) {
      console.error('댓글 삭제 에러:', error);
      setErrorMessage('오류가 발생했습니다. 다시 시도해 주세요.');
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
