import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { Typography, Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { EditTools } from '../editTools/EditTools'
import { Card } from '../common/card/Card'
import { FilePreview } from './FilePreview'
import { FileUpload } from './FileUpload'
import { FileGrid } from './FileGrid'
import { LinksCard } from './LinksCard'
import { filesToArray } from '../../util'
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
        open: false,
    }

    _showSnackbar = () => {
        this.setState({ open: true })

        setTimeout(() => {
            this._hideSnackbar()
        }, 3000)
    }

    _hideSnackbar = () => this.setState({ open: false })

    componentDidUpdate(prevProps) {
        const { updatingDb, updateDbFailed } = this.props

        if (prevProps.updatingDb && !updatingDb && !updateDbFailed) {
            this._showSnackbar()
        }
    }

    render() {
        const {
            addFiles,
            addItem,
            cancelFileChanges,
            docs,
            editFiles,
            files,
            filePreviews,
            filesToAdd,
            getDocsFromDb,
            getFilePreviews,
            gettingDocsFromDb,
            gettingFiles,
            history,
            onFileDrop,
            saveFileChanges,
            selectForDelete,
            selectedForDelete,
            selectForPreview,
            selectedForPreview,
            toggleEditFiles,
            updateDb,
            user,
        } = this.props
        const { open } = this.state

        const filesArray = filesToArray(files, history)

        return (
            <div className="course-section__container">
                <Card className="course-section__card--file-grid">
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
                                addItem={addItem}
                                cancelChanges={cancelFileChanges}
                                edit={editFiles}
                                placement="bottom"
                                saveChanges={saveFileChanges}
                                toggleEdit={toggleEditFiles}
                            />
                        </div>
                    )}
                    {user && editFiles && (
                        <FileUpload
                            getFilePreviews={getFilePreviews}
                            open={addFiles}
                            handleClose={() => null}
                            onFileDrop={onFileDrop}
                            files={filesToAdd}
                        />
                    )}
                    <FileGrid
                        edit={editFiles}
                        filesArray={filesArray}
                        filePreviews={filePreviews}
                        gettingFiles={gettingFiles}
                        selectForDelete={selectForDelete}
                        selectedForDelete={selectedForDelete}
                        selectForPreview={selectForPreview}
                    />
                </Card>
                <LinksCard
                    data={docs}
                    getDocsFromDb={getDocsFromDb}
                    gettingDocsFromDb={gettingDocsFromDb}
                    history={history}
                    updateDb={updateDb}
                    user={user}
                />
                <Card className="course-section__card--file-preview">
                    <FilePreview selectedForPreview={selectedForPreview} />
                </Card>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={open}
                    autoHideDuration={6000}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Changes Saved!</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this._handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        )
    }
}

export const CourseSection = withRouter(CourseSectionBase)
