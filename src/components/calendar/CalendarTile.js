import React from 'react'
import AssignmentIcon from '@material-ui/icons/Assignment'
import EventIcon from '@material-ui/icons/Event'
import InfoIcon from '@material-ui/icons/Info'

export const CalendarTile = ({ assignment, plannedEvent, misc }) => (
    <div className="tile">
        <div className="tile-icons">
            {assignment && <AssignmentIcon />}
            {plannedEvent && <EventIcon />}
            {misc && <InfoIcon />}
        </div>
    </div>
)
