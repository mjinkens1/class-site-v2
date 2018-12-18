import React, { PureComponent } from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import './styles.scss'

export class Header extends PureComponent {
    render() {
        const { toggleDrawer } = this.props;

        return (
            <div className="header">
                <IconButton
                    style={ materialUIStyles.headerButton }
                    color="inherit"
                    aria-label="Menu"
                    onClick={ toggleDrawer }
                >
                    <MenuIcon />
                </IconButton>
                <IconButton
                    style={ materialUIStyles.headerButton }
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

const materialUIStyles = {
    headerButton: {
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.2)',
    }
}
