export const actions = {
    GET_RSS_VIDEO: 'GET_RSS_VIDEO',
    GET_RSS_VIDEO_SUCCESS: 'GET_RSS_VIDEO_SUCCESS',
    GET_RSS_VIDEO_FAILED: 'GET_RSS_VIDEO_FAILED',
    GET_RSS_WOD: 'GET_RSS_WOD',
    GET_RSS_WOD_SUCCESS: 'GET_RSS_WOD_SUCCESS',
    GET_RSS_WOD_FAILED: 'GET_RSS_WOD_FAILED',
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

export const getRSSWOD = () => ({
    type: actions.GET_RSS_WOD,
})

export const getRSSWODSuccess = data => ({
    type: actions.GET_RSS_WOD_SUCCESS,
    payload: data,
})

export const getRSSWODFailed = () => ({
    type: actions.GET_RSS_WOD_FAILED,
})
