export const api = (url, method, body, options) => {
    if (process.env.NODE_ENV === 'development')
        console.log('api', `${url}\n${method}\n${body}\n${options}`)

    return fetch(url, {
        method,
        body: JSON.stringify(body),
        ...options,
    })
}
