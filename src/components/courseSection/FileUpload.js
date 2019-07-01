import React, { Fragment, useState } from 'react'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Add from '@material-ui/icons/Add'
import Dropzone from 'react-dropzone'
import { styles } from '../../config/styles'
import './styles.scss'

const SimpleDialog = ({
    getFilePreviews,
    files,
    onClose,
    onFileDrop,
    selectedValue,
    ...other
}) => {
    const [dropzoneClass, setDropzoneClass] = useState(
        'course-section__dropzone'
    )

    const onDragEnter = () => {
        if (dropzoneClass === 'course-section__dropzone') {
            setDropzoneClass('course-section__dropzone--drag')
        }
    }

    const onDragLeave = () => {
        if (dropzoneClass === 'course-section__dropzone--drag') {
            setDropzoneClass('course-section__dropzone')
        }
    }

    return (
        <Dialog
            style={{ minWidth: '60%' }}
            onClose={onClose}
            aria-labelledby="simple-dialog-title"
            {...other}
        >
            <div className="course-section__dropzone-title">
                <DialogTitle>Drag and drop files, or click to add</DialogTitle>
                <Button
                    onClick={getFilePreviews}
                    style={{
                        margin: styles.baseUnit,
                        backgroundColor: styles.bgPrimaryDark,
                    }}
                >
                    Done
                </Button>
            </div>

            <Dropzone
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onFileDrop}
            >
                {({ getRootProps, getInputProps }) => (
                    <div className={dropzoneClass} {...getRootProps()}>
                        <div
                            className={
                                files && files.length > 0
                                    ? 'course-section__dropzone--files-list'
                                    : 'course-section__dropzone-border'
                            }
                        >
                            <input {...getInputProps()} />
                            {files && files.length > 0 ? (
                                <List>
                                    {files.map(({ name }) => (
                                        <Fragment key={name}>
                                            <ListItem>
                                                <ListItemText primary={name} />
                                            </ListItem>
                                            <Divider variant="middle" />
                                        </Fragment>
                                    ))}
                                </List>
                            ) : (
                                <Add
                                    style={{
                                        position: 'absolute',
                                        color: styles.textPrimaryDark,
                                        fontSize: 50,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                )}
            </Dropzone>
        </Dialog>
    )
}

export const FileUpload = ({
    getFilePreviews,
    files,
    handleClose,
    open,
    onFileDrop,
}) => {
    return (
        <div>
            <SimpleDialog
                getFilePreviews={getFilePreviews}
                files={files}
                open={open}
                onClose={handleClose}
                onFileDrop={onFileDrop}
            />
        </div>
    )
}
