import { connect } from 'react-redux'
import { toJS } from '../toJS'
import { CourseSection } from '../../components/courseSection/CourseSection'

const mapStateToProps = ({ authentication, database }) => ({
    user: authentication.get('user'),
    updatingDb: database.get('updatingDb'),
    updateDbFailed: database.get('updateDbFailed'),
})

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(CourseSection))
