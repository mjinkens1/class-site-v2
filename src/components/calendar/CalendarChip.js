import React from 'react'
import { Tooltip } from '@material-ui/core'

export const CalendarChip = ({ count, large, selectedForDelete, title }) => {
    return (
        <Tooltip title={title} placement="bottom-end" enterDelay={300}>
            <div
                className={`calendar__chip${large ? '--large' : ''}`}
                style={{ opacity: selectedForDelete ? 0.5 : 1 }}
            >
                <div className="calendar__chip__title">{title}</div>
            </div>
        </Tooltip>
    )
}
