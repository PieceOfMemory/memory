import React, { useState } from 'react';
import './GroupDetail.css';

// 더미 데이터
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
  const [group, setGroup] = useState(dummyGroup);

  return (
    <div className="group-detail-container">
      {/* 그룹 정보 */}
      <div className="group-info">
        <div className="group-image">
          <img src={group.imageUrl} alt="그룹 대표 이미지" />
        </div>
        <div className="group-details">
          <div className="group-header">
            <span>{group.dDay}</span>
            <span>공개</span>
          </div>
          <h1>{group.name}</h1>
          <div className="group-stats">
            <span>추억 {group.memoriesCount}</span> | 
            <span>그룹 공감 {group.likesCount}K</span>
          </div>
          <p>{group.introduction}</p>
          <div className="group-badges">
            {group.badges.map((badge, index) => (
              <span key={index} className="badge-item">{badge}</span>
            ))}
          </div>
          <div className="group-actions">
            <button>그룹 정보 수정하기</button>
            <button>그룹 삭제하기</button>
          </div>
          <div className="send-empathy">
            <button>공감 보내기</button>
          </div>
        </div>
      </div>

      {/* 추억 목록 */}
      <MemoryList />
    </div>
  );
}

const MemoryList = () => {
  // 추억 더미 데이터
  const dummyMemories = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    groupName: '달봉이아들',
    title: '에델바이스 꽃말이 소중한 추억이래요',
    isPublic: true,
    tags: ['#인천', '#낚시'],
    date: '2024.01.19 18:00',
    likes: 120,
    comments: 8,
    imageUrl: 'https://via.placeholder.com/300',
  }));

  return (
    <div className="memory-list-container">
      <h2>추억 목록</h2>
      <div className="memory-list">
        {dummyMemories.map((memory) => (
          <div key={memory.id} className="memory-card">
            <img src={memory.imageUrl} alt="추억 이미지" />
            <div className="memory-info">
              <div className="memory-meta">
                <span>{memory.groupName}</span> | <span>{memory.isPublic ? '공개' : '비공개'}</span>
              </div>
              <h3>{memory.title}</h3>
              <div className="memory-tags">
                {memory.tags.map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
              <div className="memory-stats">
                <span>{memory.date}</span>
                <span>공감 {memory.likes}</span>
                <span>댓글 {memory.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="load-more">더보기</button>
    </div>
  );
};

export default GroupDetail;
