import React, { PureComponent } from 'react'
import { DownButton } from '../common/downButton/DownButton'
import { Calendar } from '../calendar/Calendar'
import { HomeCard } from './HomeCard'
import { WOD } from './WOD'
import { RSSVideo } from '../rssVideo/RSSVideo'
import { IconButton, Snackbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import AnnouncementIcon from '@material-ui/icons/Announcement'
import PeopleIcon from '@material-ui/icons/People'
import ListIcon from '@material-ui/icons/ListAlt'
import BookIcon from '@material-ui/icons/Book'
import './styles.scss'

export class Home extends PureComponent {
    state = {
        open: false,
        innerWidth: null,
        innerHeight: null,
    }

    _onScroll = () => {
        const scrollTop =
                window.scrollY ||
                window.scrollTop ||
                document.getElementsByTagName('html')[0].scrollTop,
            image = document.querySelector('.main-img')

        image.style.backgroundPosition = `10vw calc(-2vh - ${scrollTop * 0.7}px)`
    }

    _onResize = () => {
        this.setState({
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
        })
    }

    _onDownButtonClick = () => {
        const { innerWidth, innerHeight } = this.state

        window.scrollTo({
            left: 0,
            top: innerHeight * (innerWidth > 768 ? 0.7 : 0.3),
            behavior: 'smooth',
        })
    }

    _open = () => this.setState({ open: true })

    _handleClose = () => this.setState({ open: false })

    componentDidMount() {
        this.setState({ innerWidth: window.innerWidth, innerHeight: window.innerHeight })
        window.addEventListener('scroll', this._onScroll)
        window.addEventListener('resize', this._onResize)
        this.props.getRSSWOD()
    }

    componentDidUpdate(prevProps) {
        const { updatingDb, updateDbFailed } = this.props

        if (prevProps.updatingDb && !updatingDb && !updateDbFailed) this._open()
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._onScroll)
        window.removeEventListener('resize', this._onResize)
    }

    render() {
        const {
                getRSSVideo,
                rssVideo,
                user,
                getDocsFromDb,
                updateDb,
                announcementsData,
                parentsData,
                otherData,
                rssWOD,
            } = this.props,
            { open, innerWidth } = this.state

        return (
            <div className="home">
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={this._handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Changes Saved!</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this._handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
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
                            <Calendar innerWidth={innerWidth} user={user} />
                            <RSSVideo getRSSVideo={getRSSVideo} rssVideo={rssVideo} />
                        </div>
                        <div className="column">
                            <HomeCard
                                user={user}
                                title="Announcements"
                                icon={<AnnouncementIcon className="icon" />}
                                data={announcementsData}
                                getDocsFromDb={getDocsFromDb}
                                updateDb={updateDb}
                                itemAvatar={<AnnouncementIcon />}
                            />
                            <HomeCard
                                user={user}
                                title="Parents"
                                icon={<PeopleIcon className="icon" />}
                                data={parentsData}
                                getDocsFromDb={getDocsFromDb}
                                updateDb={updateDb}
                                itemAvatar={<PeopleIcon />}
                            />
                            <HomeCard
                                user={user}
                                title="Other Stuff"
                                icon={<ListIcon className="icon" />}
                                data={otherData}
                                getDocsFromDb={getDocsFromDb}
                                updateDb={updateDb}
                                itemAvatar={<ListIcon />}
                            />
                            <WOD
                                title="Word of the Day"
                                icon={<BookIcon className="icon" />}
                                reverse
                                data={rssWOD}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
