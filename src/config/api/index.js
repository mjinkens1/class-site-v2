export const api = (url, method, body, options) => {
    if (process.env.NODE_ENV === 'development') {
        console.group('api request')
        console.log('url: ', url)
        console.log('method: ', method)
        console.log('body: ', body)
        console.log('options: ', options)
        console.groupEnd()
    }

    return fetch(url, {
        method,
        body: JSON.stringify(body),
        ...options,
    })
}
