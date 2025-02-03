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

ActiveRecord::Schema[8.0].define(version: 2025_02_03_052712) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "merchant", primary_key: "merchant_id", id: :serial, force: :cascade do |t|
    t.text "merchant_name", null: false
    t.text "company_name", null: false
    t.string "email", limit: 255, null: false
    t.string "telephone", limit: 15, null: false

    t.unique_constraint ["email"], name: "merchant_email_key"
    t.unique_constraint ["telephone"], name: "merchant_telephone_key"
  end

  create_table "properties", primary_key: "properties_id", id: :serial, force: :cascade do |t|
    t.integer "merchant_id", null: false
    t.integer "property_type", null: false
    t.text "property_name", null: false
    t.integer "rent", null: false
    t.integer "management_fee"
    t.integer "deposit"
    t.text "transportation"
    t.text "address", null: false
    t.integer "prefecture", null: false
    t.date "construction_date"
    t.integer "main_exposure"
    t.decimal "area", precision: 10, scale: 2
    t.decimal "balcony_area", precision: 10, scale: 2
    t.integer "floor_level"
    t.integer "current_status"
    t.date "available_from"
    t.date "info_publication"
    t.integer "structure", null: false
    t.integer "parking", null: false
    t.integer "unit"
    t.integer "contract_type"
    t.integer "contract_period", null: false
    t.integer "renewal_fee"
    t.text "other_fee"
    t.text "guarantee_company"
    t.integer "insurance", null: false
    t.text "management"
    t.string "property_number", limit: 15, null: false
    t.string "their_number", limit: 13, null: false
    t.integer "trading", null: false
    t.text "location"
    t.text "condition"
    t.text "plumbing"
    t.text "equipment"
    t.text "other"
    t.text "remarks"

    t.unique_constraint ["property_number"], name: "properties_property_number_key"
    t.unique_constraint ["their_number"], name: "properties_their_number_key"
  end
end
