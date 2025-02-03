class Property < ApplicationRecord
  self.table_name = 'properties'  # 테이블 이름 명시
  self.primary_key = 'properties_id'  # 기본 키 설정

  belongs_to :merchant, optional: true  # properties 테이블이 merchant_id를 가짐

  validates :property_name, presence: true
  validates :rent, numericality: { greater_than: 0 }
end
