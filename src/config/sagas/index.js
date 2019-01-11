import { all } from 'redux-saga/effects'
import homeSaga from '../../containers/home/sagas'
import headerSaga from '../../containers/header/sagas'

export default function* rootSaga() {
    yield all([homeSaga(), headerSaga()])
}
