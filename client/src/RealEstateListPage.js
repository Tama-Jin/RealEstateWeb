// src/RealEstateListPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

function RealEstateListPage() {
  const { prefecture } = useParams(); // URLパラメータから選択された都道府県を取得

  // 例の不動産データ（後で実際のAPIデータに置き換えることが可能）
  const realEstateData = [
    { id: 1, name: '北海道のアパートA', price: '¥30,000,000', location: '札幌市' },
    { id: 2, name: '北海道のマンションB', price: '¥50,000,000', location: '小樽市' },
    { id: 3, name: '北海道の住宅C', price: '¥40,000,000', location: '旭川市' },
  ];

  return (
    <div>
      <h2>{prefecture}の不動産リスト</h2>
      <ul>
        {realEstateData.map(property => (
          <li key={property.id}>
            <h3>{property.name}</h3>
            <p>価格: {property.price}</p>
            <p>所在地: {property.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RealEstateListPage;
