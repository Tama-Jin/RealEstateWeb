import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Modal2.css';

const Modal2 = ({ setIsModal2Open, selectedCategory = "選択なし" }) => {
  const navigate = useNavigate();

  // 도도부현과 번호 매핑
  const prefectureMapping = {
    '北海道': 1, '青森県': 2, '岩手県': 3, '宮城県': 4, '秋田県': 5, '山形県': 6, '福島県': 7, '茨城県': 8,
    '栃木県': 9, '群馬県': 10, '埼玉県': 11, '千葉県': 12, '東京都': 13, '神奈川県': 14, '新潟県': 15, '富山県': 16,
    '石川県': 17, '福井県': 18, '山梨県': 19, '長野県': 20, '岐阜県': 21, '静岡県': 22, '愛知県': 23, '三重県': 24,
    '滋賀県': 25, '京都府': 26, '大阪府': 27, '兵庫県': 28, '奈良県': 29, '和歌山県': 30, '鳥取県': 31, '島根県': 32,
    '岡山県': 33, '広島県': 34, '山口県': 35, '徳島県': 36, '香川県': 37, '愛媛県': 38, '高知県': 39, '福岡県': 40,
    '佐賀県': 41, '長崎県': 42, '熊本県': 43, '大分県': 44, '宮崎県': 45, '鹿児島県': 46, '沖縄県': 47
  };

  const handlePrefectureClick = (prefecture) => {
    const prefectureId = prefectureMapping[prefecture];
    setIsModal2Open(false);

    // 쿼리 파라미터로 category와 prefecture 값을 전달
    navigate(`/search?category=${selectedCategory}&prefecture=${prefectureId}`);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal2">
        <button className="modal-close-btn" onClick={() => setIsModal2Open(false)}>×</button>
        <h3>地域を選んでください。</h3>

        <div className="prefecture-buttons-container">
          {Object.keys(prefectureMapping).map((prefecture, index) => (
            <button
              key={index}
              onClick={() => handlePrefectureClick(prefecture)}
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
