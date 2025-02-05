import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";  // BrowserRouter 제거
import MainPage from "./pages/MainPage";
import Modal1 from "./modals/Modal1";
import Modal2 from "./modals/Modal2";
import SearchPage from "./pages/SearchPage";  // ✅ SearchPage 추가

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <MainPage 
            setIsModalOpen={setIsModalOpen} 
            setIsModal2Open={setIsModal2Open} 
            setSelectedCategory={setSelectedCategory} 
          />
        } 
      />
      <Route 
        path="/modal1" 
        element={
          <Modal1 
            setIsModalOpen={setIsModalOpen} 
            setIsModal2Open={setIsModal2Open} 
            setSelectedCategory={setSelectedCategory} 
          />
        }
      />
      <Route 
        path="/modal2" 
        element={
          <Modal2 
            setIsModal2Open={setIsModal2Open} 
            selectedCategory={selectedCategory} 
          />
        }
      />
      <Route 
        path="/search" 
        element={<SearchPage />}  // ✅ SearchPage 라우트 추가
      />
    </Routes>
  );
};

export default App;
