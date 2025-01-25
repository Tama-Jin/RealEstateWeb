// AddProperty.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate를 임포트
import axios from 'axios';  // axios 임포트 추가

const AddProperty = () => {
  const [property, setProperty] = useState({
    property_name: '',
    rent: '',
    layout: '',
    address: '',
    transportation: '',
    construction_date: '',
  });
  
  const navigate = useNavigate();  // useNavigate 훅 사용

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/properties', property);
      navigate('/property-list');  // 등록 후 목록 페이지로 이동
    } catch (error) {
      console.error('物件登録エラー:', error);
    }
  };

  return (
    <div>
      <h1>物件を登録する</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="property_name"
          value={property.property_name}
          onChange={handleChange}
          placeholder="物件名"
        />
        <input
          type="text"
          name="rent"
          value={property.rent}
          onChange={handleChange}
          placeholder="賃料"
        />
        <input
          type="text"
          name="layout"
          value={property.layout}
          onChange={handleChange}
          placeholder="間取り"
        />
        <input
          type="text"
          name="address"
          value={property.address}
          onChange={handleChange}
          placeholder="所在地"
        />
        <input
          type="text"
          name="transportation"
          value={property.transportation}
          onChange={handleChange}
          placeholder="交通"
        />
        <input
          type="text"
          name="construction_date"
          value={property.construction_date}
          onChange={handleChange}
          placeholder="築年月"
        />
        <button type="submit">登録</button>
      </form>
    </div>
  );
};

export default AddProperty;
