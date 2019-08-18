export const actions = {
    SET_FULLSCREEN_FILE: 'SET_FULLSCREEN_FILE',
}

export const setFullscreenFile = (name, type, url = true) => ({
    type: actions.SET_FULLSCREEN_FILE,
    payload: {
        name,
        type,
        url,
    },
})
