import { all } from 'redux-saga/effects'
import authentication from '../../modules/authentication/sagas'
import database from '../../modules/database/sagas'
import rssVideo from '../../modules/rssVideo/sagas'

export default function* rootSaga() {
    yield all([authentication(), database(), rssVideo()])
}
