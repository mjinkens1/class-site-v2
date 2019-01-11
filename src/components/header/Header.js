import React, { PureComponent, Fragment } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
// import MenuItem from '@material-ui/core/MenuItem'
import { Typography, Button, IconButton, Menu } from '@material-ui/core'
import { LoginMenu } from './LoginMenu'
import { getHeaderClass, getTitleFromRoute } from '../../util'
import { auth } from '../../config/firebase'
import './styles.scss'

export class Header extends PureComponent {
    state = {
        title: '',
        headerClass: '',
        currentRoute: null,
        anchorEl: null,
    }

    _getHeader = () => {
        const { history } = this.props,
            title = getTitleFromRoute(history.location.pathname),
            headerClass = getHeaderClass(history.location.pathname)

        this.setState({
            title,
            headerClass,
            currentRoute: history.location.pathname,
        })
    }

    _handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget })
    }

    _handleClose = () => {
        this.setState({ anchorEl: null })
    }

    _logout = () => {
        this._handleClose()
        this.props.logout()
    }

    componentDidMount() {
        this._getHeader()
        if (this.props.history.location.pathname === '/home')
            auth.onAuthStateChanged(
                user => this.props.updateAuth(user),
                () => this.props.updateAuth(null)
            )
    }

    componentDidUpdate(prevProps) {
        const { history, user } = this.props

        if (this.state.currentRoute !== history.location.pathname)
            this._getHeader()

        if (!prevProps.user && user) this.setState({ anchorEl: null })
    }

    render() {
        const { toggleDrawer, login, loginError, user } = this.props,
            { title, headerClass, anchorEl } = this.state,
            open = Boolean(anchorEl)

        return (
            <div className={`header ${headerClass}`}>
                <IconButton
                    style={materialUIStyles.headerButton}
                    color="inherit"
                    aria-label="Menu"
                    onClick={toggleDrawer}
                >
                    <MenuIcon />
                </IconButton>
                <h1 className="header-title">{title}</h1>
                <IconButton
                    style={materialUIStyles.headerButton}
                    aria-haspopup="true"
                    onClick={this._handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={this._handleClose}
                >
                    {user ? (
                        <Fragment>
                            <div className="login-menu-current-user">
                                <AccountCircle
                                    style={{ margin: 4, marginRight: 0 }}
                                />
                                <Typography
                                    align="center"
                                    style={{ margin: 12 }}
                                >
                                    {user && user.email}
                                </Typography>
                            </div>
                            <Button
                                style={{
                                    alignSelf: 'center',
                                    margin: 12,
                                    marginTop: 20,
                                    width: 220,
                                    color: 'white',
                                    backgroundColor: 'rgb(225, 59, 30)',
                                }}
                                variant="contained"
                                className="login-menu-login-button"
                                onClick={this._logout}
                            >
                                LOGOUT
                            </Button>
                        </Fragment>
                    ) : (
                        <LoginMenu login={login} loginError={loginError} />
                    )}
                </Menu>
            </div>
        )
    }
}

const materialUIStyles = {
    headerButton: {
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
}
