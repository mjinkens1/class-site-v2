import React, { PureComponent } from 'react'
import CalendarComponent from 'react-calendar'
import { CalendarTile } from './CalendarTile'
import { CalendarTileExpanded } from './CalendarTileExpanded'
import { Typography } from '@material-ui/core'
import {
    ChevronLeft,
    ChevronRight,
    FirstPage,
    LastPage,
} from '@material-ui/icons'
import { db } from '../../config/firebase'
import { toKebabCase } from '../../util'
import './styles.scss'

const TileContent = ({ calendarData, date, selectedTile, updateDb, user }) => {
    const dateComponents = date.toString().split(' ')
    const dateCollection = toKebabCase(
        `${dateComponents[1]} ${dateComponents[3]}`
    )

    return (
        <CalendarTile
            calendarData={calendarData}
            date={date}
            dateCollection={dateCollection}
            selectedTile={selectedTile}
            updateDb={updateDb}
            user={user}
        />
    )
}

export class Calendar extends PureComponent {
    state = {
        dateString: '',
        tileItems: [],
        selectedTile: null,
        showExpanded: false,
        currentMonth: null,
        calendarValue: null,
    }

    _onClickDay = date => {
        const dateString = date
            .toString()
            .split(' ')
            .slice(0, 4)
            .join(' ')

        this.setState({
            dateString,
            selectedTile: dateString,
            tileItems: this.props.calendarData[toKebabCase(dateString)],
            showExpanded: true,
        })
    }

    _navigationLabel = ({ label }) => (
        <Typography
            variant="h6"
            align="center"
            style={{ color: 'rgb(102, 153, 255)' }}
        >
            {label}
        </Typography>
    )

    _showExpanded = show => {
        if (show) {
            this.setState({ showExpanded: show })
        } else {
            this.setState({ showExpanded: show, tileItems: [], dateString: '' })
        }
    }

    componentDidMount() {
        const calendarRef = db.collection('data').doc('calendar')

        this.props.getDocsFromDb(calendarRef, 'calendar-data', false)
    }

    render() {
        const { calendarData, updateDb, user } = this.props
        const {
            calendarValue,
            dateString,
            tileItems,
            selectedTile,
            showExpanded,
        } = this.state

        return (
            <div className="calendar-wrapper">
                <div
                    className="calendar-editor-portal"
                    id="calendar-editor-portal"
                />
                <div
                    className="calendar-tile-expand-portal"
                    id="calendar-tile-expand-portal"
                >
                    <CalendarTileExpanded
                        dateString={dateString}
                        tileItems={tileItems}
                        showExpanded={showExpanded}
                        setShowExpanded={this._showExpanded}
                    />
                </div>
                <CalendarComponent
                    className="calendar"
                    minDetail="month"
                    navigationLabel={this._navigationLabel}
                    nextLabel={<ChevronRight />}
                    next2Label={<LastPage />}
                    prevLabel={<ChevronLeft />}
                    prev2Label={<FirstPage />}
                    tileContent={({ date }) => (
                        <TileContent
                            calendarData={calendarData}
                            date={date}
                            selectedTile={selectedTile}
                            updateDb={updateDb}
                            user={user}
                        />
                    )}
                    onClickDay={this._onClickDay}
                    value={calendarValue}
                />
            </div>
        )
    }
}
