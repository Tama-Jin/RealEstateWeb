import React, { useEffect, useState } from 'react';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch('/api/properties')
      .then(response => response.json())
      .then(data => setProperties(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/properties/${id}`, { method: 'DELETE' })
      .then(() => {
        setProperties(properties.filter(property => property.id !== id));
      });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>물건 번호</th>
          <th>건물명</th>
          <th>주소</th>
          <th>가격</th>
          <th>방 구조</th>
          <th>작업</th>
        </tr>
      </thead>
      <tbody>
        {properties.map(property => (
          <tr key={property.id}>
            <td>{property.id}</td>
            <td>{property.name}</td>
            <td>{property.address}</td>
            <td>{property.price}</td>
            <td>{property.roomStructure}</td>
            <td>
              <button onClick={() => alert('상세 보기')}>상세</button>
              <button onClick={() => alert('수정하기')}>수정</button>
              <button onClick={() => handleDelete(property.id)}>삭제</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PropertyList;
