import React from 'react'
import { CalendarChip } from './CalendarChip'
import { Tooltip } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'

export const CalendarTile = ({ user, assignmentCount, eventCount, miscCount, innerWidth }) => (
    <div className="tile">
        {
            innerWidth > 667 ?
                <div className="tile-icons">
                    {
                        assignmentCount > 0 &&
                        <CalendarChip title='Assignments' count={assignmentCount} />
                    }
                    {
                        eventCount > 0 &&
                        <CalendarChip title='Events' count={eventCount} />
                    }
                    {
                        miscCount > 0 &&
                        <CalendarChip title='Misc.' count={miscCount} />
                    }
                </div>
                :
                (assignmentCount > 0 || eventCount > 0 || miscCount > 0) &&
                <div>
                    <Tooltip title={'Click to view'} enterDelay={300} enterTouchDelay={300}>
                        <InfoIcon style={{ color: 'rgb(225, 59, 30)' }} />
                    </Tooltip>
                </div>
        }
        {user && <div></div>}
    </div>

)
