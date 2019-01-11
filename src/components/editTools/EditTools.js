import React, { PureComponent } from 'react'
import EditIcon from '@material-ui/icons/Create'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import './styles.scss'

export class EditTools extends PureComponent {
    render() {
        return (
            <div className='edit-tools-container'>
                <IconButton >
                    <AddIcon />
                </IconButton>
                <IconButton>
                    <EditIcon />
                </IconButton>
            </div>
        );
    }
}