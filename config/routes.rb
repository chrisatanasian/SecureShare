Rails.application.routes.draw do
  resources :posts, only: [:create, :show], param: :slug
end
