Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  devise_for :users
  
  root to: "home#show"

  resources :candidates
  resources :questions
  resources :votes
  resources :results
end
