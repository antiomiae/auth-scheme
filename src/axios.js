import buildURL from 'axios/lib/helpers/buildURL'
import {signRequest} from 'requests'
import {fromByteArray as encode64} from 'base64-js'

const buildInterceptor = (key) => {
    return (config) => {
        const url = buildURL(config.url, config.params, config.paramsSerialzier)

        const signature = signRequest({
            method: config.method,
            url,
            body: config.data || '',
            secretKey: key.secretKey || key
        })

        config.headers['X-RAS-SIGNATURE'] = `RAS-V1 ${encode64(signature)}`
    }
}
