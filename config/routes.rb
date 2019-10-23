Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  devise_for :users
  
  root to: "home#show"

  resources :candidates
  resources :questions do
    post 'vote', on: :member
  end
  resources :votes
  resources :results
end
