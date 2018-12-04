import {generateKeyPair} from 'secure-token.js'
import login from 'login.js'

const myKeyPair = generateKeyPair()

login({email_address: 'k@t.com', password: 'password'}, myKeyPair)


