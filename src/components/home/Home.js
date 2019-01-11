import React, { PureComponent } from 'react'
import { DownButton } from '../common/downButton/DownButton'
import { Calendar } from '../calendar/Calendar'
import { HomeCard } from './HomeCard'
import { Wod } from './Wod'
import { RSSVideo } from '../rssVideo/RSSVideo'
import AnnouncementIcon from '@material-ui/icons/Announcement'
import PeopleIcon from '@material-ui/icons/People'
import ListIcon from '@material-ui/icons/ListAlt'
import BookIcon from '@material-ui/icons/Book'
import './styles.scss'

export class Home extends PureComponent {
    _onScroll = () => {
        const scrollTop =
                window.scrollY ||
                window.scrollTop ||
                document.getElementsByTagName('html')[0].scrollTop,
            image = document.querySelector('.main-img')

        image.style.backgroundPosition = `35vw calc(-25vh - ${scrollTop *
            0.7}px)`
    }

    _onResize = () => {
        this.setState({
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
        })
    }

    _onDownButtonClick = () =>
        window.scrollTo({
            left: 0,
            top: this.state.innerHeight * 0.7,
            behavior: 'smooth',
        })

    componentDidMount() {
        this.setState({ innerHeight: window.innerHeight })
        window.addEventListener('scroll', this._onScroll)
        window.addEventListener('resize', this._onResize)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._onScroll)
        window.removeEventListener('resize', this._onResize)
    }

    render() {
        const { wodData, getRSSVideo, rssVideo } = this.props

        return (
            <div id="home" style={{ overflowX: 'hidden' }}>
                <div className="landing">
                    <div className="title-wrapper">
                        <div className="title">
                            <h1 className="header-1">Ms. Jinkens</h1>
                            <h1 className="header-2">AP World History</h1>
                        </div>
                    </div>
                    <div className="main-img-wrapper">
                        <div className="main-img-bg-color">
                            <div className="main-img" />
                        </div>
                    </div>
                </div>
                <div className="home-content">
                    <div className="down-button">
                        <DownButton onClick={this._onDownButtonClick} />
                    </div>
                    <div className="lower-container">
                        <div className="column">
                            <Calendar />
                            <RSSVideo
                                getRSSVideo={getRSSVideo}
                                rssVideo={rssVideo}
                            />
                        </div>
                        <div className="column">
                            <HomeCard
                                title="Announcements"
                                icon={<AnnouncementIcon className="icon" />}
                            />
                            <HomeCard
                                title="Parents"
                                icon={<PeopleIcon className="icon" />}
                            />
                            <HomeCard
                                title="Other Stuff"
                                icon={<ListIcon className="icon" />}
                            />
                            <Wod
                                title="Word of the Day"
                                icon={<BookIcon className="icon" />}
                                data={wodData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
