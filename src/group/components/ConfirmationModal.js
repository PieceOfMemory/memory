import React from 'react';

const ConfirmationModal = ({ title, message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose} className="modal-confirm-button">확인</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
