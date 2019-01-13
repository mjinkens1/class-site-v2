export const actions = {
    GET_DOCS_FROM_DB: 'GET_DOCS_FROM_DB',
    GET_DOCS_FROM_DB_SUCCESS: 'GET_DOCS_FROM_DB_SUCCESS',
    GET_DOCS_FROM_DB_FAILED: 'GET_DOCS_FROM_DB_FAILED',
    UPDATE_DB: 'UPDATE_DB',
    UPDATE_DB_SUCCESS: 'UPDATE_DB_SUCCESS',
    UPDATE_DB_FAILED: 'UPDATE_DB_FAILED',
}

export const getDocsFromDb = (ref, target) => ({
    type: actions.GET_DOCS_FROM_DB,
    payload: {
        ref,
        target,
    },
})

export const getDocsFromDbSuccess = (docs, target) => ({
    type: actions.GET_DOCS_FROM_DB_SUCCESS,
    payload: {
        docs,
        target,
    },
})

export const getDocsFromDbFailed = (error, target) => ({
    type: actions.GET_DOCS_FROM_DB_FAILED,
    payload: {
        error,
        target,
    },
})

export const updateDb = (ref, data) => ({
    type: actions.UPDATE_DB,
    payload: {
        ref,
        data,
    },
})

export const updateDbSuccess = () => ({
    type: actions.UPDATE_DB_SUCCESS,
})

export const updateDbFailed = error => ({
    type: actions.UPDATE_DB_FAILED,
    payload: error,
})
