import React from 'react';
import { Routes, Route } from "react-router-dom"; // ✅ Router 제거
import MainComponent from './components/MainComponent'; // ✅ MainComponent 추가
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}

export default App;
