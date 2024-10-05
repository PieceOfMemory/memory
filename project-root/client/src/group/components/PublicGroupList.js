import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './publicGroupList.css';

// 더미 그룹 데이터 생성 (컴포넌트 외부에서 정의)
const dummyGroups = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `그룹 ${index + 1}`,
  introduction: `이것은 그룹 ${index + 1}의 소개입니다.`,
  isPublic: index % 2 === 0, 
  dDay: Math.floor(Math.random() * 300), // 숫자로 변경하여 정렬하기 쉽게 수정
  badges: Math.floor(Math.random() * 5),
  memories: Math.floor(Math.random() * 20),
  likes: (Math.random() * 1000).toFixed(1),
  imageUrl: 'https://via.placeholder.com/300', 
}));

function PublicGroupList() {
  const [isPublic, setIsPublic] = useState(true); 
  const [groups, setGroups] = useState([]); 
  const [visibleGroups, setVisibleGroups] = useState(8); 
  const [isSortOpen, setIsSortOpen] = useState(false); // 토글 상태
  const [sortType, setSortType] = useState('최신순'); // 현재 선택된 정렬 옵션
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const navigate = useNavigate(); 

  // 공개/비공개 상태가 변경될 때마다 그룹 목록을 업데이트
  useEffect(() => {
    const filteredGroups = dummyGroups.filter((group) => group.isPublic === isPublic);
    setGroups(filteredGroups);
    setVisibleGroups(8); 
  }, [isPublic]); // 의존성 배열에는 isPublic만 추가

  // 정렬에 따른 그룹 정렬
  const sortGroups = (type) => {
    let sortedGroups;
    switch (type) {
      case '최신순':
        sortedGroups = [...groups].sort((a, b) => a.dDay - b.dDay); // d-day 순서대로 정렬
        break;
      case '게시글 많은순':
        sortedGroups = [...groups].sort((a, b) => b.memories - a.memories); // 추억 수로 정렬
        break;
      case '공감순':
        sortedGroups = [...groups].sort((a, b) => b.likes - a.likes); // 공감 수로 정렬
        break;
      case '획득 배지순':
        sortedGroups = [...groups].sort((a, b) => b.badges - a.badges); // 배지 수로 정렬
        break;
      default:
        sortedGroups = groups;
    }
    setGroups(sortedGroups);
    setSortType(type);
    setIsSortOpen(false); // 토글 닫기
  };

  const handleSortToggle = () => {
    setIsSortOpen(!isSortOpen); // 토글 열고 닫기
  };

  const handlePublicClick = () => setIsPublic(true);
  const handlePrivateClick = () => setIsPublic(false);
  const handleLoadMore = () => {
    setVisibleGroups((prev) => prev + 10);
  };

  const handleGroupClick = (groupId) => {
    navigate(`/group/${groupId}`);
  };

  // 검색어 입력 핸들러
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 검색 버튼 클릭 또는 엔터키 입력 시 실행
  const handleSearch = (e) => {
    e.preventDefault(); // 폼의 기본 동작 방지
    const filteredGroups = dummyGroups.filter(
      (group) => group.isPublic === isPublic && group.name === searchTerm
    );
    setGroups(filteredGroups);
    setVisibleGroups(filteredGroups.length);
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

        {/* 정렬 토글 버튼 */}
        <div className="sort-container">
          <button className="sort-toggle" onClick={handleSortToggle}>{sortType}</button>
          {isSortOpen && (
            <div className="sort-options">
              <div onClick={() => sortGroups('최신순')}>최신순</div>
              <div onClick={() => sortGroups('게시글 많은순')}>게시글 많은순</div>
              <div onClick={() => sortGroups('공감순')}>공감순</div>
              <div onClick={() => sortGroups('획득 배지순')}>획득 배지순</div>
            </div>
          )}
        </div>

        {/* 검색 기능 */}
        <form onSubmit={handleSearch} className="search-container">
          <input 
            type="text" 
            className="search-bar" 
            placeholder="그룹명을 입력해주세요" 
            value={searchTerm} 
            onChange={handleSearchInputChange} 
          />
          <button type="submit" className="search-button">검색</button>
        </form>
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
                <span>D+{group.dDay}</span>
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
