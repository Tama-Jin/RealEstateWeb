import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const columnNames = {
  property_type: "物件タイプ",
  property_name: "物件名",
  rent: "賃料（円）",
  management_fee: "管理費等（円）",
  deposit: "敷金",
  transportation: "交通",
  prefecture: "都道府県",
  address: "所在地",
  construction_date: "築年月",
  main_exposure: "主要採光面",
  area: "専有面積（㎡）",
  balcony_area: "バルコニー面積（㎡）",
  floor_level: "所在階/階数",
  current_status: "現況",
  available_from: "入居可能時期",
  info_publication: "情報公開日"
};

// 数字入力フィールドリスト
const numberFields = ["rent", "management_fee", "area", "balcony_area", "floor_level", "main_exposure", "prefecture"];

// 日付入力フィールドリスト
const dateFields = ["construction_date", "available_from", "info_publication"];

// property_typeの選択肢
const propertyTypeOptions = [
  "マンション",
  "アパート",
  "一戸建て",
  "オフィス",
  "店舗"
];

// 主要採光面の選択肢
const sunlightDirections = {
  1: '北向き', 2: '北東向き', 3: '東向き', 4: '南東向き',
  5: '南向き', 6: '南西向き', 7: '西向き', 8: '北西向き'
};

// 都道府県の選択肢
const prefectureOptions = {
  1: '北海道', 2: '青森県', 3: '岩手県', 4: '宮城県', 5: '秋田県',
  6: '山形県', 7: '福島県', 8: '茨城県', 9: '栃木県', 10: '群馬県',
  11: '埼玉県', 12: '千葉県', 13: '東京都', 14: '神奈川県', 15: '新潟県',
  16: '富山県', 17: '石川県', 18: '福井県', 19: '山梨県', 20: '長野県',
  21: '岐阜県', 22: '静岡県', 23: '愛知県', 24: '三重県', 25: '滋賀県',
  26: '京都府', 27: '大阪府', 28: '兵庫県', 29: '奈良県', 30: '和歌山県',
  31: '鳥取県', 32: '島根県', 33: '岡山県', 34: '広島県', 35: '山口県',
  36: '徳島県', 37: '香川県', 38: '愛媛県', 39: '高知県', 40: '福岡県',
  41: '佐賀県', 42: '長崎県', 43: '熊本県', 44: '大分県', 45: '宮崎県',
  46: '鹿児島県', 47: '沖縄県'
};

const AddProperty = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    property_type: '',
    property_name: '',
    rent: '',
    management_fee: 0,  // 初期値を0に設定
    deposit: '',
    transportation: '',
    prefecture: '',
    address: '',
    construction_date: '',
    main_exposure: '',
    area: '',
    balcony_area: '',
    floor_level: '',
    current_status: '',
    available_from: '',
    info_publication: '',
  });
  

  useEffect(() => {
  const token = localStorage.getItem('token');
  const merchantId = localStorage.getItem('merchant_id');
  
  console.log('token:', token);
  console.log('merchantId:', merchantId);

  if (!token) {
    alert('ログイン情報がありません。再ログインしてください。');
    navigate('/login');
  } else if (!merchantId) {
    alert('業者IDが見つかりません。');
    navigate('/login');
  } else {
    setFormData(prevState => ({ ...prevState, merchant_id: merchantId }));
  }
}, [navigate]);


  

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (numberFields.includes(name)) {
      // 空文字はそのまま保持
      const parsedValue = value === "" ? "" : parseFloat(value);
  
      // 数値に変換できない場合はそのまま空文字
      setFormData({
        ...formData,
        [name]: isNaN(parsedValue) ? "" : parsedValue,
      });
    } else {
      // 数字以外のフィールドはそのまま
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    if (!token) {
      alert('ログイン情報がありません。再ログインしてください。');
      navigate('/login');
      return;
    }
  
    // `management_fee`が空の場合、0を設定
    const sanitizedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => {
        if (key === 'management_fee' && value === '') {
          return [key, 0];  // 空の場合は0を設定
        }
        return [key, value === '' ? null : value];  // 他の空のフィールドはnullにする
      })
    );
  
    try {
      const response = await axios.post('http://localhost:4000/properties', sanitizedData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
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
                    <select id={key} name={key} value={formData[key]} onChange={handleChange} required>
                      <option value="">選択してください</option>
                      {propertyTypeOptions.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  ) : key === "property_name" || key === "rent" ? (
                    <input
                      id={key}
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      placeholder={label}
                      required
                    />
                  ) : key === "main_exposure" ? (
                    <select id={key} name={key} value={formData[key]} onChange={handleChange}>
                      <option value="">選択してください</option>
                      {Object.entries(sunlightDirections).map(([id, direction]) => (
                        <option key={id} value={id}>{direction}</option>
                      ))}
                    </select>
                  ) : key === "prefecture" ? (
                    <select id={key} name={key} value={formData[key]} onChange={handleChange}>
                      <option value="">選択してください</option>
                      {Object.entries(prefectureOptions).map(([id, name]) => (
                        <option key={id} value={id}>{name}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={key}
                      type={dateFields.includes(key) ? "date" : "text"}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
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
