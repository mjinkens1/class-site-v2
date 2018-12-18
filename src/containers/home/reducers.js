import { Map, fromJS } from 'immutable'
import { actions } from './actions'

const intialState = Map({
    gettingRSSVideo: false,
    rssData: null,
})

export default (state = intialState, action) => {
    const { type, payload } = action

    switch (type) {
        case action.GET_RSS_VIDEO: {
            return state.set('gettingRSSVideo', true)
        }

        case actions.GET_RSS_VIDEO_SUCCESS: {
            return state.merge({
                rssVideo: fromJS(payload),
                gettingRSSVideo: false,
            })
        }

        case action.GET_RSS_VIDEO_FAILED: {
            return state.set('gettingRSSVideo', false)
        }

        default:
            return state
    }
}
