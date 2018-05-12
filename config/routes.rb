Rails.application.routes.draw do
 root 'messages#index'
 resource :messages, only: [:index]
end
