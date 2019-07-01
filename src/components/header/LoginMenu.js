import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField'
import { Button, IconButton, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { styles } from '../../config/styles'
class LoginMenuBase extends PureComponent {
    state = {
        email: '',
        password: '',
        showPassword: false,
    }

    _handleTextChange = (field, text) => this.setState({ [field]: text })

    _handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }))
    }

    _login = () => {
        const { login } = this.props,
            { email, password } = this.state

        login(email, password)
    }

    _onSubmit = event => {
        event.preventDefault()
        this._login()
    }

    render() {
        const { loginError, innerRefs, handleClose } = this.props,
            { email, password, showPassword } = this.state

        return (
            <div>
                <div className="login-menu__close-icon--wrapper">
                    <IconButton
                        color="inherit"
                        aria-label="Menu"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                <Typography variant="h6" align="center">
                    Login
                </Typography>
                <form
                    className="login-menu__form"
                    noValidate
                    onSubmit={this._onSubmit}
                >
                    <TextField
                        id="email"
                        label="Email"
                        inputRef={innerRefs && innerRefs.emailRef}
                        className="login-menu-text-field"
                        autoFocus
                        value={email}
                        onChange={({ target }) =>
                            this._handleTextChange('email', target.value)
                        }
                        margin="normal"
                    />
                    <TextField
                        id="password"
                        label="Password"
                        inputRef={innerRefs && innerRefs.passwordRef}
                        type={showPassword ? 'text' : 'password'}
                        className="login-menu-text-field"
                        value={password}
                        onChange={({ target }) =>
                            this._handleTextChange('password', target.value)
                        }
                        margin="normal"
                    />

                    <Typography
                        align="center"
                        style={{ height: 20, color: 'red' }}
                    >
                        {loginError}
                    </Typography>

                    <Button
                        style={{
                            marginTop: 20,
                            width: '100%',
                            color: 'white',
                            backgroundColor: styles.bgPrimaryDark,
                        }}
                        type="submit"
                        variant="contained"
                        className="login-menu-login-button"
                        onClick={this._login}
                    >
                        LOGIN
                    </Button>
                </form>
            </div>
        )
    }
}

export const LoginMenu = React.forwardRef((props, ref) => (
    <LoginMenuBase innerRefs={ref} {...props} />
))
