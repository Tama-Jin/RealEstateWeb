import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const columnNames = {
  properties_id: "物件ID",
  merchant_id: "業者ID",
  property_type: "物件類",
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
  info_publication: "情報公開日",
  structure: "物件構造",
  parking: "駐車場",
  unit: "総戸数",
  contract_type: "契約形態",
  contract_period: "契約期間",
  renewal_fee: "更新料(円)",
  other_fee: "その他費用",
  guarantee_company: "保証会社",
  insurance: "住宅保険",
  management: "管理",
  property_number: "物件番号",
  their_number: "自社管理番号",
  trading: "取引態様",
  location: "位置",
  condition: "入居条件",
  plumbing: "キッチン/バス・トイレ",
  equipment: "設備・サービス",
  other: "その他",
  remarks: "備考"
};

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    console.log("現在の詳細ページID:", id);

    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/properties/${id}`);
        console.log("APIレスポンスデータ:", response.data);

        if (!response.data) {
          throw new Error("物件データが見つかりませんでした。");
        }

        setProperty(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("APIエラー:", error);
        setError('データ取得に失敗しました: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    } else {
      setError('URLのIDが不正です。');
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div>ローディング中...</div>;
  if (error) return <div>{error}</div>;

  const handleDelete = async () => {
    setShowDeleteConfirm(false);
    try {
      await axios.delete(`http://localhost:4000/properties/${id}`);
      alert("物件が削除されました。");
      navigate('/property-list');
    } catch (error) {
      console.error("削除エラー:", error);
      alert("削除に失敗しました。");
    }
  };

  const handleEditToggle = () => setEditMode(!editMode);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:4000/properties/${id}`, {
        ...formData,
        properties_id: id
      });
      alert("変更が保存されました。");
      setEditMode(false);
      setProperty(formData);
    } catch (error) {
      console.error("更新エラー:", error);
      alert("変更に失敗しました。");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      <div style={{ flex: 1 }}>
        <h1>物件詳細情報</h1>
        <table border="1">
          <tbody>
            {Object.keys(columnNames).map((key) => (
              <tr key={key}>
                <td><strong>{columnNames[key] || key}</strong></td>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      name={key}
                      value={formData[key] ?? ""}
                      onChange={handleChange}
                    />
                  ) : (
                    property[key] ?? "なし"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editMode ? (
          <button onClick={handleSave}>保存</button>
        ) : (
          <button onClick={handleEditToggle}>修正</button>
        )}
        <button onClick={() => setShowDeleteConfirm(true)} style={{ marginLeft: '10px', color: 'red' }}>削除</button>
        <button onClick={() => navigate('/property-list')} style={{ marginLeft: '10px' }}>戻る</button>

        {showDeleteConfirm && (
          <div style={{ border: "1px solid red", padding: "10px", marginTop: "10px" }}>
            <p>本当に削除しますか？</p>
            <button onClick={handleDelete} style={{ color: "red" }}>はい</button>
            <button onClick={() => setShowDeleteConfirm(false)}>キャンセル</button>
          </div>
        )}
      </div>

      {/* 地図を右側に表示 */}
      {property.address && (
        <div style={{ flex: 1, marginLeft: '20px' }}>
          <h3>所在地: {property.address}</h3>
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(property.address)}&output=embed`}
            width="100%"
            height="450"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
