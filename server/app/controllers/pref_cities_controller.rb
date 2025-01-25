class PrefCitiesController < ApplicationController
  def index
    # JSON 파일 경로
    file_path = Rails.root.join('app', 'views', 'pref_cities.json')

    # JSON 파일 읽기
    json_data = File.read(file_path)

    # JSON 파싱
    raw_data = JSON.parse(json_data)

    # 데이터 구조 변환
    formatted_data = raw_data.map do |pref|
      key, value = pref.first
      {
        id: value["id"],
        name: value["name"],
        short: value["short"],
        kana: value["kana"],
        en: value["en"],
        cities: value["city"].map do |city|
          # 각 도시에 해당하는 정보를 넣을 수 있음
          {
            name: city["name"], 
            population: city["population"] # 예시로, 인구수도 포함할 수 있음
          }
        end
      }
    end

    # JSON으로 응답
    render json: { prefectures: formatted_data }
  end
end
