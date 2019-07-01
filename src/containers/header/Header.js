import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { toJS } from '../toJS'
import { Header } from '../../components/header/Header'
// import { login, logout, updateAuth } from '../../modules/authentication/actions'
import { actions } from '../../modules'

const { login, logout, updateAuth } = actions

const mapStateToProps = ({ authentication }) => ({
  loginError: authentication.get('loginError'),
  user: authentication.get('user')
})

const mapDispatchToProps = {
  login,
  logout,
  updateAuth
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(toJS(Header))
)
