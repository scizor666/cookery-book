Rails.application.routes.draw do
  get 's3/sign'

  get 'products/index'

  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  resources :catalogs do
    resources :recipe
  end
  resources :users

  get 'home/index'

  root 'sessions#new'
end
