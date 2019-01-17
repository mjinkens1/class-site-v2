import { connect } from 'react-redux'
import { toJS } from '../toJS'
import { Home } from '../../components/home/Home'
import { getRSSVideo, getRSSWOD } from '../../modules/rss/actions'
import { getDocsFromDb, updateDb } from '../../modules/database/actions'

const mapStateToProps = ({ authentication, database, rss }) => ({
    gettingRSSVideo: rss.get('gettingRSSVideo'),
    rssVideo: rss.get('rssVideo'),
    gettingRSSWOD: rss.get('gettingRSSWOD'),
    rssWOD: rss.get('rssWOD'),
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
    getRSSWOD,
    updateDb,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(Home))
