import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './GroupDelete.css';

function GroupDelete() {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // 그룹 삭제 핸들러
  const handleDeleteGroup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/groups/${groupId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 삭제 성공 시 메인 페이지로 이동
        navigate('/');
      } else if (response.status === 403) {
        // 비밀번호 오류 처리
        setAuthError('비밀번호가 일치하지 않습니다.');
      } else {
        // 기타 오류 처리
        setAuthError(data.message || '그룹을 삭제하는 도중 문제가 발생했습니다.');
      }
    } catch (error) {
      setAuthError('네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <div className="group-delete-container">
      <form className="group-delete-form" onSubmit={handleDeleteGroup}>
        <h2 className="delete-title">그룹 삭제</h2>

        {/* 수정 권한 인증 (비밀번호 확인) */}
        <label htmlFor="password">삭제 권한 인증</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          required
        />
        {authError && <p className="error-text">{authError}</p>}

        {/* 삭제하기 버튼 */}
        <button type="submit" className="delete-button">삭제하기</button>
      </form>
    </div>
  );
}

export default GroupDelete;
