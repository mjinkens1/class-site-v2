import { put, takeLatest, all, call } from 'redux-saga/effects'
import { api } from '../../config/api'
import { rssURL } from '../../constants'
import { actions, getRSSDataSuccess, getRSSDataFailed } from './actions'

function* getRSSData() {
    try {
        const rssData = yield call(api, rssURL)
        console.log('rss data', rssData)
        yield put(getRSSDataSuccess(rssData))
    } catch (error) {
        yield put(getRSSDataFailed())
    }
}

function* getRssDataWatcher() {
    yield takeLatest(actions.GET_RSS_DATA, getRSSData)
}

export default function* home() {
    yield all([getRssDataWatcher()])
}
