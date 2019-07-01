import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import {
    Card as MUICard,
    CardActionArea,
    CardContent,
    CircularProgress,
    Grid,
    Tooltip,
    Typography,
} from '@material-ui/core'
import { EditTools } from '../editTools/EditTools'
import { Card } from '../common/card/Card'
import { FilePreview } from './FilePreview'
import { FileUpload } from './FileUpload'
import { filesToArray, isEqual, toKebabCase } from '../../util'
import { styles } from '../../config/styles/'
import './styles.scss'

class CourseSectionBase extends PureComponent {
    state = {
        addFiles: false,
        currentFiles: {},
        editFiles: false,
        editLinks: false,
        filesToAdd: [],
        selectedFile: {},
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
        this.setState({ editFiles: false, filesToAdd: [] })
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
        this.props.addFiles(
            this.props.filePreviews,
            toKebabCase(this.props.history.location.pathname)
        )
        this.props.clearFilePreviews()
        this.setState({ editFiles: false, filesToAdd: [] })
    }

    _toggleEditFiles = () =>
        this.setState(({ editFiles }) => ({ editFiles: !editFiles }))

    _toggleEditLinks = () =>
        this.setState(({ editLinks }) => ({ editLinks: !editLinks }))

    componentDidMount() {
        this._getSectionData()
    }

    componentDidUpdate(prevProps) {
        const { files, filePreviews } = this.props

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
            selectedFile,
        } = this.state
        const filesArray = filesToArray(files, history)
        const { path, type } = selectedFile

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
                        <Grid
                            container
                            spacing={32}
                            style={{
                                alignSelf: 'center',
                                padding: styles.baseUnit,
                            }}
                        >
                            {filesArray
                                .concat(filePreviews)
                                .map(({ name, preview, type }) => {
                                    return (
                                        <Grid item key={name}>
                                            <Tooltip title={name}>
                                                <MUICard
                                                    style={{
                                                        width: 140,
                                                        height: 200,
                                                    }}
                                                >
                                                    <CardActionArea>
                                                        {preview ? (
                                                            <object
                                                                data={preview}
                                                                height={150}
                                                                width="100%"
                                                            >
                                                                File
                                                            </object>
                                                        ) : (
                                                            <CircularProgress
                                                                size={30}
                                                                style={{
                                                                    color:
                                                                        styles.bgPrimaryDark,
                                                                }}
                                                            />
                                                        )}
                                                        <CardContent>
                                                            <Typography
                                                                noWrap
                                                                style={{
                                                                    fontSize: 10,
                                                                }}
                                                                variant="body2"
                                                                color="textSecondary"
                                                                component="p"
                                                            >
                                                                {name}
                                                            </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                </MUICard>
                                            </Tooltip>
                                        </Grid>
                                    )
                                })}
                        </Grid>
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
                        <FilePreview path={path} type={type} />
                    </Card>
                </div>
            </div>
        )
    }
}

export const CourseSection = withRouter(CourseSectionBase)
