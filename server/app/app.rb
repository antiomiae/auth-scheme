require 'roda'
require 'securerandom'
require 'jwt'
require 'base64'
require 'rbnacl'

APP_SECRET = SecureRandom.random_bytes(32)

require 'pry'

module SignedRequests
  module Verify
    class Request
      def initialize(env)
        @env = env
      end

      def verify(verification_key)
        canonical_request
      end
    end

    module SignedVerificationKey
      def self.verify()
      end
    end
  end

  module Sign
    class Request
    end
  end
end

def canonical_request(r)
  content = r.body.string
  url = URI.parse(r.url)
  "#{r.request_method}\n" +
  "#{url.scheme}://#{url.hostname}#{":#{url.port}" unless url.port == url.default_port}\n" +
  "#{url.path}\n" +
  "?#{url.query}\n" +
  RbNaCl::Hash::sha512(content).unpack('H*')[0] + "\n"
end



class App < Roda
  plugin :json_parser
  plugin :json
  plugin :request_headers

  route do |r|
    r.on 'login' do
      r.is do
        r.post do
          payload = JSON.parse(r.body.string)

          client_public_key = Base64.decode64(payload['public_key'])

          auth_header = r.headers['Authorization']

          if /^RAS-V1 .+/.match?(auth_header)
            scheme, signature = auth_header.split(' ', 2)

            signature = Base64.decode64(signature)

            message = canonical_request(r)

            puts message

            verify_key = RbNaCl::VerifyKey.new(client_public_key)

            unless verify_key.verify(signature, message)
              raise "Failed to verify request"
            end
          end
        end
      end
    end

    r.on '*' do
     {}
    end
  end
end
