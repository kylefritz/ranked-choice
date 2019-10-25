Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  devise_for :users
  
  root to: 'home#show'

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

  # sign in
  get '/auth' => redirect('/users/sign_in')
  get '/login' => redirect('/users/sign_in')
  get '/signin' => redirect('/users/sign_in')

  # sign out
  get '/logout' => redirect('/signout')
  get '/signout' => 'home#signout'
end
