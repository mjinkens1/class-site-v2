import React from 'react'
import EditIcon from '@material-ui/icons/Create'
import AddIcon from '@material-ui/icons/Add'
import DoneIcon from '@material-ui/icons/Done'
import CancelIcon from '@material-ui/icons/Close'
import { Button, IconButton, Tooltip } from '@material-ui/core'
import './styles.scss'

export const EditTools = ({
    addItem,
    cancelChanges,
    edit,
    placement,
    saveChanges,
    toggleEdit,
    style,
}) => (
    <div className="edit-tools-absolute" style={{ style }}>
        <div className="edit-tools__container">
            {edit && (
                <div className={edit ? 'edit-tools__edit-button--slide' : ''}>
                    <Button
                        size="small"
                        color="primary"
                        aria-label="Save Changes"
                        style={{ margin: 4 }}
                        onClick={saveChanges}
                    >
                        SAVE CHANGES
                        <DoneIcon style={{ marginLeft: 4 }} />
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        aria-label="Cancel"
                        style={{ margin: 4 }}
                        onClick={cancelChanges}
                    >
                        CANCEL
                        <CancelIcon style={{ marginLeft: 4 }} />
                    </Button>
                    {addItem && (
                        <Tooltip title="Add Item">
                            <IconButton onClick={addItem}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </div>
            )}
            <div className={edit ? 'edit-tools__edit-button--fade-out' : ''}>
                <Tooltip title="Edit" placement={placement}>
                    <IconButton onClick={toggleEdit}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    </div>
)
