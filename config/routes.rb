Rails.application.routes.draw do
  get 'products/index'

  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  resources :recipe
  resources :catalogs
  resources :users

  get 'home/index'

  root 'sessions#new'
end
