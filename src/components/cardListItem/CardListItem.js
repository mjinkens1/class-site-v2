import React, { Fragment } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, IconButton, Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Create'
import './styles.scss'

export const CardListItem = ({
    id,
    localId,
    body,
    title,
    editItem,
    deleteItem,
    edit,
    avatar
}) => (
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
            <ListItem alignItems="center" divider>
                <ListItemAvatar>
                    <Avatar>{avatar}</Avatar>
                </ListItemAvatar>
                <div className='card-list-item__text'>
                    <ListItemText
                        primary={title}
                    />
                    {ReactHtmlParser(body)}
                </div>
            </ListItem>
            <Divider />
        </div>
    )
