import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Routes와 Route 임포트
import './App.css';
import Modal1 from './Modal1'; // 첫 번째 모달 (카테고리 선택)
import Modal2 from './Modal2'; // 두 번째 모달 (도도부현 선택)
import AAA from './aaa'; // aaa.js 파일 임포트
import LandPage from './LandPage'; // '土地' 페이지 임포트

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 첫 번째 모달 상태
  const [isModal2Open, setIsModal2Open] = useState(false); // 두 번째 모달 상태

  const menuItems = [
    { id: 1, name: '住所から', path: '/address' },
    { id: 2, name: '駅・路線から', path: '/station' },
    { id: 3, name: '通勤・通学時間から', path: '/commute' },
    { id: 4, name: '路線図から', path: '/map' },
    { id: 5, name: '車の移動時間から', path: '/car' },
    { id: 6, name: '地図から', path: '/map-view' },
    { id: 7, name: '不動産会社から', path: '/agency' },
    { id: 8, name: 'タグから', path: '/tags' },
  ];

  const handleMenuClick = (menu) => {
    setIsModalOpen(true); // 첫 번째 모달 열기
    setIsModal2Open(false); // 두 번째 모달 닫기
  };

  return (
    <Router>
      <div className="App">
        <div className="title">
          <div>不動産情報</div>
          <div>サービス</div>
        </div>

        <div className="menu">
          <div className="top-buttons">
            {menuItems.slice(0, 4).map(item => (
              <button key={item.id} onClick={() => handleMenuClick(item.name)}>
                {item.name}
              </button>
            ))}
          </div>
          <div className="bottom-buttons">
            {menuItems.slice(4).map(item => (
              <button key={item.id} onClick={() => handleMenuClick(item.name)}>
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* 첫 번째 모달이 열리면 표시 */}
        {isModalOpen && (
          <Modal1 setIsModalOpen={setIsModalOpen} setIsModal2Open={setIsModal2Open} />
        )}

        {/* 두 번째 모달이 열리면 표시 */}
        {isModal2Open && (
          <Modal2 setIsModal2Open={setIsModal2Open} />
        )}

        {/* 라우팅을 통해 aaa 페이지로 이동 */}
        <Routes>
          <Route path="/aaa" element={<AAA />} /> {/* aaa.js 페이지 */}
          <Route path="/land" element={<LandPage />} /> {/* '土地' 페이지 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
