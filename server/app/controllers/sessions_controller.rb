class SessionsController < ApplicationController
    def create
      # メールアドレスに一致するMerchantを検索
      merchant = Merchant.find_by(email: params[:email])
  
      # メールアドレスが一致し、パスワードが正しい場合
      if merchant && merchant.authenticate(params[:password])
        # Rails.application.credentials.secret_key_base を使ってJWTを生成
        token = JWT.encode({ merchant_id: merchant.id }, Rails.application.credentials.secret_key_base, 'HS256')
        render json: { token: token, merchant: { id: merchant.id, email: merchant.email } }, status: :ok
      else
        # 認証失敗の場合
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end
  end
  