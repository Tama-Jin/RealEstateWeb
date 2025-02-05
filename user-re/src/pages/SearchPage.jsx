import React, { useEffect, useState } from "react";
import "../styles/SearchPage.css";

// 이미지 배열 정의 (이미지들을 로컬에 넣어두었으므로 경로를 지정해줌)
import image1 from "./image1.jpg";
import image2 from "./image2.jpg";
import image3 from "./image3.JPG";

const SearchPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rentMin, setRentMin] = useState("");
  const [rentMax, setRentMax] = useState("");
  const [areaMin, setAreaMin] = useState("");
  const [areaMax, setAreaMax] = useState("");
  const [rooms, setRooms] = useState("");
  const [stationDistance, setStationDistance] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // fetch API에서 데이터를 가져오는 함수
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4000/properties?rent_min=${rentMin}&rent_max=${rentMax}&area_min=${areaMin}&area_max=${areaMax}&rooms=${rooms}&station_distance=${stationDistance}`
      );
      if (!response.ok) throw new Error("データの取得に失敗しました。");
      const data = await response.json();
      setProperties(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(); // 페이지 로드 시 API 데이터 가져오기
  }, [rentMin, rentMax, areaMin, areaMax, rooms, stationDistance]); // 필터값이 변경될 때마다 재요청

  const indexOfLastProperty = currentPage * itemsPerPage;
  const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

  // 이미지 배열 정의 (이미지가 부족한 경우, 순차적으로 이미지 사용)
  const images = [image1, image2, image3];

  // 페이지네이션 버튼 클릭 시
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 페이지네이션 총 페이지 수 계산
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  return (
    <div className="search-page-container">
      {/* 왼쪽 필터 영역 */}
      <div className="filter-section">
        <h2>検索条件</h2>

        <div className="filter-item">
          <label>賃料</label>
          <input
            type="number"
            value={rentMin}
            onChange={(e) => setRentMin(e.target.value)}
            placeholder="下限なし"
          />
          ～ 
          <input
            type="number"
            value={rentMax}
            onChange={(e) => setRentMax(e.target.value)}
            placeholder="上限なし"
          />
        </div>

        <div className="filter-item">
          <label>専有面積 (㎡)</label>
          <input
            type="number"
            value={areaMin}
            onChange={(e) => setAreaMin(e.target.value)}
            placeholder="下限なし"
          />
          ～ 
          <input
            type="number"
            value={areaMax}
            onChange={(e) => setAreaMax(e.target.value)}
            placeholder="上限なし"
          />
        </div>

        <div className="filter-item">
          <label>間取り</label>
          <input
            type="number"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            placeholder="例: 3"
          />
        </div>

        <div className="filter-item">
          <label>駅徒歩分</label>
          <input
            type="number"
            value={stationDistance}
            onChange={(e) => setStationDistance(e.target.value)}
            placeholder="例: 10"
          />
        </div>
      </div>

      {/* 오른쪽 부동산 리스트 영역 */}
      <div className="property-list">
        {loading && <p>データを読み込み中...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {currentProperties.map((property, index) => (
          <div className="property-card" key={property.id}>
            <div className="property-image">
              {/* 이미지를 순차적으로 할당 */}
              <img src={images[index % images.length]} alt={property.property_name} />
            </div>
            <div className="property-info">
              <h3>{property.property_name}</h3>
              <p>{property.address}</p>
              <p>{property.transportation}</p>
              <p>{property.floor_level}</p>
              <p>{property.construction_date}</p>
              {/* 상세페이지로 이동하는 링크 */}
              <a href={`/property/${property.id}`}>詳細</a>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 버튼을 카드 목록 바로 아래에 배치 */}
      <div className="pagination-container">
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
