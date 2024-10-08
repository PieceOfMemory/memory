import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GroupCreate.css'; // CSS import

function GroupCreate() {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // Image URL as string
  const [introduction, setIntroduction] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 그룹 공개 토글 핸들러
  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  // 그룹 생성 버튼 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // API 요청 데이터 생성
    const groupData = {
      name,
      introduction,
      isPublic,
      password,
      imageUrl, // Assuming imageUrl is a direct string URL
    };

    // API 요청
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupData),
      });

      if (response.ok) {
        const result = await response.json(); // 서버 응답 데이터 확인
        console.log('그룹 생성 성공:', result);
        navigate('/GroupCreateSuccess'); // 성공 페이지로 이동
      } else {
        const errorData = await response.json();
        console.error('그룹 생성 실패:', errorData.message);
      }
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  return (
    <div className="group-create-container">
      <h1 className="group-title">조각집</h1>
      <h2>그룹 만들기</h2>
      <form onSubmit={handleSubmit} className="group-form">
        {/* 그룹명 입력 */}
        <label htmlFor="name">그룹명</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="그룹명을 입력하세요"
          required
        />

        {/* 대표 이미지 입력 */}
        <label htmlFor="imageUrl">대표 이미지 URL</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="대표 이미지의 URL을 입력하세요"
          required
        />

        {/* 그룹 소개 입력 */}
        <label htmlFor="introduction">그룹 소개</label>
        <textarea
          id="introduction"
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          placeholder="그룹을 소개해주세요"
        />

        {/* 그룹 공개 선택 토글 */}
        <label>그룹 공개 선택</label>
        <div className="toggle-switch" onClick={handleToggle}>
          <div className={`toggle-thumb ${isPublic ? 'public' : 'private'}`}></div>
          <span>{isPublic ? '공개' : '비공개'}</span>
        </div>

        {/* 비밀번호 입력 */}
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          required
        />

        {/* 만들기 버튼 */}
        <button type="submit" className="create-button">만들기</button>
      </form>
    </div>
  );
}

export default GroupCreate;
