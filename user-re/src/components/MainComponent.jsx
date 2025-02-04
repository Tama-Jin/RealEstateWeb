import React, { useState } from 'react';
import Modal1 from '../modals/Modal1';
import Modal2 from '../modals/Modal2';

const MainComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>モーダルを開く</button>

      {isModalOpen && (
        <Modal1 
          setIsModalOpen={setIsModalOpen}  
          setIsModal2Open={setIsModal2Open} 
          setSelectedCategory={setSelectedCategory} 
        />
      )}

      {isModal2Open && (
        <Modal2 
          setIsModal2Open={setIsModal2Open} 
          selectedCategory={selectedCategory} 
        />
      )}
    </div>
  );
};

export default MainComponent;
