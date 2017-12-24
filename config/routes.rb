Rails.application.routes.draw do
  devise_for :users

  resources :maps

  devise_scope :user do
    authenticated :user do
      root to: 'maps#index', as: :authenticated_root
    end

    unauthenticated do
      root to: 'devise/sessions#new', as: :unauthenticated_root
    end
  end
end
