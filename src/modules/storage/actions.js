export const actions = {
    ADD_FILES: 'ADD_FILES',
    ADD_FILES_SUCCESS: 'ADD_FILES_SUCCESS',
    ADD_FILES_FAILED: 'ADD_FILES_FAILED',
    DELETE_FILES: 'DELETE_FILES',
    DELETE_FILES_SUCCESS: 'DELETE_FILES_SUCCESS',
    DELETE_FILES_FAILED: 'DELETE_FILES_FAILED',
    GET_FILES: 'GET_FILES',
    GET_FILES_SUCCESS: 'GET_FILES_SUCCESS',
    GET_FILES_FAILED: 'GET_FILES_FAILED',
    GET_FILE_PREVIEWS: 'GET_FILE_PREVIEWS',
    GET_FILE_PREVIEWS_SUCCESS: 'GET_FILE_PREVIEWS_SUCCESS',
    GET_FILE_PREVIEWS_FAILED: 'GET_FILE_PREVIEWS_FAILED',
    CLEAR_FILE_PREVIEWS: 'CLEAR_FILE_PREVIEWS',
}

export const addFiles = (files, bucket) => ({
    type: actions.ADD_FILES,
    payload: {
        files: Array.isArray(files) ? files : [files],
        bucket,
    },
})

export const addFilesSuccess = (files, bucket) => ({
    type: actions.ADD_FILES_SUCCESS,
    payload: {
        files,
        bucket,
    },
})

export const addFilesFailed = error => ({
    type: actions.ADD_FILES_FAILED,
    payload: error,
})

export const deleteFiles = (files, bucket) => ({
    type: actions.DELETE_FILES,
    payload: {
        files: Array.isArray(files) ? files : [files],
        bucket,
    },
})

export const deleteFilesSuccess = (files, bucket) => ({
    type: actions.DELETE_FILES_SUCCESS,
    payload: {
        files,
        bucket,
    },
})

export const deleteFilesFailed = (error, deletedFiles) => ({
    type: actions.DELETE_FILES_FAILED,
    payload: {
        error,
        deletedFiles,
    },
})

export const getFiles = bucket => ({
    type: actions.GET_FILES,
    payload: bucket,
})

export const getFilesSuccess = (files, bucket) => ({
    type: actions.GET_FILES_SUCCESS,
    payload: {
        files,
        bucket,
    },
})

export const getFilesFailed = error => ({
    type: actions.GET_FILES_FAILED,
    payload: error,
})

export const getFilePreviews = files => ({
    type: actions.GET_FILE_PREVIEWS,
    payload: files,
})

export const getFilePreviewsSuccess = files => ({
    type: actions.GET_FILE_PREVIEWS_SUCCESS,
    payload: files,
})

export const getFilePreviewsFailed = error => ({
    type: actions.GET_FILE_PREVIEWS_FAILED,
    payload: error,
})

export const clearFilePreviews = () => ({
    type: actions.CLEAR_FILE_PREVIEWS,
})
