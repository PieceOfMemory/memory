import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PostDelete.css'; // CSS 파일 연동

function PostDelete({ onClose }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { postId } = useParams(); // 현재 게시글의 ID 가져오기
  const navigate = useNavigate();

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // 삭제 확인 버튼 핸들러
  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postPassword: password,
        }),
      });

      if (response.ok) {
        // 삭제 성공 시 메인 페이지로 이동
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError('삭제 요청 중 오류가 발생했습니다.');
      console.error('오류 발생:', error);
    }
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

          {/* 오류 메시지 */}
          {error && <p className="error-text">{error}</p>}

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
