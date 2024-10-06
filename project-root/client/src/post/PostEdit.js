import React, { useState } from 'react';
import './PostEdit.css'; // CSS 파일 연동
import { useNavigate, useParams } from 'react-router-dom';

function MemoryEditModal({ onClose }) {
  const navigate = useNavigate();
  const { postId } = useParams();

  const [nickname, setNickname] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState('');
  const [moment, setMoment] = useState('');
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // 공개/비공개 토글 핸들러
  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  // 태그 추가 핸들러 (엔터키로 태그 추가)
  const handleTagAdd = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      setTags([...tags, e.target.value]);
      e.target.value = '';
    }
  };

  // 태그 삭제 핸들러
  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // 수정 완료 버튼 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 데이터 생성
    const updatedPost = {
      nickname,
      title,
      content,
      postPassword: password,
      imageUrl: image, // 서버에 이미지 URL만 저장하는 경우를 가정합니다.
      tags,
      location,
      moment,
      isPublic,
    };

    // API 요청 (PUT 메소드)
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        // 수정 성공 시, 상세 페이지로 이동
        navigate(`/posts/${postId}`);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError('수정 요청 중 오류가 발생했습니다.');
      console.error('오류 발생:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>추억 수정</h2>
        <form onSubmit={handleSubmit} className="memory-edit-form">
          {/* 닉네임 입력 */}
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해 주세요"
          />

          {/* 제목 입력 */}
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
          />

          {/* 이미지 업로드 */}
          <label htmlFor="image">이미지</label>
          <div className="image-input-container">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* 본문 내용 입력 */}
          <label htmlFor="content">본문</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="본문 내용을 입력해 주세요"
          />

          {/* 태그 입력 */}
          <label htmlFor="tags">태그</label>
          <input
            type="text"
            id="tags"
            placeholder="태그 입력 후 Enter"
            onKeyPress={handleTagAdd}
          />
          <div className="tags-list">
            {tags.map((tag, index) => (
              <span key={index} onClick={() => handleTagRemove(tag)}>
                {tag} &#x2715;
              </span>
            ))}
          </div>

          {/* 장소 입력 */}
          <label htmlFor="location">장소</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="장소를 입력해 주세요"
          />

          {/* 추억의 순간 입력 */}
          <label htmlFor="moment">추억의 순간</label>
          <input
            type="date"
            id="moment"
            value={moment}
            onChange={(e) => setMoment(e.target.value)}
            placeholder="추억의 순간을 입력해 주세요"
          />

          {/* 공개/비공개 선택 토글 */}
          <label>추억 공개 선택</label>
          <div className="toggle-switch" onClick={handleToggle}>
            <div className={`toggle-thumb ${isPublic ? 'public' : 'private'}`}></div>
            <span>{isPublic ? '공개' : '비공개'}</span>
          </div>

          {/* 수정 권한 인증 비밀번호 입력 */}
          <label htmlFor="password">수정 권한 인증</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해 주세요"
          />

          {/* 오류 메시지 */}
          {error && <p className="error-text">{error}</p>}

          {/* 수정하기 버튼 */}
          <button type="submit" className="edit-button">수정하기</button>
        </form>
        {/* 닫기 버튼 */}
        <button className="close-button" onClick={onClose}>X</button>
      </div>
    </div>
  );
}

export default MemoryEditModal;
