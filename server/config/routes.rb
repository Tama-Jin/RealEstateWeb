# config/routes.rb

Rails.application.routes.draw do
  resources :properties, only: [:index, :create, :show, :update, :destroy]
end