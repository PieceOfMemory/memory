import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './publicGroupList.css'; // CSS 파일 import

function PublicGroupList() {
  const [isPublic, setIsPublic] = useState(true); // 공개/비공개 상태
  const [sortByEmpathy, setSortByEmpathy] = useState(true); // 공감순 정렬 상태
  const [groups, setGroups] = useState([]); // 그룹 리스트 상태
  const [visibleGroups, setVisibleGroups] = useState(10); // 한 번에 보여줄 그룹 수
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 더미 그룹 데이터 생성 (20개)
  const dummyGroups = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `그룹 ${index + 1}`,
    introduction: `이것은 그룹 ${index + 1}의 소개입니다.`,
    isPublic: index % 2 === 0, // 짝수면 공개, 홀수면 비공개
    dDay: `D+${Math.floor(Math.random() * 300)}`, // 랜덤 D-Day 값
    badges: Math.floor(Math.random() * 5),
    memories: Math.floor(Math.random() * 20),
    likes: (Math.random() * 1000).toFixed(1),
    imageUrl: 'https://via.placeholder.com/300', // 임시 이미지 URL
  }));

  // 필터링된 그룹 데이터
  const filteredGroups = dummyGroups.filter((group) => group.isPublic === isPublic);

  // 공개/비공개 상태가 변경될 때마다 그룹 목록을 서버에서 가져옴
  useEffect(() => {
    // 필터링된 그룹을 설정하고 visibleGroups를 초기화
    setGroups(filteredGroups);
    setVisibleGroups(8); // 필터링이 바뀔 때마다 초기화
  }, [isPublic]);

  // 공개/비공개 버튼 클릭 핸들러
  const handlePublicClick = () => setIsPublic(true);
  const handlePrivateClick = () => setIsPublic(false);

  // 정렬 토글 핸들러 (추가 구현 필요)
  const handleSortToggle = () => setSortByEmpathy(!sortByEmpathy);

  // 더보기 버튼 클릭 시 그룹을 더 보여줌
  const handleLoadMore = () => {
    setVisibleGroups((prev) => prev + 10);
  };

  // 그룹 박스 클릭 시 해당 그룹의 상세 페이지로 이동
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

        <button className="sort-toggle" onClick={handleSortToggle}>
          {sortByEmpathy ? '공감순' : '기타순'}
        </button>
      </div>

      {/* 그룹 리스트 */}
      <div className="group-list">
        {filteredGroups.slice(0, visibleGroups).map((group) => (
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

      {/* 더보기 버튼 박스 */}
      {groups.length > visibleGroups && (
        <div className="load-more-box">
          <button className="load-more-button" onClick={handleLoadMore}>더보기</button>
          </div>
)}

    </div>
  );
}

export default PublicGroupList;
