import React from 'react';
import './ConfirmationModal.css'; // 필요 시 스타일링

const ConfirmationModal = ({ title, message, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onConfirm} className="confirm-button">확인</button> {/* 확인 버튼을 누르면 이동 */}
      </div>
    </div>
  );
};

export default ConfirmationModal;
