import React, { useState } from 'react';
import './MemoryEditModal.css'; // CSS 파일 연동

function MemoryEditModal({ onClose }) {
  const [nickname, setNickname] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [location, setLocation] = useState('');
  const [moment, setMoment] = useState('');
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState('');

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // 공개/비공개 토글 핸들러
  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  // 수정 완료 버튼 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 수정된 데이터 처리 로직
    // 필요에 따라 FormData 또는 JSON 등 적절한 형식 사용

    // 수정 완료 후 모달 닫기
    onClose();
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
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="태그 입력 후 Enter"
          />

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
            type="text"
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
