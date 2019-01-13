import { put, takeLatest, all, call } from 'redux-saga/effects'
import {
    actions,
    loginSuccess,
    loginFailed,
    logoutSuccess,
    logoutFailed,
} from './actions'
import { auth } from '../../config/firebase'

function* login(action) {
    const { email, password } = action.payload

    try {
        const response = yield call(
            [auth, auth.signInWithEmailAndPassword],
            email,
            password
        )

        yield put(loginSuccess(response.user))
    } catch (error) {
        yield put(loginFailed(error.code))
    }
}

function* logout() {
    try {
        yield call([auth, auth.signOut])

        yield put(logoutSuccess())
    } catch (error) {
        yield put(logoutFailed())
    }
}

function* loginWatcher() {
    yield takeLatest(actions.LOGIN, login)
}

function* logoutWatcher() {
    yield takeLatest(actions.LOGOUT, logout)
}

export default function* authentication() {
    yield all([loginWatcher(), logoutWatcher()])
}
