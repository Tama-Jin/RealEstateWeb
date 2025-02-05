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

ActiveRecord::Schema[8.0].define(version: 2025_02_04_215506) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "merchant", primary_key: "merchant_id", id: :serial, force: :cascade do |t|
    t.text "merchant_name", null: false
    t.text "company_name", null: false
    t.string "email", limit: 255, null: false
    t.string "telephone", limit: 15, null: false

    t.unique_constraint ["email"], name: "merchant_email_key"
    t.unique_constraint ["telephone"], name: "merchant_telephone_key"
  end

  create_table "merchants", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "properties", primary_key: "properties_id", id: :integer, default: -> { "nextval('properties_id_seq'::regclass)" }, force: :cascade do |t|
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

  create_table "regions", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
