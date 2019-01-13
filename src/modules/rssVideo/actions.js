export const actions = {
    GET_RSS_VIDEO: 'GET_RSS_VIDEO',
    GET_RSS_VIDEO_SUCCESS: 'GET_RSS_VIDEO_SUCCESS',
    GET_RSS_VIDEO_FAILED: 'GET_RSS_VIDEO_FAILED',
}

export const getRSSVideo = () => ({
    type: actions.GET_RSS_VIDEO,
})

export const getRSSVideoSuccess = data => ({
    type: actions.GET_RSS_VIDEO_SUCCESS,
    payload: data,
})

export const getRSSVideoFailed = () => ({
    type: actions.GET_RSS_VIDEO_FAILED,
})
