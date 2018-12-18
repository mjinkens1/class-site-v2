export const actions = {
    GET_RSS_DATA: 'GET_RSS_DATA',
    GET_RSS_DATA_SUCCESS: 'GET_RSS_DATA_SUCCESS',
    GET_RSS_DATA_FAILED: 'GET_RSS_DATA_FAILED',
}

export const getRSSData = () => ({
    type: actions.GET_RSS_DATA,
})

export const getRSSDataSuccess = data => ({
    type: actions.GET_RSS_DATA_SUCCESS,
    payload: data,
})

export const getRSSDataFailed = () => ({
    type: actions.GET_RSS_DATA_FAILED,
})
