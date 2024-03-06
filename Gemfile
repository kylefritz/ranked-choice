source "https://rubygems.org"

ruby "3.2.3"

gem 'activeadmin' # admin ui
gem 'ahoy_matey'
gem 'bcrypt', '~> 3.1.7' # for devise; & Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
gem 'blazer'
gem 'bootstrap', '~> 4.3.1' # nice style
gem 'devise' # for authentication
gem 'newrelic_rpm' # debugging to new relic
gem 'olive_branch' # convert snake_case to camelCase for json
gem 'paper_trail' # audits
gem 'rails-settings-cached', "~> 2.0" # app settings stored in database
gem 'sentry-ruby' # debugging to sentry.io
gem "bootsnap", require: false # Reduces boot times through caching; required in config/boot.rb
gem "importmap-rails" # Use JavaScript with ESM import maps [https://github.com/rails/importmap-rails]
gem "jbuilder" # Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem "pg", "~> 1.1" # Use postgresql as the database for Active Record
gem "puma", ">= 5.0" # Use the Puma web server [https://github.com/puma/puma]
gem "rails", "~> 7.1.3", ">= 7.1.3.2" # Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "sprockets-rails" # The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
gem "stimulus-rails" # Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem "turbo-rails" # Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]

# gem "image_processing", "~> 1.2" # Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "kredis" # Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "redis", ">= 4.0.1" # Use Redis adapter to run Action Cable in production


group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri windows ]
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"
  
  # gem "rack-mini-profiler" # Add speed badges [https://github.com/MiniProfiler/rack-mini-profiler]
  
  # gem "spring" # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem "capybara"
  gem "selenium-webdriver"
end
