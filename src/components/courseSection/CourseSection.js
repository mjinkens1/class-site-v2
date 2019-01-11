import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { Card } from '../common/card/Card'
import { getTitleFromRoute } from '../../util'
import './styles.scss'

class RouterlessCourseSection extends PureComponent {
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
            <div className="course-section-container">
                <Card className="course-section-card">{title}</Card>
                <Card className="course-section-card">{title}</Card>
                <Card className="course-section-card">{title}</Card>
            </div>
        )
    }
}

export const CourseSection = withRouter(RouterlessCourseSection)
