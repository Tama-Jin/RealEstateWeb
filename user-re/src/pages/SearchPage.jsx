import React from "react";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const prefectureId = queryParams.get("prefecture_id");

  return (
    <div>
      <h1>選択された地域の物件リスト</h1>
      <p>都道府県 ID: {prefectureId}</p>
    </div>
  );
};

export default SearchPage;
