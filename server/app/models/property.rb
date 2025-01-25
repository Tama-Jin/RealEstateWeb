class Property < ApplicationRecord
  self.table_name = 'properties'  # 테이블 이름을 명시적으로 'property'로 설정

  validates :property_name, presence: true
  validates :rent, numericality: { greater_than: 0 }
end