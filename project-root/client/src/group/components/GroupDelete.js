import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './GroupDelete.css';

function GroupDelete() {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // 그룹 삭제 핸들러
  const handleDeleteGroup = (e) => {
    e.preventDefault();
    
    // 그룹 비밀번호 확인 로직 (더미 확인)
    if (password !== 'groupPassword123') { // 실제로는 생성 시 저장된 그룹 비밀번호를 확인해야 함
      setAuthError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 삭제 로직 (이후에 실제 API 연동 시 사용)
    console.log('그룹 삭제:', groupId);
    navigate('/'); // 삭제 완료 후 메인 페이지로 이동
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
        />
        {authError && <p className="error-text">{authError}</p>}

        {/* 삭제하기 버튼 */}
        <button type="submit" className="delete-button">삭제하기</button>
      </form>
    </div>
  );
}

export default GroupDelete;
