export const getTitleFromRoute = routeName => {
    if (routeName === '/home' || routeName === '/404') return ''

    return routeName
        .toLowerCase()
        .replace('/', '')
        .split(' ')
        .map(string => {
            if (string !== 'of')
                return string.charAt(0).toUpperCase() + string.substring(1)
            else return string
        })
        .join(' ')
}

export const getHeaderClass = routeName => {
    if (routeName !== '/home' && routeName !== '/404') return 'header-red'
    else return ''
}
