import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const columnNames = {
  merchant_id: "Merchant ID",
  property_type: "物件タイプ",
  property_name: "物件名",
  rent: "賃料（円）",
  management_fee: "管理費等（円）",
  deposit: "敷金",
  transportation: "交通",
  address: "所在地",
  prefecture: "都道府県",
  construction_date: "築年月",
  main_exposure: "主要採光面",
  area: "専有面積（㎡）",
  balcony_area: "バルコニー面積（㎡）",
  floor_level: "所在階/階数",
  current_status: "現況",
  available_from: "入居可能時期",
  info_publication: "情報公開日"
};

// 숫자 입력 필드 리스트
const numberFields = ["rent", "management_fee", "area", "balcony_area", "floor_level", "merchant_id", "main_exposure"];

// 날짜 입력 필드 리스트
const dateFields = ["construction_date", "available_from", "info_publication"];

// 선택 가능한 property_type 리스트
const propertyTypeOptions = [
  "マンション",
  "アパート",
  "一戸建て",
  "オフィス",
  "店舗"
];

const AddProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    Object.keys(columnNames).reduce((acc, key) => ({ ...acc, [key]: '' }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: numberFields.includes(name) ? (value ? parseInt(value, 10) : '') : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 빈 값 처리 (빈 문자열을 null 대신 보낼 수도 있음)
    const sanitizedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value === '' ? null : value])
    );

    try {
      await axios.post('http://localhost:4000/properties', sanitizedData);
      alert("物件が登録されました！");
      navigate('/property-list');
    } catch (error) {
      console.error('物件登録エラー:', error.response ? error.response.data : error);
      alert(`登録に失敗しました。\n${error.response?.data?.message || 'エラーが発生しました。'}`);
    }
  };

  return (
    <div>
      <h1>物件を登録する</h1>
      <form onSubmit={handleSubmit}>
        <table border="1">
          <tbody>
            {Object.entries(columnNames).map(([key, label]) => (
              <tr key={key}>
                <td><strong>{label}</strong></td>
                <td>
                  {key === "property_type" ? (
                    // 🔥 property_type은 선택하는 드롭다운으로 변경
                    <select name={key} value={formData[key]} onChange={handleChange} required>
                      <option value="">選択してください</option>
                      {propertyTypeOptions.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={dateFields.includes(key) ? "date" : numberFields.includes(key) ? "number" : "text"}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      placeholder={label}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">登録</button>
        <button type="button" onClick={() => navigate('/property-list')} style={{ marginLeft: '10px' }}>戻る</button>
      </form>
    </div>
  );
};

export default AddProperty;
