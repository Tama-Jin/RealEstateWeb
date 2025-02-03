import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles/index.css';
import App from './App';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PropertyList from './pages/PropertyList';  // 올바른 경로로 PropertyList 임포트
import AddProperty from './pages/AddProperty';  // AddProperty 임포트 추가
import PropertyDetail from './pages/PropertyDetail';  // AddProperty 임포트 추가

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />   {/* App 컴포넌트를 홈 페이지로 설정 */}
        <Route path="/login" element={<LoginPage />} />   {/* 로그인 페이지 */}
        <Route path="/register" element={<RegisterPage />} />  {/* 계정 생성 페이지 */}
        <Route path="/property-list" element={<PropertyList />} />  {/* PropertyList 페이지 */}
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/add-property" element={<AddProperty />} />  {/* AddProperty 페이지 추가 */}
      </Routes>
    </Router>
  </React.StrictMode>
);
