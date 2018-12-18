import { all } from 'redux-saga/effects'
import homeSaga from '../../containers/home/sagas'

export default function* rootSaga() {
    yield all([homeSaga()])
}
