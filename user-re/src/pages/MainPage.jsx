import React, { useState } from "react";
import Modal1 from "../modals/Modal1";
import Modal2 from "../modals/Modal2"; // Modal2 임포트 추가
import "../styles/MainPage.css";

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false); // 모달2 상태 추가
  const [selectedCategory, setSelectedCategory] = useState(""); // 선택한 카테고리 저장

  const menuItems = [
    { id: 1, name: "住所から" },
    { id: 2, name: "駅・路線から" },
    { id: 3, name: "通勤・通学時間から" },
    { id: 4, name: "路線図から" },
    { id: 5, name: "車の移動時間から" },
    { id: 6, name: "地図から" },
    { id: 7, name: "不動産会社から" },
    { id: 8, name: "タグから" },
  ];

  const handleMenuClick = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  return (
    <div className="main-container">
      <h1 className="title">不動産物件探しサイト 「グッド部屋」</h1>

      <div className="button-grid">
        {menuItems.map((item) => (
          <button key={item.id} className="menu-button" onClick={() => handleMenuClick(item.name)}>
            {item.name}
          </button>
        ))}
      </div>

      {isModalOpen && (
        <Modal1 
          setIsModalOpen={setIsModalOpen}  
          setIsModal2Open={setIsModal2Open} 
          setSelectedCategory={setSelectedCategory} 
        />
      )}

      {isModal2Open && (
        <Modal2 
          setIsModal2Open={setIsModal2Open} 
          selectedCategory={selectedCategory} 
        />
      )}
    </div>
  );
};

export default MainPage;
