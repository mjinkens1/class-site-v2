import { connect } from 'react-redux'
import { toJS } from '../toJS'
import { CourseSection } from '../../components/courseSection/CourseSection'
import {
    addFiles,
    getFiles,
    getFilePreviews,
    clearFilePreviews,
} from '../../modules/storage/actions'

const mapStateToProps = ({ authentication, storage }) => ({
    user: authentication.get('user'),
    addingFile: storage.get('addingFile'),
    gettingFiles: storage.get('gettingFiles'),
    files: storage.get('files'),
    filePreviews: storage.get('filePreviews'),
})

const mapDispatchToProps = {
    addFiles,
    getFiles,
    getFilePreviews,
    clearFilePreviews,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(CourseSection))
