import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 가져옵니다.
import ConfirmationModal from './ConfirmationModal';

const SomeComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

  // 컴포넌트가 렌더링될 때 모달을 자동으로 띄우기 위해 useEffect 사용
  useEffect(() => {
    setShowModal(true); // 컴포넌트가 마운트되면 모달을 띄운다
  }, []);

  const handleConfirm = () => {
    setShowModal(false); // 모달을 닫고
    navigate('/'); // PublicGroupList 페이지로 이동
  };

  return (
    <div>
      {/* 모달 표시 */}
      {showModal && (
        <ConfirmationModal
          title="그룹 만들기 성공" // 제목 (변경 가능)
          message="그룹이 성공적으로 생성되었습니다." // 메시지 (변경 가능)
          onConfirm={handleConfirm} // 확인 버튼을 누르면 페이지 이동
        />
      )}
    </div>
  );
};

export default SomeComponent;
