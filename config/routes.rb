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

  root 'sessions#new'

  get '*path', to: 'application#fallback_index',
               constraints: ->(request) { !request.xhr? && request.format.html? }
end
