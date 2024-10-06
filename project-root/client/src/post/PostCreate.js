import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PostCreate.css'; // 필요한 경우 CSS 파일 생성 및 import

function PostCreate() {
  // 상태 관리
  const [nickname, setNickname] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postPassword, setPostPassword] = useState('');
  const [groupPassword, setGroupPassword] = useState('');
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState('');
  const [moment, setMoment] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const navigate = useNavigate();
  const { groupId } = useParams(); // 그룹 ID를 URL에서 가져오기

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // 공개 여부 토글 핸들러
  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  // 태그 추가 핸들러 (간단한 예시)
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

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 데이터 생성 (FormData 사용)
    const payload = {
      nickname,
      title,
      content,
      postPassword,
      groupPassword,
      isPublic,
      moment,
      location,
      imageUrl: image,
      tags,
    };

    // API 요청 (그룹에 해당하는 게시글 등록 엔드포인트)
    try {
      const response = await fetch(`/api/groups/${groupId}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // 생성 성공 시 해당 그룹 상세 페이지로 이동
        navigate(`/group/${groupId}`);
      } else {
        const errorData = await response.json();
        console.error('추억 등록 실패:', errorData.message);
      }
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  return (
    <div className="post-create-container">
      <h1 className="post-title">조각집</h1>
      <h2>추억 올리기</h2>
      <form onSubmit={handleSubmit} className="post-form">
        {/* 닉네임 */}
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력해주세요"
          required
        />

        {/* 제목 */}
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          required
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

        {/* 본문 */}
        <label htmlFor="content">본문</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="본문 내용을 입력해주세요"
          required
        />

        {/* 태그 */}
        <label htmlFor="tags">태그</label>
        <input
          type="text"
          id="tags"
          placeholder="태그를 입력하고 Enter를 누르세요"
          onKeyPress={handleTagAdd}
        />
        <div className="tags-list">
          {tags.map((tag, index) => (
            <span key={index} onClick={() => handleTagRemove(tag)}>
              {tag} &#x2715;
            </span>
          ))}
        </div>

        {/* 장소 */}
        <label htmlFor="location">장소</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="장소를 입력해주세요"
        />

        {/* 추억의 순간 */}
        <label htmlFor="moment">추억의 순간</label>
        <input
          type="date"
          id="moment"
          value={moment}
          onChange={(e) => setMoment(e.target.value)}
        />

        {/* 공개 여부 토글 */}
        <label>추억 공개 선택</label>
        <div className="toggle-switch" onClick={handleToggle}>
          <div className={`toggle-thumb ${isPublic ? 'public' : 'private'}`}></div>
          <span>{isPublic ? '공개' : '비공개'}</span>
        </div>

        {/* 비밀번호 */}
        <label htmlFor="postPassword">비밀번호</label>
        <input
          type="password"
          id="postPassword"
          value={postPassword}
          onChange={(e) => setPostPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          required
        />

        {/* 올리기 버튼 */}
        <button type="submit" className="create-button">올리기</button>
      </form>
    </div>
  );
}

export default PostCreate;
