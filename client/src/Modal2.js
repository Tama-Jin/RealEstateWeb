import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 사용
import './Modal.css';

const Modal2 = ({ setIsModal2Open }) => {
  const navigate = useNavigate();  // useNavigate 훅을 사용하여 페이지 이동

  const handleClose = () => {
    setIsModal2Open(false);  // 모달 닫기
  };

  const prefectures = [
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県',
    '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県',
    '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県',
    '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県',
    '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県',
    '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
  ];

  const handlePrefectureClick = () => {
    setIsModal2Open(false);  // 페이지 이동 전에 모달 닫기
    navigate('/aaa'); // aaa.js로 이동
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={handleClose}>×</button>
        <h3>選択したカテゴリの地域を選んでください。</h3>

        {/* 도도부현 버튼 리스트 */}
        <div className="prefecture-list">
          {prefectures.map((prefecture, index) => (
            // 버튼을 클릭하면 aaa.js로 이동하도록 설정
            <button 
              key={index} 
              onClick={handlePrefectureClick} 
              className="prefecture-button"
            >
              {prefecture}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal2;
