# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_01_25_170555) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "properties", primary_key: "property_id", id: :serial, force: :cascade do |t|
    t.integer "merchant_id"
    t.integer "property_type", null: false
    t.text "property_name", null: false
    t.integer "rent", null: false
    t.integer "management_fee"
    t.integer "deposit"
    t.text "transportation"
    t.text "address", null: false
    t.date "construction_date"
    t.integer "main_exposure"
    t.decimal "area", precision: 10, scale: 2
    t.decimal "balcony_area", precision: 10, scale: 2
    t.integer "floor_level"
    t.integer "current_status"
    t.date "available_from"
    t.date "info_publication"
  end
end
