import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { Card } from '../common/card/Card'
import { getTitleFromRoute } from '../../util'
import './styles.scss'

class CourseSectionBase extends PureComponent {
    state = {
        title: '',
    }

    _getTitle = routeName => {
        const title = getTitleFromRoute(routeName)
        this.setState({ title })
    }

    componentDidMount() {
        this._getTitle(this.props.location.pathname)
    }

    componentDidUpdate(prevProps) {
        const { location } = this.props

        if (prevProps.location.pathname !== location.pathname) {
            this._getTitle(location.pathname)
        }
    }

    render() {
        const { title } = this.state

        return (
            <div className="course-section__container">
                <div className="course-section__column">
                    <Card className="course-section__card">{title}</Card>
                </div>
                <div className="course-section__column">
                    <Card className="course-section__card course-section__card--right">
                        {title}
                    </Card>
                    <Card className="course-section__card course-section__card--right">
                        {title}
                    </Card>
                </div>
            </div>
        )
    }
}

export const CourseSection = withRouter(CourseSectionBase)
