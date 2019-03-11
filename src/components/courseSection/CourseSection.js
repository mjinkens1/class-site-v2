import React, { Fragment, PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import Dropzone from 'react-dropzone'
import { EditTools } from '../editTools/EditTools'
import { Card } from '../common/card/Card'
import { FilePreview } from './FilePreview'
import { getFileIcon } from '../../util'
import './styles.scss'

class CourseSectionBase extends PureComponent {
    state = {
        editFiles: false,
        editLinks: false,
        files: [],
        selectedFile: {},
        title: '',
    }

    _cancelFileChanges = () => {
        this.setState(({ editFiles }) => ({ editFiles: !editFiles }))
    }

    _cancelLinkChanges = () => {
        this.setState(({ editLinks }) => ({ editLinks: !editLinks }))
    }

    _getSectionData = () => {}

    _toggleEditFiles = () =>
        this.setState(({ editFiles }) => ({ editFiles: !editFiles }))

    _toggleEditLinks = () =>
        this.setState(({ editLinks }) => ({ editLinks: !editLinks }))

    componentDidMount() {
        this._getSectionData()
    }

    render() {
        const { user } = this.props
        const { editFiles, editLinks, files, selectedFile } = this.state
        const { path, type } = selectedFile

        return (
            <div className="course-section__container">
                <div className="course-section__column">
                    <Card className="course-section__card">
                        {user && (
                            <div className="course-section__card__edit-tools">
                                <EditTools
                                    cancelChanges={this._cancelFileChanges}
                                    edit={editFiles}
                                    placement="bottom-end"
                                    saveChanges={this._saveFileChanges}
                                    toggleEdit={this._toggleEditFiles}
                                />
                            </div>
                        )}
                        <Typography
                            variant="display1"
                            align="left"
                            gutterBottom
                            style={{ fontSize: 24, margin: 12 }}
                        >
                            Section Materials
                        </Typography>
                        {user &&
                            editFiles && (
                                <Fragment>
                                    <Typography
                                        variant="display1"
                                        align="left"
                                        gutterBottom
                                        style={{
                                            fontSize: 16,
                                            margin: 12,
                                            marginLeft: 24,
                                        }}
                                    >
                                        Drag and drop files, or click to add.
                                    </Typography>
                                    <Dropzone
                                        onDrop={acceptedFiles =>
                                            console.log(acceptedFiles)
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <div
                                                className="course-section__dropzone"
                                                {...getRootProps()}
                                            >
                                                <input {...getInputProps()} />
                                            </div>
                                        )}
                                    </Dropzone>
                                </Fragment>
                            )}
                        {files.map(file => {
                            const icon = getFileIcon(file)
                            return console.log(icon)
                        })}
                    </Card>
                </div>
                <div className="course-section__column">
                    <Card className="course-section__card">
                        {user && (
                            <div className="course-section__card__edit-tools">
                                <EditTools
                                    cancelChanges={this._cancelLinkChanges}
                                    edit={editLinks}
                                    placement="bottom-end"
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
                        <FilePreview path={path} type={type} />
                    </Card>
                </div>
            </div>
        )
    }
}

export const CourseSection = withRouter(CourseSectionBase)
