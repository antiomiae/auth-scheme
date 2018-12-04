import jwt from 'jwt-ed25519-tn'

const ENDPOINT = 'http://localhost:9292/login'

const login = (credentials, keyPair) => {
    const token = keyPair.signedPublicKeyToken()
    console.log(jwt.decode(token))
    fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...credentials,
            publicKeyToken: token
        })
    })
}

export default login
