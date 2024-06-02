source 'http://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.2'
# Use Puma as the app server
gem 'puma'
gem 'mongoid-grid_fs'
gem 'bcrypt'
gem 'pdf-reader'
# Use SCSS for stylesheets
gem 'sass-rails'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder'
gem 'rubyzip', '>= 1.0.0' # will load new rubyzip version
# gem 'zip-zip'
# Use Redis adapter to run Action Cable in production
# gem 'redis'
# Use ActiveModel has_secure_password
# gem 'bcrypt'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# gem 'descriptive_statistics'
gem 'mongoid'
gem 'mongo'
gem 'bson_ext'
gem 'highcharts-rails'
gem 'descriptive_statistics'

gem 'angularjs-rails'
gem 'angular_rails_csrf'
source 'http://insecure.rails-assets.org/' do
gem 'rails-assets-angular-route'
gem 'rails-assets-angular-ui-select'
gem 'rails-assets-angular-ui-utils'
gem 'rails-assets-oclazyload'
gem 'rails-assets-angular-loading-bar'
gem 'rails-assets-angular-animate'
gem 'rails-assets-angular-touch'
gem 'rails-assets-ngstorage'
gem 'rails-assets-angular-cookie'
gem 'rails-assets-angular-bootstrap'
end
group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'browser'
  gem 'listen'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen'
  gem 'web-console'


end


# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
