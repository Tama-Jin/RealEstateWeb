import React from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate 사용

const MainPage = () => {
  const navigate = useNavigate();  // useNavigate 훅 호출

  const goToPropertyList = () => {
    navigate('/property-list');  // 버튼 클릭 시 '/property-list'로 이동
  };

  return (
    <div className="main-page">
      <h1>Main Page</h1>
      <div className="button-container">
        <button onClick={goToPropertyList} className="main-button">物件探索</button> {/* 물건 찾기 버튼 */}
        <button className="main-button">button 2</button>
        <button className="main-button">button 3</button>
        <button className="main-button">button 4</button>
      </div>
    </div>
  );
};

export default MainPage;
