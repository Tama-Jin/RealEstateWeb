# app/controllers/properties_controller.rb

class PropertiesController < ApplicationController
  # GET /properties
  def index
    properties = Property.all
    render json: properties
  end

  # POST /properties
  def create
    property = Property.new(property_params)
    
    if property.save
      render json: property, status: :created
    else
      render json: property.errors, status: :unprocessable_entity
    end
  end

  private

  def property_params
    params.require(:property).permit(
      :merchant_id, :property_type, :property_name, :rent, :management_fee, 
      :deposit, :transportation, :address, :construction_date, :main_exposure,
      :area, :balcony_area, :floor_level, :current_status, :available_from, 
      :info_publication
    )
  end
end
