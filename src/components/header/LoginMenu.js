import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField'
import { Button, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

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

    render() {
        const { loginError } = this.props,
            { email, password, showPassword } = this.state

        return (
            <form className="login-menu-container">
                <Typography variant="h6" align="center">
                    Login
                </Typography>

                <TextField
                    id="email"
                    label="Email"
                    className="login-menu-text-field"
                    autoFocus={true}
                    value={email}
                    onChange={({ target }) =>
                        this._handleTextChange('email', target.value)
                    }
                    margin="normal"
                />
                <TextField
                    id="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    className="login-menu-text-field"
                    value={password}
                    onChange={({ target }) =>
                        this._handleTextChange('password', target.value)
                    }
                    margin="normal"
                />

                <Typography align="center" style={{ height: 20, color: 'red' }}>
                    {loginError}
                </Typography>

                <Button
                    style={{
                        marginTop: 20,
                        width: '100%',
                        color: 'white',
                        backgroundColor: 'rgb(225, 59, 30)',
                    }}
                    variant="contained"
                    className="login-menu-login-button"
                    onClick={this._login}
                >
                    LOGIN
                </Button>
            </form>
        )
    }
}

const styles = {
    focused: {
        textDecorationColor: 'green',
    },
}

export const LoginMenu = withStyles(styles)(LoginMenuBase)
