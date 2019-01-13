import { connect } from 'react-redux'
import { toJS } from '../toJS'
import { Home } from '../../components/home/Home'
import { getRSSVideo } from '../../modules/rssVideo/actions'
import { getDocsFromDb, updateDb } from '../../modules/database/actions'

const mapStateToProps = ({ authentication, database, rssVideo }) => ({
    gettingRSSData: rssVideo.get('gettingRSSData'),
    rssVideo: rssVideo.get('rssVideo'),
    user: authentication.get('user'),
    updatingDb: database.get('updatingDb'),
    updateDbFailed: database.get('updateDbFailed'),
    announcementsData: database.get('docs-home-card-Announcements'),
    parentsData: database.get('docs-home-card-Parents'),
    otherData: database.get('docs-home-card-Other Stuff'),
})

const mapDispatchToProps = {
    getDocsFromDb,
    getRSSVideo,
    updateDb,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(Home))
