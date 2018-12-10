import nacl from 'tweetnacl/nacl-fast'
import * as b64 from 'base64-js'

export function decodeUTF8Array(a) {
    return (new TextDecoder('utf-8')).decode(a)
}

export function encodeString(s) {
    return (new TextEncoder()).encode(s)
}

export function encodeHex(a) {
    const b = new Uint8Array(a.length << 1);

    function put_hb(h) {
        return h + (h < 10 ? 48 : 87);
    }

    for (let i = 0, j; i < a.length; i++) {
        j = i << 1;
        b[j] = put_hb(a[i] >> 4);
        b[j + 1] = put_hb(a[i] & 0xf);
    }

    return String.fromCharCode.apply(undefined, b);
}


// Returns signature for request
export const signRequest = (request = {method, url, body, headers}, secretKey) => {
    const message = getCanonicalRequestString(request)
    console.log(message)
    const signature = nacl.sign.detached(encodeString(message), secretKey)
    return b64.fromByteArray(signature)
}

export const getCanonicalRequestString = (request) => {
    const url = new URL(request.url)
    let contentHash, contentArray

    if (request.body && typeof request.body === 'string') {
        contentArray = encodeString(request.body)
    } else {
        contentArray = request.body || new Uint8Array(0)
    }

    contentHash = encodeHex(nacl.hash(contentArray))

    const str = request.method + '\n' +
                url.origin + '\n' + // might need to use host instead
                url.pathname + '\n' +
                url.search + '\n' +
                contentHash + '\n'

    return str
}
