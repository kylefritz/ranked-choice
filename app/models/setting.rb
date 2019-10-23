# RailsSettings Model
class Setting < RailsSettings::Base
  cache_prefix { "v1" }

  field :voting_enabled, default: true, type: :boolean
  field :results_enabled, default: true, type: :boolean
  field :questions_enabled, default: true, type: :boolean

  # Define your fields
  # field :host, type: :string, default: "http://localhost:3000"
  # field :admin_emails, default: "admin@rubyonrails.org", type: :array
end
