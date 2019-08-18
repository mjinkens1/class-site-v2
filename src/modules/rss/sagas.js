import { put, takeLatest, all, call } from 'redux-saga/effects'
import { api } from '../../config/api'
import { rssVideoURL, rssWODURL } from '../../constants'
import {
    actions,
    getRSSVideoSuccess,
    getRSSVideoFailed,
    getRSSWODSuccess,
    getRSSWODFailed,
} from './actions'
import { mapWOD } from '../../util'

function* getRSSVideo() {
    try {
        const response = yield call(api, rssVideoURL)

        const rssVideo = yield response.json()

        yield put(getRSSVideoSuccess(rssVideo))
    } catch (error) {
        console.error(error)
        yield put(getRSSVideoFailed())
    }
}

function* getRSSWOD() {
    try {
        const response = yield call(api, rssWODURL)

        const rssWOD = yield response.json()

        const withMappedDescription = {
            ...rssWOD,
            description: mapWOD(rssWOD),
        }

        yield put(getRSSWODSuccess(withMappedDescription))
    } catch (error) {
        console.error(error)
        yield put(getRSSWODFailed())
    }
}

function* getRssVideoWatcher() {
    yield takeLatest(actions.GET_RSS_VIDEO, getRSSVideo)
}

function* getRssWODWatcher() {
    yield takeLatest(actions.GET_RSS_WOD, getRSSWOD)
}

export default function* rssVideo() {
    yield all([getRssVideoWatcher(), getRssWODWatcher()])
}
