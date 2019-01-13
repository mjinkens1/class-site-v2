import { Map, fromJS } from 'immutable'
import { actions } from './actions'

const intialState = Map({
    updatingDb: false,
    updateDbFailed: false,
})

export default (state = intialState, action) => {
    const { type, payload } = action

    switch (type) {
        case actions.GET_DOCS_FROM_DB: {
            return state.set(`gettingDocsFromDb-${payload.target}`, true)
        }

        case actions.GET_DOCS_FROM_DB_SUCCESS: {
            return state.merge({
                [`docs-${payload.target}`]: fromJS(payload.docs),
                [`gettingDocsFromDb-${payload.target}`]: false,
            })
        }

        case action.GET_DOCS_FROM_DB_FAILED: {
            return state.set(`gettingDocsFromDb-${payload.target}`, false)
        }

        case actions.UPDATE_DB: {
            return state.merge({
                updatingDb: true,
                updateDbFailed: false,
            })
        }

        case actions.UPDATE_DB_SUCCESS: {
            return state.merge({
                updatingDb: false,
                updateDbFailed: false,
            })
        }

        case actions.UPDATE_DB_FAILED: {
            return state.merge({
                updatingDb: false,
                updateDbFailed: true,
            })
        }

        default:
            return state
    }
}
