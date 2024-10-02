import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const SomeComponent = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {/* 모달을 띄우는 작업 완료 버튼 */}
      <button onClick={handleShowModal}>작업 완료</button>

      {/* 모달 표시 */}
      {showModal && (
        <ConfirmationModal
          title="비밀번호 오류" // 제목 (변경 가능)
          message="비밀번호가 틀렸습니다." // 메시지 (변경 가능)
          onClose={handleCloseModal} // 닫기 함수
        />
      )}
    </div>
  );
};

export default SomeComponent;
