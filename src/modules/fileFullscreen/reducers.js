import { Map, fromJS } from 'immutable'
import { actions } from './actions'

const intialState = Map({
    fullscreenFile: null,
})

export default (state = intialState, action) => {
    const { type, payload } = action

    switch (type) {
        case actions.SET_FULLSCREEN_FILE: {
            return state.set('fullscreenFile', fromJS(payload))
        }

        default:
            return state
    }
}
