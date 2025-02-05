import React from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigateの使用
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PropertyList from './pages/PropertyList';
import './styles/App.css';

const App = () => {
  const navigate = useNavigate();  // useNavigateフックの使用

  return (
    <div>
      <h1>ホームページ</h1>
      <button onClick={() => navigate('/login')}>ログイン</button>  {/* ログインページへの遷移 */}
      <button onClick={() => navigate('/register')}>アカウント作成</button>  {/* アカウント作成ページへの遷移 */}
    </div>
  );
};

export default App;
