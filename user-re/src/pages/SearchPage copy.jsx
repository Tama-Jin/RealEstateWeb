import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const prefectureId = queryParams.get("prefecture");

  const [properties, setProperties] = useState([]); // 부동산 리스트 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    if (!prefectureId) return; // prefectureId가 없으면 요청 안 함

    const fetchProperties = async () => {
      try {
        console.log(prefectureId); // prefectureId 값 확인
        setLoading(true);
        const response = await fetch(`http://localhost:4000/properties?prefecture=${prefectureId}`);
        if (!response.ok) {
          throw new Error("データの取得に失敗しました。");
        }
        const data = await response.json();
        console.log(data); // API 응답 데이터 확인
        setProperties(data); // 데이터 저장
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [prefectureId]);

  return (
    <div>
      <h1>選択された地域の物件リスト</h1>
      <p>都道府県 ID: {prefectureId}</p>

      {loading && <p>データを読み込み中...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
  {properties.map((property) => (
    <li key={property.id}> {/* 여기서 key 추가 */}
      {property.name} - {property.price}円
    </li>
  ))}
</ul>
    </div>
  );
};

export default SearchPage;
