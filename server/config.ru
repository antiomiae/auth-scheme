require_relative 'app/app'
require 'rack/cors'

use Rack::Cors do
    allow do
      origins '*'

      resource '*', headers: :any, methods: [:get, :post, :options]
    end
end

run App.freeze.app
