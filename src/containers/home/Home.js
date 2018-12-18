import { connect } from 'react-redux'
import { toJS } from '../toJS'
import { Home } from '../../components/home/Home'
import { getRSSData } from './actions'

const mapStateToProps = ({ home }) => ({
    gettingRSSData: home.get('gettingRSSData'),
    rssData: home.get('rssData'),
})

const mapDispatchToProps = {
    getRSSData,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(Home))
