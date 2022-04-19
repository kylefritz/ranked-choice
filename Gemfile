source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.5'

gem 'activeadmin' # admin ui
gem 'ahoy_matey'
gem 'bcrypt', '~> 3.1.7' # for devise
gem 'blazer'
gem 'bootsnap', '>= 1.4.2', require: false # Reduces boot times through caching; required in config/boot.rb
gem 'bootstrap', '~> 4.3.1' # nice style
gem 'devise' # for authentication
gem 'image_processing', '~> 1.2' # Use Active Storage variant
gem 'jbuilder', '~> 2.7' # Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'mimemagic', github: 'mimemagicrb/mimemagic', ref: '01f92d86d15d85cfd0f20dabd025dcbd36a8a60f'
gem 'newrelic_rpm' # debugging to new relic
gem 'olive_branch' # convert snake_case to camelCase for json
gem 'paper_trail' # audits
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.12' # web/app server
gem 'rails-settings-cached', "~> 2.0" # app settings stored in database
gem 'rails', '~> 6.0.0'
gem 'sass-rails', '~> 5' # css
gem 'sentry-raven' # debugging to sentry.io
gem 'webpacker', '~> 4.0' # compiles javascript

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'web-console', '>= 3.3.0' # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring' # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  gem 'capybara', '>= 2.15' # Adds support for Capybara system testing and selenium driver
  gem 'selenium-webdriver'
  gem 'webdrivers' # Easy installation and use of web drivers to run system tests with browsers
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
