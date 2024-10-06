import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './GroupDetail.css';

function GroupDetail() {
  const [group, setGroup] = useState(null); // 서버에서 가져온 그룹 상세 정보
  const [memories, setMemories] = useState([]); // 서버에서 가져온 추억 정보 (임시)
  const [isPublic, setIsPublic] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortType, setSortType] = useState('최신순');
  const [visibleMemories, setVisibleMemories] = useState(8);
  const navigate = useNavigate();
  const { groupId } = useParams();

  // 그룹 상세 정보 가져오기
  useEffect(() => {
    const fetchGroupDetail = async () => {
      try {
        const response = await fetch(`/api/groups/${groupId}`);
        const data = await response.json();

        if (response.ok) {
          setGroup(data); // 서버로부터 가져온 그룹 정보를 상태로 설정
        } else {
          console.error('그룹 상세정보 가져오기 실패:', data.message);
        }
      } catch (error) {
        console.error('네트워크 오류:', error);
      }
    };

    fetchGroupDetail();
  }, [groupId]);

  // 추억 올리기 버튼 클릭 핸들러
  const handleCreateMemory = () => {
    navigate('/PostCreate');
  };

  // 그룹 정보 수정하기 버튼 클릭 핸들러
  const handleEditGroup = () => {
    navigate(`/GroupEdit/${groupId}`);
  };

  // 그룹 삭제하기 버튼 클릭 핸들러
  const handleDeleteGroup = () => {
    navigate(`/GroupDelete/${groupId}`);
  };

  // 정렬에 따른 추억 목록 정렬
  const sortMemories = (type) => {
    let sortedMemories;
    switch (type) {
      case '최신순':
        sortedMemories = [...memories].sort((a, b) => new Date(b.moment) - new Date(a.moment));
        break;
      case '댓글순':
        sortedMemories = [...memories].sort((a, b) => b.comments - a.comments);
        break;
      case '공감순':
        sortedMemories = [...memories].sort((a, b) => b.likes - a.likes);
        break;
      default:
        sortedMemories = memories;
    }
    setMemories(sortedMemories);
    setSortType(type);
    setIsSortOpen(false);
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

  // 더보기 버튼 클릭 시
  const handleLoadMore = () => {
    setVisibleMemories((prev) => prev + 8);
  };

  // 추억 클릭 시 추억 상세 페이지로 이동
  const handleMemoryClick = (memoryId) => {
    navigate(`/Posts/${memoryId}`);
  };

  if (!group) return <div>Loading...</div>;

  return (
    <div className="group-detail-container">
      {/* 그룹 전체 정보 박스 */}
      <div className="group-info-box">
        <div className="group-image-container">
          <img src={group.imageUrl} alt="그룹 대표 이미지" className="group-image" />
        </div>
        <div className="group-details">
          <div className="group-header">
            <div>
              <span>{new Date(group.createdAt).toDateString()}</span> | <span>{group.isPublic ? '공개' : '비공개'}</span>
            </div>
            <div className="group-actions">
              {/* 그룹 정보 수정하기 버튼 */}
              <button className="group-action-button" onClick={handleEditGroup}>
                그룹 정보 수정하기
              </button>
              {/* 그룹 삭제하기 버튼 */}
              <button className="group-action-button" onClick={handleDeleteGroup}>
                그룹 삭제하기
              </button>
            </div>
          </div>
          
          <h1 className="group-title">{group.name}</h1>
          <div className="group-stats">
            <span>추억 {group.postCount}</span> | 
            <span> 그룹 공감 {group.likeCount}K</span>
          </div>

          <p className="group-introduction">{group.introduction}</p>

          <div className="group-badges">
            {group.badges.map((badge, index) => (
              <span key={index} className="badge-item">{badge}</span>
            ))}
          </div>

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
        {memories.slice(0, visibleMemories).map((memory) => (
          <div key={memory.id} className="memory-card" onClick={() => handleMemoryClick(memory.id)}>
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
      {memories.length > visibleMemories && (
        <div className="load-more-box">
          <button className="load-more-button" onClick={handleLoadMore}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default GroupDetail;
