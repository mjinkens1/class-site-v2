import { List, Map, fromJS } from 'immutable'
import { actions } from './actions'

const intialState = Map({
    addingFile: false,
    addFileError: null,
    files: Map({}),
    gettingFiles: false,
    getFilesError: null,
    filePreviews: List([]),
    gettingFilePreviews: false,
    getFilePreviewsError: null,
})

export default (state = intialState, action) => {
    const { type, payload } = action

    switch (type) {
        case actions.ADD_FILES: {
            const { files, bucket } = payload

            // We are adding the files to the UI immediately and setting the icon to a loader while uploading them to Firebase
            const update = files.reduce((acc, file) => {
                const { name } = file

                return { ...acc, [name]: fromJS(file) }
            }, {})

            // Add the files for the particular section to the state if it doesn't exist
            if (!state.getIn(['files', bucket])) {
                return state.merge({
                    addingFile: true,
                    files: Map({
                        [bucket]: fromJS(update),
                    }),
                })
            }

            return state.mergeIn(['files', bucket], fromJS(update))
        }

        case actions.ADD_FILES_SUCCESS: {
            const { files, bucket } = payload

            console.log('ADD FILES UPDATE', files)

            return state.mergeIn(['files', bucket], fromJS(files))
        }

        case actions.ADD_FILES_FAILED: {
            return state.merge({
                addingFile: false,
                addFileError: payload,
            })
        }

        case actions.GET_FILES: {
            return state.set('gettingFiles', true)
        }

        case actions.GET_FILES_SUCCESS: {
            const { files, bucket } = payload

            return state.merge({
                addingFile: true,
                files: Map({
                    [bucket]: fromJS(files),
                }),
            })
        }

        case actions.GET_FILES_FAILED: {
            return state.merge({
                gettingFiles: false,
                getFilesError: payload,
            })
        }

        case actions.GET_FILE_PREVIEWS:
            return state.merge({
                filePreviews: List([]),
                gettingFilePreviews: true,
            })

        case actions.GET_FILE_PREVIEWS_SUCCESS:
            return state.merge({
                gettingFilePreviews: false,
                filePreviews: fromJS(payload),
            })

        case actions.GET_FILE_PREVIEWS_FAILED:
            return state.merge({
                gettingFilePreviews: false,
                getFilePreviewsError: fromJS(payload),
            })

        case actions.CLEAR_FILE_PREVIEWS:
            return state.merge({
                filePreviews: List([]),
            })

        default:
            return state
    }
}
