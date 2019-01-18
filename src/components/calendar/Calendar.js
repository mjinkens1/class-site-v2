import React, { PureComponent } from 'react'
import CalendarComponent from 'react-calendar'
import { CalendarTile } from './CalendarTile'
import { Typography } from '@material-ui/core'
import { ChevronLeft, ChevronRight, FirstPage, LastPage } from '@material-ui/icons'
import './styles.scss'

export class Calendar extends PureComponent {
    state = {
        currentMonth: null,
        calendarValue: null
    }

    _onClickDay = value => {
    }

    _navigationLabel = ({ label }) => <Typography variant='h6' align='center' style={{ color: 'rgb(225, 59, 30)' }}>{label}</Typography>

    _tileContent = ({ date }) => {
        const { innerWidth } = this.props

        return <CalendarTile date={date.getTime().toString()} innerWidth={innerWidth} />
    }

    componentDidMount() {
        const currentMonth = new Date().toString().split(' ').slice(1, 4).reduce((acc, val, index) => {
            return acc + (index === 1 ? '' : val)
        }, '').toLowerCase()

        this.setState({
            currentMonth,
            calendarValue: new Date()
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
                value={calendarValue}
            />
        )
    }
}
