import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const PropertyList = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('property_name');
  const [merchantId, setMerchantId] = useState(null);

  // 인증 체크 및 merchant_id 가져오기
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded Token:', decodedToken);  // 토큰 구조 확인
      setMerchantId(decodedToken.merchant_id);
    }
  }, [navigate]);

  // 물건 정보 가져오기
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:4000/properties');
        const sortedData = response.data
          .filter(property => property.merchant_id === merchantId) // merchant_id로 필터링
          .sort((a, b) => a.properties_id - b.properties_id);
        setProperties(sortedData);
        setLoading(false);
      } catch (error) {
        setError('データの取得に失敗しました');
        setLoading(false);
      }
    };

    if (merchantId) {
      fetchProperties();
    }
  }, [merchantId]);

  const filteredProperties = properties.filter(property =>
    property[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <div>ローディング中...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ marginRight: '120px' }}>物件一覧</h1>
        <Link to="/add-property">
          <button style={{ marginLeft: '30px', padding: '10px 30px' }}>物件登録</button>
        </Link>
        <button onClick={handleLogout} style={{ marginLeft: '30px', padding: '10px 30px' }}>ログアウト</button>
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
            <th>物件番号</th>
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
              <td>{property.main_exposure || '不明'}</td>
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
