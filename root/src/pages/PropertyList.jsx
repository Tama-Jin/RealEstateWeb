// PropertyList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Link 컴포넌트를 임포트해서 페이지 간 이동

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:4000/properties');
        setProperties(response.data);
        setLoading(false);
      } catch (error) {
        setError('データの取得に失敗しました');
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div>ローディング中...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>物件リスト</h1>
      <Link to="/add-property">
        <button>物件を登録する</button> {/* 등록 버튼 */}
      </Link>
      <table border="1">
        <thead>
          <tr>
          <th>物件名</th>
            <th>賃料</th>
            <th>管理費</th>
            <th>敷金</th>
            <th>交通</th>
            <th>所在地</th>
            <th>築年月</th>
            <th>主要採光面</th>
            <th>専有面積</th>
            <th>バルコニー面積</th>
            <th>所在階</th>
            <th>現況</th>
            <th>入居可能時期</th>
            <th>情報公開日</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.property_id}>
              <td>{property.property_name}</td>
                <td>{property.rent}円</td>
                <td>{property.management_fee ? property.management_fee + '円' : 'なし'}</td>
                <td>{property.deposit ? property.deposit + '円' : '   '}</td>
                <td>{property.transportation}</td>
                <td>{property.address}</td>
                <td>{property.construction_date}</td>
                <td>{property.main_exposure}</td>
                <td>{property.area}㎡</td>
                <td>{property.balcony_area ? property.balcony_area + '㎡' : '  '}</td>
                <td>{property.floor_level}階</td>
                <td>{property.current_status === 1 ? '入居中' : '空室'}</td>
                <td>{property.available_from}</td>
                <td>{property.info_publication}</td>
                <td>
                <button>修正</button>
                <button>削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyList;
