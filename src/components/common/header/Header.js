import React, { PureComponent } from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import './styles.scss'

export class Header extends PureComponent {
    render() {
        return (
            <div className="header">
                <IconButton
                    style={{
                        color: 'white',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                    }}
                    color="inherit"
                    aria-label="Menu"
                >
                    <MenuIcon />
                </IconButton>
                <IconButton
                    style={{
                        color: 'white',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                    }}
                    // aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
            </div>
        )
    }
}
