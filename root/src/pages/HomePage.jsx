import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>ホームページ</h1>
      <button onClick={() => navigate('/login')} className="login-button">
        ログイン
      </button>
      <button onClick={() => window.location.href = '/account'}>
        アカウント作成
      </button>
    </div>
  );
};

export default HomePage;
