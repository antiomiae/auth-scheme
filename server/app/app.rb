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


class App < Roda
    plugin :json_parser
    plugin :json

    route do |r|
        r.on 'login' do
            r.is do
                r.post do
                    params = r.params
                    token = params['publicKeyToken']
                    payload, headers = JWT.decode(token, nil, false)

                    client_public_key = RbNaCl::VerifyKey.new(Base64.decode64(payload.dig('public_key', 'key')))
                    if JWT.decode(token, client_public_key, true, {algorithm: 'ED25519'})
                        puts 'client public key verified'
                    end
                end
            end
        end

        r.on '*' do
            {}
        end
    end
end
