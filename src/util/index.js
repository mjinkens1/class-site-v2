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
    if (routeName !== '/home' && routeName !== '/404') return 'header--red'
    else return 'header--home'
}

export const mapWOD = wod => {
    const desc = wod.description[0].split(/[0-9]/)

    return desc.map((item, index) => {
        if (index > 0) return `${index}${item}`
        else return item
    })
}

export const getMonthAndYearFromDate = date =>
    date
        .toString()
        .split(' ')
        .slice(1, 4)
        .reduce((acc, val, index) => {
            return acc + (index === 1 ? '' : val)
        }, '')
        .toLowerCase()

export const getDayMonthYearFromDate = date =>
    date
        .toString()
        .split(' ')
        .slice(1, 4)
        .reduce((acc, val, index) => {
            return acc + val
        }, '')
        .toLowerCase()
