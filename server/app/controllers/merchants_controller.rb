class MerchantsController < ApplicationController
  def create
    puts "Received params: #{params.inspect}"

    @merchant = Merchant.new(merchant_params)

    if @merchant.save
      render json: { message: '登録成功', merchant: @merchant }, status: :created
    else
      render json: { errors: @merchant.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def merchant_params
    params.require(:merchant).permit(:merchant_name, :company_name, :email, :telephone, :password)
  end
end
