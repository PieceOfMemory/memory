import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PostDetail.css';

function PostDetail() {
  const { memoryId } = useParams();
  const [memory, setMemory] = useState(null);
  const [comments, setComments] = useState([]); // 댓글 상태 추가
  const navigate = useNavigate();

  // 더미 데이터
  const dummyMemory = {
    id: memoryId,
    title: '인천 앞바다에서 무려 60cm 헐치를 낚다!',
    nickname: '달봉이아들',
    moment: '2024-01-19 18:00',
    location: '인천',
    content: '인천 앞바다에서 헐치를 낚았습니다! ...', // 긴 내용
    tags: ['#인천', '#낚시'],
    imageUrl: 'https://via.placeholder.com/600',
    likes: 120,
    comments: [
      { id: 1, author: '대화형AI', content: '축하드립니다!', date: '2024-01-18 21:50' },
      { id: 2, author: '홍길동', content: '헐치 60cm라니... 저도 가봐야겠어요~', date: '2024-01-18 21:55' },
    ],
  };

  // 더미 데이터를 상태에 설정
  useEffect(() => {
    setMemory(dummyMemory);
    setComments(dummyMemory.comments);
  }, [memoryId]);

  // 추억 수정하기
  const handleEditMemory = () => {
    navigate(`/PostEdit/${memoryId}`);
  };

  // 추억 삭제하기
  const handleDeleteMemory = () => {
    navigate(`/PostDelete/${memoryId}`);
  };

  // 공감 보내기
  const handleSendEmpathy = () => {
    // 추억 공감 수 증가 로직
    setMemory((prev) => ({ ...prev, likes: prev.likes + 1 }));
  };

  // 댓글 등록하기
  const handleCreateComment = () => {
    navigate('/CommentCreate');
  };

  // 댓글 수정하기
  const handleEditComment = (commentId) => {
    navigate(`/CommentEdit/${commentId}`);
  };

  // 댓글 삭제하기
  const handleDeleteComment = (commentId) => {
    navigate(`/CommentDelete/${commentId}`);
  };

  if (!memory) return <div>Loading...</div>;

  return (
    <div className="post-detail-container">
      {/* 추억 상단 정보 */}
      <div className="memory-info-box">
        <div className="memory-header">
          <div>
            <span>{memory.nickname}</span> | <span>공개</span>
          </div>
          <div className="memory-actions">
            <button className="action-button" onClick={handleEditMemory}>추억 수정하기</button>
            <button className="action-button" onClick={handleDeleteMemory}>추억 삭제하기</button>
          </div>
        </div>
        <h1 className="memory-title">{memory.title}</h1>
        <p className="memory-tags">{memory.tags.join(', ')}</p>
        <div className="memory-stats">
          <span>작성일: {memory.moment}</span> | 
          <span> 공감 {memory.likes}</span> | 
          <span> 댓글 {comments.length}</span>
          <button className="empathy-button" onClick={handleSendEmpathy}>공감 보내기</button>
        </div>
      </div>

      {/* 추억 이미지 */}
      <div className="memory-image">
        <img src={memory.imageUrl} alt="추억 이미지" />
      </div>

      {/* 추억 내용 */}
      <div className="memory-content">
        <p>{memory.content}</p>
      </div>

      {/* 댓글 등록하기 버튼 */}
      <div className="comment-create-button">
        <button onClick={handleCreateComment}>댓글 등록하기</button>
      </div>

      {/* 댓글 목록 */}
      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <div className="comment-meta">
              <span>{comment.author}</span> | <span>{comment.date}</span>
            </div>
            <p>{comment.content}</p>
            <div className="comment-actions">
              <button onClick={() => handleEditComment(comment.id)}>댓글 수정하기</button>
              <button onClick={() => handleDeleteComment(comment.id)}>댓글 삭제하기</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostDetail;
