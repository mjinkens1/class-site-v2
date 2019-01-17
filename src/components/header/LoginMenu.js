import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField'
import { Button, Typography } from '@material-ui/core'

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
        const { loginError, innerRefs } = this.props,
            { email, password, showPassword } = this.state

        return (
            <form className="login-menu-container" noValidate onSubmit={this._onSubmit}>
                <Typography variant="h6" align="center">
                    Login
                </Typography>

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
                    type='submit'
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

export const LoginMenu = React.forwardRef((props, ref) =>
    <LoginMenuBase innerRefs={ref} {...props} />
)
