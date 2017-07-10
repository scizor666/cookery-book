Rails.application.routes.draw do
  resources :recipe
  resources :catalogs

  get 'home/index'

  root 'catalogs#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
