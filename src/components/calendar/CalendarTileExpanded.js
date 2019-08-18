import React from 'react'
import {
    IconButton,
    ListItemText,
    Tooltip,
    Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { CalendarChip } from './CalendarChip'
import { Card } from '../common/card/Card'

export const CalendarTileExpanded = ({
    dateString,
    tileItems,
    setShowExpanded,
    showExpanded,
}) => {
    return showExpanded ? (
        <div className="tile-expanded">
            <div className="calendar-editor-close--expand">
                <Tooltip title="Close">
                    <IconButton onClick={() => setShowExpanded(false)}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </div>
            <Card className="calendar-tile-editor--expand">
                <div className="tile-editor-date">
                    <ListItemText primary={dateString} />
                </div>
                <div className="edit-calendar-chips">
                    {tileItems && tileItems.length > 0 ? (
                        tileItems.map(({ id, text }) => (
                            <CalendarChip large key={text} title={text} />
                        ))
                    ) : (
                        <Typography
                            variant="h6"
                            align="center"
                            style={{ color: 'rgb(102, 153, 255)' }}
                        >
                            No Items
                        </Typography>
                    )}
                </div>
            </Card>
        </div>
    ) : null
}
