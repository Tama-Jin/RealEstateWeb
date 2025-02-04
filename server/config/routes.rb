# config/routes.rb

Rails.application.routes.draw do
  resources :properties, only: [:index, :create, :show, :update, :destroy]

  namespace :api do
    resources :regions, only: [:index] # GET /api/regions
  end
end
