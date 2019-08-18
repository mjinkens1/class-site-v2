import isEqual from 'react-fast-compare'

export const filesToArray = (files, history) => {
    const filesObject = files[toKebabCase(history.location.pathname)]
    const filesArray = filesObject ? Object.values(filesObject) : []

    return filesArray
}

export const fromKebabCase = string => string.split('-').join(' ')

export const getTitleFromRoute = routeName => {
    if (routeName === '/home' || routeName === '/404') return ''

    if (routeName.includes('%')) {
        return routeName.split('%')[0].split('/')[2]
    }

    return routeName
        .toLowerCase()
        .replace('/', '')
        .split('-')
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

export const getFileIcon = fileType => {
    switch (fileType) {
        default:
            // https://materialdesignicons.com - file
            return 'M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z'
    }
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

export const toKebabCase = string =>
    string
        .split(' ')
        .join('-')
        .toLowerCase()

export { isEqual }
