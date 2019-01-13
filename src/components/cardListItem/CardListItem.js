import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { IconButton, Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Create'
import './styles.scss'

export const CardListItem = ({
    id,
    localId,
    body,
    editItem,
    deleteItem,
    edit,
}) => (
    <li>
        <div className="card-list-item" id={id}>
            {edit && (
                <div className="card-list-item__edit">
                    <Tooltip title="Edit Item">
                        <IconButton onClick={() => editItem(localId)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Item">
                        <IconButton onClick={() => deleteItem(localId)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            )}
            {ReactHtmlParser(body)}
        </div>
    </li>
)
