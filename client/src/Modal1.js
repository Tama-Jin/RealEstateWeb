import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 임포트
import './Modal.css';

const Modal1 = ({ setIsModalOpen, setIsModal2Open }) => {
  const navigate = useNavigate();  // useNavigate 훅을 사용하여 페이지 이동

  const handleClose = () => {
    setIsModalOpen(false); // 첫 번째 모달 닫기
  };

  const openSecondModal = () => {
    setIsModalOpen(false); // 첫 번째 모달 닫기
    setIsModal2Open(true);  // 두 번째 모달 열기
  };

  // "土地" 버튼 클릭 시 새로운 페이지로 이동하는 함수
  const handleLandClick = () => {
    navigate('/land'); // '土地' 버튼 클릭 시 새로운 페이지로 이동
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={handleClose}>
          ×
        </button>
        <h3>物件種別をお選びください。</h3>

        {/* '借りる' 섹션 */}
        <div className="category-section">
          <h4>借りる</h4>
          <button onClick={openSecondModal}>賃貸（アパート・マンション・一戸建て）</button>
        </div>

        {/* '買う' 섹션 */}
        <div className="category-section">
          <h4>買う</h4>
          <button onClick={openSecondModal}>新築マンション</button>
          <button onClick={openSecondModal}>中古マンション</button>
          <button onClick={openSecondModal}>新築一戸建て</button>
          <button onClick={openSecondModal}>中古一戸建て</button>
          <button onClick={handleLandClick}>土地</button> {/* '土地' 버튼 클릭 시 페이지 이동 */}
        </div>
      </div>
    </div>
  );
};

export default Modal1;
