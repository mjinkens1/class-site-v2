import { put, takeLatest, all, call } from 'redux-saga/effects'
import {
    actions,
    addFilesSuccess,
    addFilesFailed,
    getFilesSuccess,
    getFilesFailed,
    getFilePreviewsSuccess,
    getFilePreviewsFailed,
} from './actions'
import { storage } from '../../config/firebase'
// import { toJS } from 'immutable'

const getFileData = file =>
    new Promise((res, rej) => {
        const reader = new FileReader()

        reader.onabort = () => rej('File reading was aborted')
        reader.onerror = () => rej('File reading has failed')

        reader.onload = () => {
            const { result } = reader

            res(result)
        }

        reader.readAsDataURL(file)
    })

function* addFiles(action) {
    const { files, bucket } = action.payload

    try {
        let update = {}

        for (let i = 0; i < files.length; ++i) {
            const fileObj = files[i]
            const { preview, file } = fileObj

            // const preview = yield call(getFileData, file)

            const customMetadata = {
                preview,
            }

            const storageRef = storage.ref(`${bucket}/${file.name}`)

            yield call([storageRef, storageRef.put], file, { customMetadata })

            update[file.name] = {
                name: file.name,
                type: file.type,
                preview,
            }
        }

        yield put(addFilesSuccess(update, bucket))
    } catch (error) {
        console.error(error)
        yield put(addFilesFailed(error))
    }
}

function* getFiles(action) {
    const bucket = action.payload

    try {
        const storageRef = storage.ref()
        const listRef = storageRef.child(bucket)

        const { items: fileRefs } = yield call([listRef, listRef.list], {
            maxResults: 100,
        })

        let files = {}

        for (let i = 0; i < fileRefs.length; ++i) {
            const ref = fileRefs[i]

            const { customMetadata, name, type } = yield call([
                ref,
                ref.getMetadata,
            ])

            files[name] = {
                ...customMetadata,
                name,
                type,
            }
        }

        yield put(getFilesSuccess(files, bucket))
    } catch (error) {
        console.error(error)
        yield put(getFilesFailed(error))
    }
}

function* getFilePreviews(action) {
    const files = action.payload

    const filesWithPreview = []

    try {
        for (let i = 0; i < files.length; ++i) {
            const file = files[i]

            const preview = yield call(getFileData, file)
            const { name, type } = file

            filesWithPreview.push({ file, name, type, preview })
        }

        yield put(getFilePreviewsSuccess(filesWithPreview))
    } catch (error) {
        console.error(error)
        yield put(getFilePreviewsFailed(error))
    }
}

function* addFilesWatcher() {
    yield takeLatest(actions.ADD_FILES, addFiles)
}

function* getFilesWatcher() {
    yield takeLatest(actions.GET_FILES, getFiles)
}

function* getFilePreviewsWatcher() {
    yield takeLatest(actions.GET_FILE_PREVIEWS, getFilePreviews)
}

export default function* storageSaga() {
    yield all([addFilesWatcher(), getFilesWatcher(), getFilePreviewsWatcher()])
}
