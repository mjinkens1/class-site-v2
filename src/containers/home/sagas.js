import { put, takeLatest, all, call } from 'redux-saga/effects'
import { api } from '../../config/api'
import { rssURL } from '../../constants'
import { actions, getRSSVideoSuccess, getRSSVideoFailed } from './actions'

function* getRSSVideo() {
    try {
        const response = yield call(api, rssURL)
        
        const rssVideo = yield response.json()

        yield put(getRSSVideoSuccess(rssVideo))
    } catch (error) {
        yield put(getRSSVideoFailed())
    }
}

function* getRssVideoWatcher() {
    yield takeLatest(actions.GET_RSS_VIDEO, getRSSVideo)
}

export default function* home() {
    yield all([getRssVideoWatcher()])
}
