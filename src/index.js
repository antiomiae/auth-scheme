import randomText from 'random_text.txt'
import * as requests from './requests'
import nacl from 'tweetnacl/nacl-fast'

const key = nacl.sign.keyPair()

console.time('signature')
let signature = requests.signRequest({method: 'POST', url: 'http://www.site.com/path/to/resource?q=1&z=2', headers: {}}, key.secretKey)
console.timeEnd('signature')

console.log(signature)
console.log(requests.encodeHex(signature))

console.log(requests.decodeUTF8Array(signature))
