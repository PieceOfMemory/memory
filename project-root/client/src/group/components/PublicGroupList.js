import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './publicGroupList.css';

function PublicGroupList() {
  const [isPublic, setIsPublic] = useState(true);
  const [groups, setGroups] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortType, setSortType] = useState('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // 그룹 목록을 가져오는 함수
  const fetchGroups = async (newPage = 1, isLoadMore = false) => {
    try {
      // 백엔드 서버 URL 설정
      const url = `http://localhost:3000/api/groups?page=${newPage}&pageSize=${pageSize}&sortBy=${sortType}&isPublic=${isPublic}&keyword=${searchTerm}`;
      console.log('Fetching groups with URL:', url);

      const response = await fetch(url);

      if (!response.ok) {
        // 네트워크 응답이 오류일 때
        console.error('Response status:', response.status);
        throw new Error('네트워크 응답에 문제가 있습니다.');
      }

      // 응답이 JSON인지 확인
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Fetched data:', data);

        // 데이터 추가 및 업데이트
        setGroups((prevGroups) => (isLoadMore ? [...prevGroups, ...data.data] : data.data));
        setTotalPages(data.totalPages);
        setPage(newPage);
      } else {
        // 응답이 JSON이 아닌 경우
        console.error('Invalid JSON response:', await response.text());
        throw new Error('올바른 JSON 형식이 아닙니다.');
      }
    } catch (error) {
      console.error('데이터를 가져오는 도중 문제가 발생했습니다:', error);
    }
  };

  // 공개/비공개 상태가 변경되거나 검색어가 변경될 때마다 그룹 목록 업데이트
  useEffect(() => {
    fetchGroups(1);
  }, [isPublic, sortType, searchTerm]);

  // 정렬 옵션 변경 시
  const handleSortChange = (type) => {
    setSortType(type);
    setIsSortOpen(false); // 정렬 토글 닫기
  };

  const handleSortToggle = () => {
    setIsSortOpen(!isSortOpen); // 정렬 토글 열고 닫기
  };

  const handlePublicClick = () => setIsPublic(true);
  const handlePrivateClick = () => setIsPublic(false);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    if (nextPage <= totalPages) {
      fetchGroups(nextPage, true); // "더보기" 클릭 시 페이지 추가 로드
    }
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
    e.preventDefault();
    fetchGroups(1);
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
          <button className="sort-toggle" onClick={handleSortToggle}>
            {sortType === 'latest' ? '최신순' : sortType === 'mostPosted' ? '게시글 많은순' : sortType === 'mostLiked' ? '공감순' : '획득 배지순'}
          </button>
          {isSortOpen && (
            <div className="sort-options">
              <div onClick={() => handleSortChange('latest')}>최신순</div>
              <div onClick={() => handleSortChange('mostPosted')}>게시글 많은순</div>
              <div onClick={() => handleSortChange('mostLiked')}>공감순</div>
              <div onClick={() => handleSortChange('mostBadge')}>획득 배지순</div>
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
        {groups.map((group) => (
          <div key={group.id} className="group-card" onClick={() => handleGroupClick(group.id)}>
            <div className="group-image-container">
              <img src={group.imageUrl} alt={`${group.name} 이미지`} className="group-image" />
            </div>
            <div className="group-details">
              <div className="group-meta">
                <span>생성일: {new Date(group.createdAt).toLocaleDateString()}</span>
                <span>{group.isPublic ? '공개' : '비공개'}</span>
              </div>
              <h4 className="group-name">{group.name}</h4>
              <p className="group-description">{group.introduction}</p>
              <div className="group-stats">
                <span>획득 배지 {group.badgeCount}</span>
                <span>게시글 {group.postCount}</span>
                <span>공감 {group.likeCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 더보기 버튼 */}
      {page < totalPages && (
        <div className="load-more-box">
          <button className="load-more-button" onClick={handleLoadMore}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default PublicGroupList;
