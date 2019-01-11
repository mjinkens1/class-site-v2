export const actions = {
    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILED: 'LOGIN_FAILED',
    LOGOUT: 'LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAILED: 'LOGOUT_FAILED',
    UPDATE_AUTH: 'UPDATE_AUTH',
}

export const login = (email, password) => ({
    type: actions.LOGIN,
    payload: {
        email,
        password,
    },
})

export const loginSuccess = user => ({
    type: actions.LOGIN_SUCCESS,
    payload: user,
})

export const loginFailed = error => ({
    type: actions.LOGIN_FAILED,
    payload: error,
})

export const logout = () => ({
    type: actions.LOGOUT,
})

export const logoutSuccess = () => ({
    type: actions.LOGOUT_SUCCESS,
})

export const logoutFailed = () => ({
    type: actions.LOGOUT_FAILED,
})

export const updateAuth = user => ({
    type: actions.UPDATE_AUTH,
    payload: user,
})
