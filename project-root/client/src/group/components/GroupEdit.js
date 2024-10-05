import React, { useState } from 'react';
import './GroupEdit.css';
import { useNavigate, useParams } from 'react-router-dom';

function GroupEdit() {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [introduction, setIntroduction] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // 그룹 정보 수정 핸들러
  const handleEditGroup = (e) => {
    e.preventDefault();
    // 비밀번호 확인 로직 (더미 확인)
    if (password !== 'groupPassword123') {
      setAuthError('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    // 수정 로직 (이후에 실제 API 연동 시 사용)
    console.log('그룹 수정:', { name, image, introduction, isPublic });
    navigate(`/group/${groupId}`); // 그룹 상세 페이지로 이동
  };

  // 이미지 선택 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // 공개 여부 토글 핸들러
  const handleTogglePublic = () => {
    setIsPublic((prev) => !prev);
  };

  return (
    <div className="group-edit-container">
      <form className="group-edit-form" onSubmit={handleEditGroup}>
        <h2 className="edit-title">그룹 정보 수정</h2>
        
        {/* 그룹명 */}
        <label htmlFor="name">그룹명</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="그룹명을 입력하세요"
        />

        {/* 대표 이미지 */}
        <label htmlFor="image">대표 이미지</label>
        <input
          id="image"
          type="file"
          onChange={handleImageChange}
          placeholder="이미지 선택"
        />
        
        {/* 그룹 소개 */}
        <label htmlFor="introduction">그룹 소개</label>
        <textarea
          id="introduction"
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          placeholder="그룹 소개를 입력하세요"
        />

        {/* 공개 여부 토글 */}
        <div className="public-option">
          <label>그룹 공개 선택</label>
          <div className="toggle-switch" onClick={handleTogglePublic}>
            <div className={`toggle-slider ${isPublic ? 'public' : 'private'}`}></div>
          </div>
          <span>{isPublic ? '공개' : '비공개'}</span>
        </div>

        {/* 수정 권한 인증 (비밀번호 확인) */}
        <label htmlFor="password">수정 권한 인증</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="그룹 비밀번호를 입력하세요"
        />
        {authError && <p className="error-text">{authError}</p>}

        {/* 수정하기 버튼 */}
        <button type="submit" className="edit-button">수정하기</button>
      </form>
    </div>
  );
}

export default GroupEdit;
