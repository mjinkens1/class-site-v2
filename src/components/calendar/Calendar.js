import React, { PureComponent } from 'react'
import CalendarComponent from 'react-calendar'
import { CalendarTile } from './CalendarTile'
import { Typography } from '@material-ui/core'
import { ChevronLeft, ChevronRight, FirstPage, LastPage } from '@material-ui/icons'
import { getMonthAndYearFromDate, getDayMonthYearFromDate } from '../../util'
import './styles.scss'

export class Calendar extends PureComponent {
    state = {
        currentMonth: null,
        calendarValue: null,
    }

    _onActiveDateChange = ({ activeStartDate }) =>
        console.log(getMonthAndYearFromDate(activeStartDate))

    _onClickDay = date => {
        console.log(getDayMonthYearFromDate(date))
    }

    _navigationLabel = ({ label }) => (
        <Typography variant="h6" align="center" style={{ color: 'rgb(102, 153, 255)' }}>
            {label}
        </Typography>
    )

    _tileContent = ({ date }) => {
        const { innerWidth, user } = this.props

        return <CalendarTile date={date.getTime().toString()} innerWidth={innerWidth} user={user} />
    }

    componentDidMount() {
        const currentMonth = getMonthAndYearFromDate(new Date())

        this.setState({
            currentMonth,
            calendarValue: new Date(),
        })
    }

    render() {
        const { calendarValue } = this.state
        return (
            <CalendarComponent
                className="calendar"
                minDetail="month"
                navigationLabel={this._navigationLabel}
                nextLabel={<ChevronRight />}
                next2Label={<LastPage />}
                prevLabel={<ChevronLeft />}
                prev2Label={<FirstPage />}
                tileContent={this._tileContent}
                onClickDay={this._onClickDay}
                onActiveDateChange={this._onActiveDateChange}
                value={calendarValue}
            />
        )
    }
}
