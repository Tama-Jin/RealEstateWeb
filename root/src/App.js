import React from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate 사용
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import goToPropertyList from './pages/PropertyList';
import './styles/App.css';

const App = () => {
  const navigate = useNavigate();  // useNavigate 훅 사용

  const goToPropertyList = () => {
    navigate('/property-list');  // MainPage로 이동
  };

  return (
    <div>
      <h1>ホームページ</h1>
      <button onClick={() => navigate('/login')}>ログイン</button>  {/* 로그인 페이지로 이동 */}
      <button onClick={() => navigate('/register')}>アカウント作成</button>  {/* 계정 생성 페이지로 이동 */}
    </div>
  );
};

export default App;
