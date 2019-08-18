import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { toJS } from '../toJS'
import { CourseSection } from '../../components/courseSection/CourseSection'
import {
    addFiles,
    getFiles,
    getFilePreviews,
    clearFilePreviews,
    deleteFiles,
} from '../../modules/storage/actions'
import { setFullscreenFile } from '../../modules/fileFullscreen/actions'
import { getDocsFromDb, updateDb } from '../../modules/database/actions'
import { isEqual, toKebabCase } from '../../util'
import { store } from '../../config/redux'

class CourseSectionContainer extends PureComponent {
    state = {
        addFiles: false,
        currentFiles: {},
        editFiles: false,
        editLinks: false,
        filesToAdd: [],
        selectedForPreview: {},
        selectedForDelete: [],
        title: '',
    }

    _addFiles = () => {
        this.props.addFiles(
            this.state.filesToAdd,
            toKebabCase(this.props.history.location.pathname)
        )
    }

    _addItem = () => {
        this.setState({ addFiles: true })
    }

    _cancelFileChanges = () => {
        this.props.clearFilePreviews()
        this.setState({
            editFiles: false,
            filesToAdd: [],
            selectedForDelete: [],
        })
    }

    _cancelLinkChanges = () => {
        this.setState(({ editLinks }) => ({ editLinks: !editLinks }))
    }

    _getFilePreviews = () => {
        this.props.getFilePreviews(this.state.filesToAdd)
        this.setState({ addFiles: false })
    }

    _getSectionData = () => {
        this.props.getFiles(toKebabCase(this.props.history.location.pathname))
    }

    _onFileDrop = filesToAdd => {
        this.setState({ filesToAdd })
    }

    _saveFileChanges = () => {
        if (this.state.filesToAdd.length > 0) {
            this.props.addFiles(
                this.props.filePreviews,
                toKebabCase(this.props.history.location.pathname)
            )
        }

        if (this.state.selectedForDelete.length > 0) {
            this.props.deleteFiles(
                this.state.selectedForDelete,
                toKebabCase(this.props.history.location.pathname)
            )
        }

        this.props.clearFilePreviews()
        this.setState({
            editFiles: false,
            filesToAdd: [],
            selectedForDelete: [],
        })
    }

    _selectForDelete = (name, undo) => {
        if (undo) {
            this.setState(({ selectedForDelete }) => ({
                selectedForDelete: selectedForDelete.filter(
                    selected => selected !== name
                ),
            }))
        } else {
            this.setState(({ selectedForDelete }) => ({
                selectedForDelete: selectedForDelete.concat(name),
            }))
        }
    }

    _selectForPreview = (name, preview, type, url) => {
        this.setState({ selectedForPreview: { name, preview, type, url } })
    }

    _toggleEditFiles = () =>
        this.setState(({ editFiles }) => ({ editFiles: !editFiles }))

    _toggleEditLinks = () =>
        this.setState(({ editLinks }) => ({ editLinks: !editLinks }))

    componentDidMount() {
        this._getSectionData()
    }

    componentDidUpdate(prevProps) {
        const { files } = this.props

        if (!isEqual(prevProps.files, files)) {
            this.setState({ currentFiles: files })
        }
    }

    render() {
        const {
            files,
            filePreviews,
            getDocsFromDb,
            gettingFiles,
            history,
            setFullscreenFile,
            updateDb,
            updatingDb,
            updateDbFailed,
            user,
        } = this.props
        const {
            addFiles,
            editFiles,
            editLinks,
            filesToAdd,
            selectedForPreview,
            selectedForDelete,
        } = this.state

        const docs = store
            .getState()
            .database.get(
                `docs-${toKebabCase(this.props.history.location.pathname)}`
            )

        const gettingDocsFromDb = store
            .getState()
            .database.get(
                `gettingDocsFromDb-${toKebabCase(
                    this.props.history.location.pathname
                )}`
            )

        const docsJS = docs && docs.toJS()

        return (
            <CourseSection
                addFiles={addFiles}
                addItem={this._addItem}
                cancelFileChanges={this._cancelFileChanges}
                cancelLinkChanges={this._cancelLinkChanges}
                docs={docsJS}
                editFiles={editFiles}
                editLinks={editLinks}
                files={files}
                filePreviews={filePreviews}
                filesToAdd={filesToAdd}
                getDocsFromDb={getDocsFromDb}
                getFilePreviews={this._getFilePreviews}
                gettingDocsFromDb={gettingDocsFromDb}
                gettingFiles={gettingFiles}
                history={history}
                onFileDrop={this._onFileDrop}
                saveFileChanges={this._saveFileChanges}
                saveLinkChanges={this._saveLinkChanges}
                selectedForDelete={selectedForDelete}
                selectForDelete={this._selectForDelete}
                selectedForPreview={selectedForPreview}
                selectForPreview={this._selectForPreview}
                setFullscreenFile={setFullscreenFile}
                toggleEditFiles={this._toggleEditFiles}
                toggleEditLinks={this._toggleEditLinks}
                updateDb={updateDb}
                updatingDb={updatingDb}
                updateDbFailed={updateDbFailed}
                user={user}
            />
        )
    }
}

const mapStateToProps = ({ authentication, storage, database }) => ({
    user: authentication.get('user'),
    addingFile: storage.get('addingFile'),
    gettingFiles: storage.get('gettingFiles'),
    files: storage.get('files'),
    filePreviews: storage.get('filePreviews'),
    updatingDb: database.get('updatingDb'),
    updateDbFailed: database.get('updateDbFailed'),
})

const mapDispatchToProps = {
    addFiles,
    getFiles,
    getFilePreviews,
    clearFilePreviews,
    deleteFiles,
    getDocsFromDb,
    setFullscreenFile,
    updateDb,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(CourseSectionContainer))
