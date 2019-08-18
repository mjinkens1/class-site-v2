import { Map, fromJS } from 'immutable'
import { actions } from './actions'

const intialState = Map({
    gettingRSSVideo: false,
    rssVideo: null,
    gettingRSSWOD: false,
    rssWOD: null,
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

        case actions.GET_RSS_VIDEO_FAILED: {
            return state.set('gettingRSSVideo', false)
        }

        case actions.GET_RSS_WOD: {
            return state.set('gettingRSSWOD', true)
        }

        case actions.GET_RSS_WOD_SUCCESS: {
            return state.merge({
                rssWOD: fromJS(payload),
                gettingRSSWOD: false,
            })
        }

        case actions.GET_RSS_WOD_FAILED: {
            return state.set('gettingRSSWOD', false)
        }

        default:
            return state
    }
}
