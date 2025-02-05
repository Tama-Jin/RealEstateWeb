import React, { useState } from "react";
import Modal1 from "../modals/Modal1";
import "../styles/MainPage.css";

const MainPage = ({ setIsModalOpen, setIsModal2Open, setSelectedCategory }) => {
  const [isModalOpen, setIsModalOpenState] = useState(false);
  const [selectedCategory, setSelectedCategoryState] = useState(""); // 選択したカテゴリ

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
    setSelectedCategoryState(category);
    setIsModalOpen(true); // モーダルを開く
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

      {/* Modal1 を表示 */}
      {isModalOpen && <Modal1 category={selectedCategory} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default MainPage;
