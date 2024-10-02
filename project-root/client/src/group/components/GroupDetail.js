import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './GroupDetail.css';

function GroupDetail() {
  const { groupId } = useParams(); // URL에서 groupId 가져오기
  const [group, setGroup] = useState(null); // 그룹 상세 정보 상태
  const [password, setPassword] = useState(''); // 비밀번호 입력 상태
  const [showPasswordModal, setShowPasswordModal] = useState(false); // 비밀번호 모달 표시 여부
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 그룹 정보 가져오기
  const fetchGroupDetails = async () => {
    try {
      const response = await fetch(`/api/group/${groupId}`); // 그룹 정보 가져오는 API
      const data = await response.json();
      setGroup(data); // 받아온 그룹 정보 설정
    } catch (error) {
      console.error('그룹 정보 가져오기 오류:', error);
    }
  };

  useEffect(() => {
    fetchGroupDetails();
  }, [groupId]);

  // 그룹 수정 페이지로 이동
  const handleEditGroup = () => {
    navigate(`/group/edit/${groupId}`);
  };

  // 비밀번호 입력 모달 열기
  const handleDeleteGroup = () => {
    setShowPasswordModal(true);
  };

  // 비밀번호 검증 후 삭제 또는 오류 페이지로 이동
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`/api/group/${groupId}/validate-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.isValid) {
          navigate(`/group/delete/${groupId}`); // 비밀번호가 맞으면 삭제 페이지로 이동
        } else {
          navigate('/wrong-password'); // 비밀번호가 틀리면 오류 페이지로 이동
        }
      }
    } catch (error) {
      console.error('비밀번호 검증 오류:', error);
    }
  };

  if (!group) return <div>Loading...</div>; // 로딩 상태 표시

  return (
    <div className="group-detail-container">
      {/* 그룹 정보 표시 */}
      <div className="group-info">
        <img src={group.imageUrl} alt="그룹 대표 이미지" />
        <h1>{group.name}</h1>
        <p>{group.introduction}</p>
        {/* 수정 및 삭제 버튼 */}
        <button onClick={handleEditGroup}>그룹 정보 수정하기</button>
        <button onClick={handleDeleteGroup}>그룹 삭제하기</button>
      </div>

      {/* 비밀번호 입력 모달 */}
      {showPasswordModal && (
        <div className="password-modal">
          <h2>그룹 삭제</h2>
          <label>삭제 관련 인증</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleConfirmDelete}>삭제하기</button>
        </div>
      )}
    </div>
  );
}

export default GroupDetail;
