import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { EditTools } from '../editTools/EditTools'
import { Card } from '../common/card/Card'
import { FilePreview } from './FilePreview'
import { FileUpload } from './FileUpload'
import { FileGrid } from './FileGrid'
import { filesToArray, isEqual, toKebabCase } from '../../util'
import './styles.scss'

class CourseSectionBase extends PureComponent {
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
            this.props.deleteFiles(this.state.selectedForDelete)
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

    _selectForPreview = (name, preview) => {
        this.setState({ selectedForPreview: { name, preview } })
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
        const { files, filePreviews, history, user } = this.props
        const {
            addFiles,
            editFiles,
            editLinks,
            filesToAdd,
            selectedForPreview,
            selectedForDelete,
        } = this.state
        const filesArray = filesToArray(files, history)
        const { path, type } = selectedForPreview

        return (
            <div className="course-section__container">
                <div className="course-section__column">
                    <Card className="course-section__card">
                        <Typography
                            variant="display1"
                            align="left"
                            gutterBottom
                            style={{ fontSize: 24, margin: 12 }}
                        >
                            Section Materials
                        </Typography>
                        {user && (
                            <div className="course-section__card__edit-tools">
                                <EditTools
                                    addItem={this._addItem}
                                    cancelChanges={this._cancelFileChanges}
                                    edit={editFiles}
                                    placement="bottom"
                                    saveChanges={this._saveFileChanges}
                                    toggleEdit={this._toggleEditFiles}
                                />
                            </div>
                        )}
                        {user &&
                            editFiles && (
                                <FileUpload
                                    getFilePreviews={this._getFilePreviews}
                                    open={addFiles}
                                    handleClose={() => null}
                                    onFileDrop={this._onFileDrop}
                                    files={filesToAdd}
                                />
                            )}
                        <FileGrid
                            edit={editFiles}
                            filesArray={filesArray}
                            filePreviews={filePreviews}
                            selectForDelete={this._selectForDelete}
                            selectedForDelete={selectedForDelete}
                            selectForPreview={this._selectForPreview}
                        />
                    </Card>
                </div>
                <div className="course-section__column">
                    <Card className="course-section__card">
                        {user && (
                            <div className="course-section__card__edit-tools">
                                <EditTools
                                    cancelChanges={this._cancelLinkChanges}
                                    edit={editLinks}
                                    placement="bottom"
                                    saveChanges={this._saveLinkChanges}
                                    toggleEdit={this._toggleEditLinks}
                                />
                            </div>
                        )}
                        <Typography
                            variant="display1"
                            align="left"
                            gutterBottom
                            style={{ fontSize: 24, margin: 12 }}
                        >
                            Links and Resources
                        </Typography>
                    </Card>
                    <Card className="course-section__card">
                        <FilePreview selectedForPreview={selectedForPreview} />
                    </Card>
                </div>
            </div>
        )
    }
}

export const CourseSection = withRouter(CourseSectionBase)
