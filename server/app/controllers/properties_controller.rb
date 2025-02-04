class PropertiesController < ApplicationController
  before_action :set_property, only: [:show, :update, :destroy]

  # GET /properties
  def index
    properties = Property.all
    render json: properties
  end

  # GET /properties/:id
  def show
    render json: @property
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

  # PUT /properties/:id
  def update
    if @property.update(property_params)
      render json: @property
    else
      render json: @property.errors, status: :unprocessable_entity
    end
  end

  # DELETE /properties/:id
  def destroy
    @property.destroy
    head :no_content
  end

  private

  def set_property
    @property = Property.find_by(properties_id: params[:id])  
    render json: { error: "Property not found" }, status: :not_found unless @property
  end

  def property_params
    params.require(:property).permit(
      :merchant_id, :property_type, :property_name, :rent, :management_fee, 
      :deposit, :transportation, :address, :prefecture, :construction_date, 
      :main_exposure, :area, :balcony_area, :floor_level, :current_status, 
      :available_from, :info_publication, :structure, :parking, :unit, 
      :contract_type, :contract_period, :renewal_fee, :other_fee, 
      :guarantee_company, :insurance, :management, :property_number, 
      :their_number, :trading, :location, :condition, :plumbing, 
      :equipment, :other, :remarks
    )
  end
end
