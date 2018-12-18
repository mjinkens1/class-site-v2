import { connect } from 'react-redux'
import { toJS } from '../toJS'
import { Header } from '../../components/header/Header'

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(Header))
