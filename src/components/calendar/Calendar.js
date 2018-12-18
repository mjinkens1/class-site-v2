import React, { PureComponent } from 'react'
import CalendarComponent from 'react-calendar'
import { CalendarTile } from './CalendarTile'
import './styles.scss'

export class Calendar extends PureComponent {
    _onClickDay = value => {
        console.log(value)
    }

    render() {
        return (
            <div className="calendar-container">
                <div />
                <CalendarComponent
                    className="calendar"
                    minDetail="month"
                    showFixedNumberOfWeeks={true}
                    // navigationLabel={() => null}
                    tileContent={<CalendarTile />}
                    onClickDay={this._onClickDay}
                />
            </div>
        )
    }
}
