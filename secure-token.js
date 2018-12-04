import jwt from 'jwt-ed25519-tn'
import nacl from 'tweetnacl'
//import {Buffer} from 'safe-buffer'

const generateKeyPair = () => {
    return nacl.sign.keyPair()
}

const generateSecureToken = (payload, headers, keyPair) => {
    return jwt.sign(payload, keyPair, {algorithm: 'Ed25519', ...headers})
}

const verifySecureToken = (token, keyPair) => {
    try {
        return jwt.verify(token, keypair, {algorithm: 'Ed25519'})
    } catch ex {
        throw `invalid token`
    }
}

export {generateKeyPair, generateSecureToken, verifySecureToken}
