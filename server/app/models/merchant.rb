class Merchant < ApplicationRecord
  self.table_name = 'merchants'  # テーブル名を指定
  has_secure_password
  validates :email, presence: true, uniqueness: true
  has_many :properties
end
