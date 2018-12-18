import { Map, fromJS } from 'immutable'
import { actions } from './actions'

const intialState = Map({
    gettingRSSData: false,
    rssData: null,
})

export default (state = intialState, action) => {
    const { type, payload } = action

    switch (type) {
        case action.GET_RSS_DATA: {
            return state.set('gettingRSSData', true)
        }

        case actions.GET_RSS_DATA_SUCCESS: {
            return state.merge({
                rssData: fromJS(payload),
                gettingRSSData: false,
            })
        }

        case action.GET_RSS_DATA_FAILED: {
            return state.set('gettingRSSData', false)
        }

        default:
            return state
    }
}
