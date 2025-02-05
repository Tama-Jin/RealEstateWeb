import React, { useState } from "react";
import Modal1 from "../modals/Modal1";
import Modal2 from "../modals/Modal2";

const MainComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>モーダルを開く</button>

      {isModalOpen && (
        <Modal1 
          onClose={() => setIsModalOpen(false)}
          setIsModal2Open={setIsModal2Open} 
        />
      )}

      {isModal2Open && <Modal2 setIsModal2Open={setIsModal2Open} />}
    </div>
  );
};

export default MainComponent;
