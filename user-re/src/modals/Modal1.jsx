import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Modal.css';

const Modal1 = ({ setIsModalOpen = () => {}, setIsModal2Open = () => {}, setSelectedCategory = () => {} }) => {
  const navigate = useNavigate();

  // 모달 닫기
  const handleClose = () => {
    setIsModalOpen(false);
  };

  // 두 번째 모달 열기 (항상 1 값을 전달)
  const openSecondModal = () => {
    console.log('✅ openSecondModal 실행됨: 1');

    setIsModalOpen(false);
    setIsModal2Open(true);
    setSelectedCategory(1);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={handleClose}>×</button>
        <h3>物件種別をお選びください。</h3>

        <div className="category-section">
          <h4>借りる</h4>
          <button onClick={openSecondModal}>賃貸（アパート・マンション・一戸建て）</button>
        </div>

        <div className="category-section">
          <h4>買う</h4>
          <button onClick={openSecondModal}>新築マンション</button>
          <button onClick={openSecondModal}>中古マンション</button>
          <button onClick={openSecondModal}>新築一戸建て</button>
          <button onClick={openSecondModal}>中古一戸建て</button>
          <button onClick={openSecondModal}>土地</button>
        </div>
      </div>
    </div>
  );
};

export default Modal1;
