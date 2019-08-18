import { put, takeLatest, takeEvery, all, call } from 'redux-saga/effects'
import {
    actions,
    getDocsFromDbSuccess,
    getDocsFromDbFailed,
    updateDbSuccess,
    updateDbFailed,
} from './actions'
import { db } from '../../config/firebase'

function* getDocsFromDb(action) {
    const { ref, target, isCollection } = action.payload

    try {
        const doc = yield call([ref, ref.get])

        if (isCollection) {
            yield put(getDocsFromDbSuccess(doc.docs, target))
        } else {
            const data = doc.data()

            yield put(getDocsFromDbSuccess(data, target))
        }
    } catch (error) {
        console.error(error)
        yield put(getDocsFromDbFailed(error, target))
    }
}

function* updateDb(action) {
    const { ref, data } = action.payload,
        batch = db.batch()

    try {
        const doc = yield call([ref, ref.get])

        if (!doc.docs) {
            if (doc.exists) {
                ref.update(data)
            } else {
                ref.set(data)
            }
        } else {
            const docIds = doc.docs.map(doc => doc.id)

            if (data.length > docIds.length)
                data.forEach(item => {
                    if (docIds.includes(item._id)) {
                        const docRef = ref.doc(item._id)
                        batch.set(docRef, item)
                    } else {
                        const docRef = ref.doc()
                        batch.set(docRef, item, { merge: true })
                    }
                })
            else {
                const dataIds = data.map(item => item._id),
                    docsIdsToDelete = docIds.filter(id => !dataIds.includes(id))

                docsIdsToDelete.forEach(id => {
                    const docRef = ref.doc(id)
                    batch.delete(docRef)
                })

                data.forEach(item => {
                    if (docIds.includes(item._id)) {
                        const docRef = ref.doc(item._id)
                        batch.set(docRef, item)
                    }
                })
            }

            yield call([batch, batch.commit])

            yield put(updateDbSuccess())
        }
    } catch (error) {
        console.error(error)
        yield put(updateDbFailed(error))
    }
}

function* getDocsFromDbWatcher() {
    yield takeEvery(actions.GET_DOCS_FROM_DB, getDocsFromDb)
}

function* updateDbWatcher() {
    yield takeLatest(actions.UPDATE_DB, updateDb)
}

export default function* database() {
    yield all([getDocsFromDbWatcher(), updateDbWatcher()])
}
