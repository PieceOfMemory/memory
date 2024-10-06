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
  const [editError, setEditError] = useState('');

  // 그룹 정보 수정 핸들러
  const handleEditGroup = async (e) => {
    e.preventDefault();

    // FormData 객체 생성
    const formData = new FormData();
    formData.append('name', name);
    formData.append('password', password);
    formData.append('introduction', introduction);
    formData.append('isPublic', isPublic);
    if (image) formData.append('imageUrl', image);

    try {
      const response = await fetch(`/api/groups/${groupId}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // 수정 성공 시 그룹 상세 페이지로 이동
        navigate(`/group/${groupId}`);
      } else if (response.status === 403) {
        // 비밀번호 오류 처리
        setAuthError('비밀번호가 일치하지 않습니다.');
      } else {
        // 기타 오류 처리
        setEditError(data.message || '그룹 정보를 수정하는 도중 문제가 발생했습니다.');
      }
    } catch (error) {
      setEditError('네트워크 오류가 발생했습니다.');
    }
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
        {editError && <p className="error-text">{editError}</p>}

        {/* 수정하기 버튼 */}
        <button type="submit" className="edit-button">수정하기</button>
      </form>
    </div>
  );
}

export default GroupEdit;
