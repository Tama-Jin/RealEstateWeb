import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage"; // MainPageを初期ページに
import Modal1 from "./modals/Modal1";
import Modal2 from "./modals/Modal2";

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
      </Routes>
      
  );
};

export default App;
