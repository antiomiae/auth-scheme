import * as tn from 'tweetnacl-ts'

(async (console) => {
    console.time('gen keypair')
    const keypair = tn.sign_keyPair()
    console.timeEnd('gen keypair')

    console.log(keypair)

    console.time('signature')
    const signature = tn.sign(tn.decodeUTF8('this is the message to sign'), keypair.secretKey)
    console.timeEnd('signature')

    console.log(tn.encodeHex(signature))

    console.time('signature')
    const verified = tn.sign_open(signature, keypair.publicKey)
    console.timeEnd('signature')

    console.log(tn.encodeUTF8(verified))

})(console)
