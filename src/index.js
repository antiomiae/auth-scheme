import * as requests from './requests'
import nacl from 'tweetnacl/nacl-fast'
import {fromByteArray as b64encode} from 'base64-js'
import axios from 'axios'
import buildURL from 'axios/lib/helpers/buildURL'

console.log(axios)

const key = nacl.sign.keyPair()

let request = {
    body: JSON.stringify({email: '1@2.com', password: 'p#2ds$wood', public_key: b64encode(key.publicKey)}),
    url: 'http://localhost:9292/login?param1=1&param2=2',
    method: 'POST',
    headers: {}
}

let signature = requests.signRequest(request, key.secretKey)

request.headers['Authorization'] = 'RAS-V1 ' + signature

fetch(request.url, request)
