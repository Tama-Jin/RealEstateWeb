// 예시: components/PropertyList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            {property.property_type} - {property.rent}円
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;
