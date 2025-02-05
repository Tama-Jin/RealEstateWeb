import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PropertyList from './pages/PropertyList';  // 正しいパスでインポート
import AddProperty from './pages/AddProperty';  // AddProperty インポート追加
import PropertyDetail from './pages/PropertyDetail';  // PropertyDetail インポート追加

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // React.StrictModeを一時的に削除して動作確認
  <Router>
    <Routes>
      <Route path="/" element={<App />} />   {/* ホームページ */}
      <Route path="/login" element={<LoginPage />} />   {/* ログインページ */}
      <Route path="/register" element={<RegisterPage />} />  {/* アカウント作成ページ */}
      <Route path="/property-list" element={<PropertyList />} />  {/* 物件リストページ */}
      <Route path="/property/:id" element={<PropertyDetail />} />  {/* 物件詳細ページ */}
      <Route path="/add-property" element={<AddProperty />} />  {/* 物件登録ページ */}
    </Routes>
  </Router>
);
