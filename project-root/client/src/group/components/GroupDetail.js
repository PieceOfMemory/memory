import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './GroupDetail.css';

// 더미 데이터 추가
const dummyGroup = {
  id: 1,
  name: '달봉이네 가족',
  introduction: '서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.',
  dDay: 'D+265',
  memoriesCount: 8,
  likesCount: 1500,
  badges: ['7일 연속 게시글 등록', '그룹 공감 1만 개 이상 받기', '추억 공감 1만 개 이상 받기'],
  imageUrl: 'https://via.placeholder.com/300',
};

function GroupDetail() {
  const [group] = useState(dummyGroup);
  const [memories, setMemories] = useState([]); // 추억 목록 상태 추가
  const [isPublic, setIsPublic] = useState(true); // 공개/비공개 필터 상태
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [isSortOpen, setIsSortOpen] = useState(false); // 정렬 토글 상태
  const [sortType, setSortType] = useState('최신순'); // 정렬 옵션 상태
  const navigate = useNavigate();
  const { groupId } = useParams(); // URL에서 groupId 가져오기

  // 추억 불러오기 API 호출 함수
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await fetch(`/api/groups/${groupId}/posts`);
        const data = await response.json();

        if (response.ok) {
          setMemories(data); // 추억 목록을 상태로 설정
        } else {
          console.error('Failed to fetch memories:', data.message);
        }
      } catch (error) {
        console.error('Error fetching memories:', error);
      }
    };

    fetchMemories();
  }, [groupId]);

  // 추억 올리기 버튼 클릭 핸들러
  const handleCreateMemory = () => {
    navigate('/PostCreate'); // PostCreate.js 경로로 이동
  };

  // 정렬에 따른 추억 목록 정렬
  const sortMemories = (type) => {
    let sortedMemories;
    switch (type) {
      case '최신순':
        sortedMemories = [...memories].sort((a, b) => new Date(b.moment) - new Date(a.moment));
        break;
      case '댓글순':
        sortedMemories = [...memories].sort((a, b) => b.comments.length - a.comments.length);
        break;
      case '공감순':
        sortedMemories = [...memories].sort((a, b) => b.likes - a.likes);
        break;
      default:
        sortedMemories = memories;
    }
    setMemories(sortedMemories);
    setSortType(type);
    setIsSortOpen(false); // 토글 닫기
  };

  // 검색어 입력 핸들러
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 검색 버튼 클릭 또는 엔터키 입력 시 실행
  const handleSearch = (e) => {
    e.preventDefault();
    const filteredMemories = memories.filter(
      (memory) => memory.isPublic === isPublic && memory.title.includes(searchTerm)
    );
    setMemories(filteredMemories);
  };

  return (
    <div className="group-detail-container">
      {/* 그룹 전체 정보 박스 */}
      <div className="group-info-box">
        {/* 그룹 이미지 */}
        <div className="group-image-container">
          <img src={group.imageUrl} alt="그룹 대표 이미지" className="group-image" />
        </div>
        {/* 그룹 정보 */}
        <div className="group-details">
          {/* 상단 정보 (d-day, 공개 여부) 및 수정, 삭제 버튼 */}
          <div className="group-header">
            <div>
              <span>{group.dDay}</span> | <span>공개</span>
            </div>
            <div className="group-actions">
              <button className="group-action-button">그룹 정보 수정하기</button>
              <button className="group-action-button">그룹 삭제하기</button>
            </div>
          </div>
          
          {/* 그룹 이름, 추억 수, 공감 수 */}
          <h1 className="group-title">{group.name}</h1>
          <div className="group-stats">
            <span>추억 {group.memoriesCount}</span> | 
            <span> 그룹 공감 {group.likesCount}K</span>
          </div>

          {/* 그룹 소개 */}
          <p className="group-introduction">{group.introduction}</p>

          {/* 그룹 획득 배지 */}
          <div className="group-badges">
            {group.badges.map((badge, index) => (
              <span key={index} className="badge-item">{badge}</span>
            ))}
          </div>

          {/* 공감 보내기 버튼 */}
          <button className="send-empathy-button">공감 보내기</button>
        </div>
      </div>

      {/* 추억 목록 헤더 */}
      <div className="memory-header-box">
        <h2 className="memory-header-title">추억 목록</h2>
        <button className="create-memory-button" onClick={handleCreateMemory}>
          추억 올리기
        </button>
      </div>

      {/* 검색 및 필터 박스 */}
      <div className="filter-box">
        <div className="toggle-container">
          <div 
            className={`toggle-button ${isPublic ? 'active' : ''}`} 
            onClick={() => setIsPublic(true)}>
            공개
          </div>
          <div 
            className={`toggle-button ${!isPublic ? 'active' : ''}`} 
            onClick={() => setIsPublic(false)}>
            비공개
          </div>
        </div>

        {/* 정렬 토글 버튼 */}
        <div className="sort-container">
          <button className="sort-toggle" onClick={() => setIsSortOpen(!isSortOpen)}>{sortType}</button>
          {isSortOpen && (
            <div className="sort-options">
              <div onClick={() => sortMemories('최신순')}>최신순</div>
              <div onClick={() => sortMemories('댓글순')}>댓글순</div>
              <div onClick={() => sortMemories('공감순')}>공감순</div>
            </div>
          )}
        </div>

        {/* 검색 기능 */}
        <form onSubmit={handleSearch} className="search-container">
          <input 
            type="text" 
            className="search-bar" 
            placeholder="추억 제목을 입력해주세요" 
            value={searchTerm} 
            onChange={handleSearchInputChange} 
          />
        </form>
      </div>

      {/* 추억 목록 */}
      <div className="memory-list">
        {memories.map((memory) => (
          <div key={memory.id} className="memory-card">
            <img src={memory.imageUrl} alt="추억 이미지" />
            <div className="memory-info">
              <div className="memory-meta">
                <span>{memory.nickname}</span> | <span>{memory.isPublic ? '공개' : '비공개'}</span>
              </div>
              <h3>{memory.title}</h3>
              <div className="memory-tags">
                {memory.tags.map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
              <div className="memory-stats">
                <span>{memory.moment}</span>
                <span>공감 {memory.likes}</span>
                <span>댓글 {memory.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 더보기 버튼 */}
      <div className="load-more-box">
        <button className="load-more-button">더보기</button>
      </div>
    </div>
  );
}

export default GroupDetail;
