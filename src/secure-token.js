import jwt from 'jwt-ed25519-tn'
import nacl from 'tweetnacl'
import {Buffer} from 'safe-buffer'

class KeyPair {
    constructor(options = {}) {
        let rawKeys

        if (options.secretKey) {
            rawKeys = nacl.sign.keyPair.fromSecretKey(options.secretKey.key || options.secretKey)
        } else {
            rawKeys = nacl.sign.keyPair()
        }

        this.secretKey = {
            algorithm: 'Ed25519',
            key: Buffer.from(rawKeys.secretKey).toString('base64')
        }
        this.publicKey = {
            algorithm: 'Ed25519',
            key: Buffer.from(rawKeys.publicKey).toString('base64')
        }
    }

    signedPublicKeyToken() {
        return generateSecureToken({public_key: this.publicKey}, undefined, this)
    }
}

const generateKeyPair = () => {
    return new KeyPair()
}

const generateSecureToken = (payload, claims, keyPair) => {
    return jwt.sign(payload, keyPair.secretKey, {algorithm: 'Ed25519', ...claims})
}

const verifySecureToken = (token, keyPair, claims = {}) => {
    try {
        return jwt.verify(token, keyPair.publicKey, {algorithm: 'Ed25519', ...claims})
    } catch (ex) {
        throw ex
    }
}

export {generateKeyPair, generateSecureToken, verifySecureToken, KeyPair}
