import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './publicGroupList.css'; 

// 더미 그룹 데이터 생성 (컴포넌트 외부에서 정의)
const dummyGroups = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `그룹 ${index + 1}`,
  introduction: `이것은 그룹 ${index + 1}의 소개입니다.`,
  isPublic: index % 2 === 0, 
  dDay: `D+${Math.floor(Math.random() * 300)}`, 
  badges: Math.floor(Math.random() * 5),
  memories: Math.floor(Math.random() * 20),
  likes: (Math.random() * 1000).toFixed(1),
  imageUrl: 'https://via.placeholder.com/300', 
}));

function PublicGroupList() {
  const [isPublic, setIsPublic] = useState(true); 
  const [groups, setGroups] = useState([]); 
  const [visibleGroups, setVisibleGroups] = useState(8); 
  const navigate = useNavigate(); 

  // 공개/비공개 상태가 변경될 때마다 그룹 목록을 업데이트
  useEffect(() => {
    const filteredGroups = dummyGroups.filter((group) => group.isPublic === isPublic);
    setGroups(filteredGroups);
    setVisibleGroups(8); 
  }, [isPublic]); // 의존성 배열에는 isPublic만 추가

  const handlePublicClick = () => setIsPublic(true);
  const handlePrivateClick = () => setIsPublic(false);
  const handleLoadMore = () => {
    setVisibleGroups((prev) => prev + 10);
  };

  const handleGroupClick = (groupId) => {
    navigate(`/group/${groupId}`);
  };

  return (
    <div className="page-container">
      {/* 상단 헤더 */}
      <div className="header-container">
        <h1 className="group-title">조각집</h1>
        <div className="group-create-container1">
          <Link to="/GroupCreate" className="create-group-button">그룹 만들기</Link>
        </div>
      </div>

      {/* 검색 및 필터 박스 */}
      <div className="filter-box">
        <div className="toggle-container">
          <div 
            className={`toggle-button ${isPublic ? 'active' : ''}`} 
            onClick={handlePublicClick}>
            공개
          </div>
          <div 
            className={`toggle-button ${!isPublic ? 'active' : ''}`} 
            onClick={handlePrivateClick}>
            비공개
          </div>
        </div>
        <button className="search-button">검색</button>
        <input type="text" className="search-bar" placeholder="그룹명을 입력해주세요" />
      </div>

      {/* 그룹 리스트 */}
      <div className="group-list">
        {groups.slice(0, visibleGroups).map((group) => (
          <div key={group.id} className="group-card" onClick={() => handleGroupClick(group.id)}>
            <div className="group-image-container">
              <img src={group.imageUrl} alt={`${group.name} 이미지`} className="group-image" />
            </div>
            <div className="group-details">
              <div className="group-meta">
                <span>{group.dDay}</span>
                <span>{group.isPublic ? '공개' : '비공개'}</span>
              </div>
              <h4 className="group-name">{group.name}</h4>
              <p className="group-description">{group.introduction}</p>
              <div className="group-stats">
                <span>획득 배지 {group.badges}</span>
                <span>추억 {group.memories}</span>
                <span>그룹 공감 {group.likes}K</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 더보기 버튼 */}
      {groups.length > visibleGroups && (
        <div className="load-more-box">
          <button className="load-more-button" onClick={handleLoadMore}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default PublicGroupList;
