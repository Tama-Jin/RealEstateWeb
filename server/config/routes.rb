# config/routes.rb

Rails.application.routes.draw do
  resources :properties, only: [:index, :create]
end
