class CreateProperties < ActiveRecord::Migration[8.0]
  def change
    create_table :properties do |t|
      t.integer :merchant_id, null: false                  # 業者ID
      t.integer :property_type, null: false               # 物件類
      t.string :property_name, null: false                # 物件名
      t.integer :rent, null: false                        # 賃料（円）
      t.integer :management_fee                           # 管理費等（円）
      t.integer :deposit                                   # 敷金
      t.string :transportation                            # 交通
      t.string :address, null: false                      # 所在地
      t.date :construction_date                           # 築年月
      t.integer :main_exposure                            # 主要採光面
      t.decimal :area, precision: 10, scale: 2            # 専有面積（㎡）
      t.decimal :balcony_area, precision: 10, scale: 2    # バルコニー面積（㎡）
      t.integer :floor_level                              # 所在階/階数
      t.integer :current_status                           # 現況
      t.date :available_from                              # 入居可能時期
      t.date :info_publication                            # 情報公開日

      t.timestamps
    end
  end
end