class Api::RegionsController < ApplicationController
  def index
    regions = Region.all
    render json: regions
  end
end
