import React from 'react';
import '../styles/Modal.css';

const Modal1 = ({ setIsModalOpen, setIsModal2Open, setSelectedCategory }) => {
  // モーダルを閉じる
  const handleClose = () => {
    setIsModalOpen(false);
  };

  // 2つ目のモーダルを開く（選択したカテゴリを渡す）
  const openSecondModal = (categoryName) => {
    setIsModalOpen(false);
    setIsModal2Open(true);
    setSelectedCategory(categoryName);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={handleClose}>×</button>
        <h3>物件種別をお選びください。</h3>

        <div className="category-section">
          <h4>借りる</h4>
          <button onClick={() => openSecondModal("賃貸（アパート・マンション・一戸建て）")}>賃貸（アパート・マンション・一戸建て）</button>
        </div>

        <div className="category-section">
          <h4>買う</h4>
          <button onClick={() => openSecondModal("新築マンション")}>新築マンション</button>
          <button onClick={() => openSecondModal("中古マンション")}>中古マンション</button>
          <button onClick={() => openSecondModal("新築一戸建て")}>新築一戸建て</button>
          <button onClick={() => openSecondModal("中古一戸建て")}>中古一戸建て</button>
          <button onClick={() => openSecondModal("土地")}>土地</button>
        </div>
      </div>
    </div>
  );
};

export default Modal1;
