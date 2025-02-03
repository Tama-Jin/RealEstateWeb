import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('property_name');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:4000/properties');
        const sortedData = response.data.sort((a, b) => a.properties_id - b.properties_id);
        setProperties(sortedData);
        setLoading(false);
      } catch (error) {
        setError('データの取得に失敗しました');
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const sunlightDirections = {
    1: '北向き', 2: '北東向き', 3: '東向き', 4: '南東向き',
    5: '南向き', 6: '南西向き', 7: '西向き', 8: '北西向き'
  };

  const filteredProperties = properties.filter(property =>
    property[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div>ローディング中...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ marginRight: '1200px' }}>物件リスト</h1>
        <Link to="/add-property">
          <button style={{ marginLeft: 'auto', padding: '10px 20px' }}>物件登録</button>
        </Link>
    </div>

      <div>
        <select value={searchField} onChange={(e) => setSearchField(e.target.value)}>
        <option value="properties_id">物件番号</option>
        <option value="property_name">物件名</option>
        <option value="address">所在地</option>
        <option value="info_publication">情報公開日</option>
        <option value="current_status">現況</option>
        <option value="transportation">交通</option>
        </select>
        <input
          type="text"
          placeholder="検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>物件ID</th>
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
            <th>詳細</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((property) => (
            <tr key={property.properties_id}>
              <td>{property.properties_id}</td>
              <td>{property.property_name}</td>
              <td>{property.rent}円</td>
              <td>{property.management_fee ? property.management_fee + '円' : 'なし'}</td>
              <td>{property.deposit ? property.deposit + '円' : ' '}</td>
              <td>{property.transportation}</td>
              <td>{property.address}</td>
              <td>{property.construction_date}</td>
              <td>{sunlightDirections[property.main_exposure] || '不明'}</td>
              <td>{property.area}㎡</td>
              <td>{property.balcony_area ? property.balcony_area + '㎡' : ' '}</td>
              <td>{property.floor_level}階</td>
              <td>{property.current_status === 1 ? '入居中' : '空室'}</td>
              <td>{property.available_from}</td>
              <td>{property.info_publication}</td>
              <td>
                <Link to={`/property/${property.properties_id}`}>
                  <button>詳細</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {Array.from({ length: Math.ceil(filteredProperties.length / itemsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
