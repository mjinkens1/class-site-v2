import { connect } from 'react-redux'
import { toJS } from '../toJS'
import { Calendar } from '../../components/calendar/Calendar'
import { getDocsFromDb, updateDb } from '../../modules/database/actions'

const mapStateToProps = ({ authentication, database, rss }) => ({
    calendarData: database.get('docs-calendar-data'),
    user: authentication.get('user'),
})

const mapDispatchToProps = {
    getDocsFromDb,
    updateDb,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(Calendar))
