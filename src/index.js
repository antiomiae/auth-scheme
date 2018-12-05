import sodium from 'libsodium-wrappers'

(async (console) => {
    await sodium.ready

    console.time('gen keypair')
    const keypair = sodium.crypto_sign_keypair()
    console.timeEnd('gen keypair')
})(console)
