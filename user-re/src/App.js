import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage"; // MainPageを初期ページに
import Modal1 from "./modals/Modal1";
import Modal2 from "./modals/Modal2";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/modal1" element={<Modal1 />} />
        <Route path="/modal2" element={<Modal2 />} />
      </Routes>
    </Router>
  );
};

export default App;
