import React, { PureComponent } from 'react'
import { DownButton } from '../common/downButton/DownButton'
import Calendar from '../../containers/calendar/CalendarContainer'
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

    landingRef = React.createRef()

    _onResize = () => {
        this.setState({
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
        })
    }

    _onDownButtonClick = () => {
        const { height } = this.landingRef.current.getBoundingClientRect()

        document.querySelector('body').scrollTo({
            left: 0,
            top: height - 56,
            behavior: 'smooth',
        })
    }

    _showSnackbar = () => {
        this.setState({ open: true })

        setTimeout(() => {
            this._hideSnackbar()
        }, 3000)
    }

    _hideSnackbar = () => this.setState({ open: false })

    componentDidMount() {
        this.setState({
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
        })
        window.addEventListener('resize', this._onResize)
        this.props.getRSSWOD()
    }

    componentDidUpdate(prevProps) {
        const { updatingDb, updateDbFailed } = this.props

        if (prevProps.updatingDb && !updatingDb && !updateDbFailed) {
            this._showSnackbar()
        }
    }

    componentWillUnmount() {
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
                <div ref={this.landingRef} className="landing">
                    <div className="title">
                        <h1 className="header-1">Ms. Jinkens</h1>
                        <h1 className="header-2">AP World History</h1>
                    </div>
                </div>
                <div className="home-content">
                    <div className="down-button">
                        <DownButton onClick={this._onDownButtonClick} />
                    </div>
                    <div className="lower-container">
                        <div>
                            <Calendar innerWidth={innerWidth} />
                        </div>
                        <RSSVideo
                            getRSSVideo={getRSSVideo}
                            rssVideo={rssVideo}
                        />

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
                            title="Week in Review"
                            icon={<ListIcon className="icon" />}
                            data={otherData}
                            getDocsFromDb={getDocsFromDb}
                            updateDb={updateDb}
                            itemAvatar={<ListIcon />}
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
                        <WOD
                            title="Word of the Day"
                            icon={<BookIcon className="icon" />}
                            reverse
                            data={rssWOD}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
