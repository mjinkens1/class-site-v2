import { connect } from 'react-redux'
import { toJS } from '../toJS'
import { Home } from '../../components/home/Home'
import { getRSSVideo } from './actions'

const mapStateToProps = ({ home }) => ({
    gettingRSSData: home.get('gettingRSSData'),
    rssVideo: home.get('rssVideo'),
})

const mapDispatchToProps = {
    getRSSVideo,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(Home))
