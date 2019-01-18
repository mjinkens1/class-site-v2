import React from 'react'
import { Tooltip } from '@material-ui/core'


export const CalendarChip = ({ count, title }) => (
    <Tooltip title={title + ' - Click to view'} placement='bottom-end' enterDelay={300}>
        <div className='calendar__chip'>
            <div className='calendar__chip__title'>
                {title}
            </div>
            <div className='calendar__chip__count'>
                <div className='calendar__chip__count--center-text'>
                    {count || 5}
                </div>
            </div>
        </div>
    </Tooltip>
)

