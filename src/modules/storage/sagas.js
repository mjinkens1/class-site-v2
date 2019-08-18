import { put, takeLatest, all, call } from 'redux-saga/effects'
import {
    actions,
    addFilesSuccess,
    addFilesFailed,
    deleteFilesSuccess,
    deleteFilesFailed,
    getFilesSuccess,
    getFilesFailed,
    getFilePreviewsSuccess,
    getFilePreviewsFailed,
} from './actions'
import _ from 'lodash-uuid'
import { storage } from '../../config/firebase'

const base64ToBlob = (base64Data, contentType) => {
    const toStrip = `data:${contentType};base64,`
    const byteCharacters = atob(base64Data.replace(toStrip, ''))

    var byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512)
        let byteNumbers = new Array(slice.length)

        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers)

        byteArrays.push(byteArray)
    }

    var blob = new Blob(byteArrays, { type: contentType })
    return blob
}

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

            const fileData = yield call(getFileData, file)
            const blob = base64ToBlob(fileData, file.type)

            const storageRef = storage.ref(`${bucket}/${file.name}`)
            try {
                yield call([storageRef, storageRef.put], blob)
            } catch (error) {
                console.error(error)
            }

            update[file.name] = {
                id: _.uuid(),
                name: file.name,
                type: file.type,
                saved: true,
                preview,
            }
        }

        yield put(addFilesSuccess(update, bucket))
    } catch (error) {
        console.error(error)
        yield put(addFilesFailed(error))
    }
}

function* deleteFiles(action) {
    const { files, bucket } = action.payload

    let deletedFiles = []

    try {
        for (let i = 0; i < files.length; ++i) {
            const file = files[i]

            const storageRef = storage.ref(`${bucket}/${file}`)

            yield call([storageRef, storageRef.delete])

            deletedFiles[i] = file
        }

        yield put(deleteFilesSuccess(deletedFiles, bucket))
    } catch (error) {
        yield put(deleteFilesFailed(error, deletedFiles))
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

            const { name, contentType, id } = yield call([ref, ref.getMetadata])

            const url = yield call([ref, ref.getDownloadURL])

            const preview =
                contentType === 'application/pdf'
                    ? url + '#toolbar=0&navpanes=0'
                    : url

            files[name] = {
                id,
                name,
                type: contentType,
                saved: true,
                preview,
                url: yield call([ref, ref.getDownloadURL]),
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

function* deleteFilesWatcher() {
    yield takeLatest(actions.DELETE_FILES, deleteFiles)
}

function* getFilesWatcher() {
    yield takeLatest(actions.GET_FILES, getFiles)
}

function* getFilePreviewsWatcher() {
    yield takeLatest(actions.GET_FILE_PREVIEWS, getFilePreviews)
}

export default function* storageSaga() {
    yield all([
        addFilesWatcher(),
        deleteFilesWatcher(),
        getFilesWatcher(),
        getFilePreviewsWatcher(),
    ])
}
