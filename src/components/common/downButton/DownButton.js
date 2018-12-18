import React, { PureComponent } from 'react'
import Fab from '@material-ui/core/Fab'
import DownIcon from '@material-ui/icons/ArrowDropDown'

export class DownButton extends PureComponent {
    render() {
        return (
            <Fab
                style={{ backgroundColor: 'rgb(225, 59, 30)' }}
                aria-label="Down"
                onClick={this.props.onClick}
            >
                <DownIcon style={{ color: 'white' }} />
            </Fab>
        )
    }
}
