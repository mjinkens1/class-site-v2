import { Map, fromJS } from 'immutable'
import { actions } from './actions'

const intialState = Map({
    loggingIn: false,
    loginError: null,
    user: null,
})

export default (state = intialState, action) => {
    const { type, payload } = action

    switch (type) {
        case actions.LOGIN: {
            return state.set('loggingIn', true)
        }

        case actions.LOGIN_SUCCESS: {
            return state.merge({
                user: fromJS(payload),
                loggingIn: false,
                loginError: null,
            })
        }

        case actions.LOGIN_FAILED: {
            const errorMessage = (() => {
                switch (payload) {
                    case 'auth/invalid-email':
                        return 'Invalid email/password'

                    case 'auth/user-disabled':
                        return 'Account disabled, please contact administrator'

                    case 'auth/user-not-found':
                        return 'Invalid email/password'

                    case 'auth/wrong-password':
                        return 'Invalid email/password'

                    default:
                        return ''
                }
            })()

            return state.merge({
                user: null,
                loginError: errorMessage,
                loggingIn: false,
            })
        }

        case actions.UPDATE_AUTH: {
            return state.set('user', fromJS(payload))
        }

        default:
            return state
    }
}
