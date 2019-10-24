Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  devise_for :users
  
  root to: "home#show"

  resources :candidates
  resources :questions do
    member do 
      post 'vote'
      post 'dismiss'  
    end
  end
  resources :votes
  resources :results

  resources 'settings' do
    collection do
      post 'questions'
      post 'voting'
      post 'results'
    end
  end
end
