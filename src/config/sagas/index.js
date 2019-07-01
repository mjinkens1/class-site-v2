import { all } from 'redux-saga/effects'
import authentication from '../../modules/authentication/sagas'
import database from '../../modules/database/sagas'
import rssVideo from '../../modules/rss/sagas'
import storage from '../../modules/storage/sagas'

export default function* rootSaga() {
    yield all([authentication(), database(), rssVideo(), storage()])
}
