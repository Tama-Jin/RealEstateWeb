import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Modal1.css';

const Modal1 = ({ setIsModalOpen, setIsModal2Open, setSelectedCategory }) => {
  const navigate = useNavigate();

  // 모달 닫기
  const handleClose = () => {
    setIsModalOpen(false); // setIsModalOpen을 직접 사용
  };

  // 두 번째 모달 열기 (항상 1 값을 전달)
  const openSecondModal = () => {
    console.log('✅ openSecondModal 실행됨: 1');

    setIsModalOpen(false); // 첫 번째 모달 닫기
    setIsModal2Open(true);  // 두 번째 모달 열기
    setSelectedCategory(1); // 선택된 카테고리 설정
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={handleClose}>x</button>
        <h3>物件種別をお選びください</h3>

        <div className="category-section">
          <h4>借りる</h4>
          <button onClick={openSecondModal} className="modal-button">賃貸（アパート・マンション・一戸建て）</button>
        </div>

        <div className="category-section">
          <h4>買う</h4>
          <button onClick={openSecondModal} className="modal-button">新築マンション</button>
          <button onClick={openSecondModal} className="modal-button">中古マンション</button>
          <button onClick={openSecondModal} className="modal-button">新築一戸建て</button>
          <button onClick={openSecondModal} className="modal-button">中古一戸建て</button>
          <button onClick={openSecondModal} className="modal-button">土地</button>
        </div>
      </div>
    </div>
  );
};

export default Modal1;
