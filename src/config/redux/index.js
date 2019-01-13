import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import authentication from '../../modules/authentication/reducers'
import database from '../../modules/database/reducers'
import rssVideo from '../../modules/rssVideo/reducers'

import rootSaga from '../sagas'

const rootReducer = combineReducers({
    authentication,
    database,
    rssVideo,
})

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)
