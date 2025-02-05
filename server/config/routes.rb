Rails.application.routes.draw do
  resources :properties, only: [:index, :create, :show, :update, :destroy]

  namespace :api do
    resources :regions, only: [:index] # GET /api/regions
  end

  resources :merchants, only: [:create]  # POST /merchants (merchantの作成)

  post '/login', to: 'sessions#create'

end
