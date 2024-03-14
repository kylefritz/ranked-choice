Rails.application.routes.draw do
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

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

  # blazer
  authenticate :user, ->(user) { user.is_admin? } do
    mount Blazer::Engine, at: "blazer"
  end
end
