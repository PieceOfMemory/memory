import React, { useState } from 'react';
import './PostDelete.css'; // CSS 파일 연동

function PostDelete({ onClose, onDelete }) {
  const [password, setPassword] = useState('');

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // 삭제 확인 버튼 핸들러
  const handleDelete = (e) => {
    e.preventDefault();

    // 비밀번호 확인 및 삭제 처리 로직
    onDelete(password);

    // 모달 닫기
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>추억 삭제</h2>
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

          {/* 삭제하기 버튼 */}
          <button type="submit" className="delete-button">삭제하기</button>
        </form>
        {/* 닫기 버튼 */}
        <button className="close-button" onClick={onClose}>X</button>
      </div>
    </div>
  );
}

export default PostDelete;
