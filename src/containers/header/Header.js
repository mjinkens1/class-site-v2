import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { toJS } from '../toJS'
import { Header } from '../../components/header/Header'
import { login, logout, updateAuth } from './actions'

const mapStateToProps = ({ header }) => ({
    loginError: header.get('loginError'),
    user: header.get('user'),
})

const mapDispatchToProps = {
    login,
    logout,
    updateAuth,
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(toJS(Header))
)
