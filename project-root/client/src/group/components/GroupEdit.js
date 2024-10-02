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
          title="그룹 만들기 성공" // 제목 (변경 가능)
          message="그룹이 성공적으로 등록되었습니다." // 메시지 (변경 가능)
          onClose={handleCloseModal} // 닫기 함수
        />
      )}
    </div>
  );
};

export default SomeComponent;
