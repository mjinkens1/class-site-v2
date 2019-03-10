import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { EditTools } from '../editTools/EditTools'
import { Card } from '../common/card/Card'
import { FilePreview } from './FilePreview'
import { getFileIcon } from '../../util'
import './styles.scss'

class CourseSectionBase extends PureComponent {
    state = {
        edit: false,
        files: [],
        selectedFile: {},
        title: '',
    }

    _getSectionData = () => {}

    componentDidMount() {
        this._getSectionData()
    }

    render() {
        const { user } = this.props
        const { edit, files, selectedFile } = this.state
        const { path, type } = selectedFile

        return (
            <div className="course-section__container">
                <div className="course-section__column">
                    <Card className="course-section__card">
                        {user && (
                            <div className="course-section__card__edit-tools">
                                <EditTools
                                    addItem={this._addItem}
                                    toggleEdit={this._toggleEdit}
                                    saveChanges={this._saveChanges}
                                    cancelChanges={this._cancelChanges}
                                    edit={edit}
                                />
                            </div>
                        )}
                        <Typography
                            variant="display1"
                            align="left"
                            gutterBottom
                            style={{ fontSize: 24, margin: 12 }}
                        >
                            Section Materials
                        </Typography>
                        {files.map(file => {
                            const icon = getFileIcon(file)
                            return console.log(icon)
                        })}
                    </Card>
                </div>
                <div className="course-section__column">
                    <Card className="course-section__card course-section__card--right">
                        {user && (
                            <div className="course-section__card__edit-tools">
                                <EditTools
                                    addItem={this._addItem}
                                    toggleEdit={this._toggleEdit}
                                    saveChanges={this._saveChanges}
                                    cancelChanges={this._cancelChanges}
                                    edit={edit}
                                />
                            </div>
                        )}
                        <Typography
                            variant="display1"
                            align="left"
                            gutterBottom
                            style={{ fontSize: 24, margin: 12 }}
                        >
                            Links and Resources
                        </Typography>
                    </Card>
                    <Card className="course-section__card course-section__card--right">
                        <FilePreview path={path} type={type} />
                    </Card>
                </div>
            </div>
        )
    }
}

export const CourseSection = withRouter(CourseSectionBase)
