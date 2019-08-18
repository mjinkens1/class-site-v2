import React, { useEffect, useState } from 'react'
import { CalendarChip } from './CalendarChip'
import { IconButton, Tooltip } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Create'
import { TileEditor } from './TileEditor'
import { toKebabCase } from '../../util'

export const CalendarTile = ({
    calendarData,
    date,
    dateCollection,
    getDocsFromDb,
    innerWidth,
    updateDb,
    user,
}) => {
    const [showEditor, setShowEditor] = useState(false)
    const [tileItems, setTileItems] = useState([])

    const dateString = date
        .toString()
        .split(' ')
        .slice(0, 4)
        .join(' ')

    useEffect(() => {
        const data = calendarData && calendarData[toKebabCase(dateString)]

        if (data) {
            setTileItems(data)
        }
    }, [calendarData])

    return (
        <div className="tile">
            {user && (
                <div className="calendar__tile__edit">
                    <div>
                        <Tooltip title="Edit">
                            <IconButton
                                onClick={() => setShowEditor(true)}
                                style={{ transform: 'scale(0.8)' }}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            )}
            {tileItems &&
                tileItems.map(({ text }) => (
                    <div key={text} className="tile-icons">
                        <CalendarChip title={text} />
                    </div>
                ))}
            <TileEditor
                collection={dateCollection}
                date={date}
                updateDb={updateDb}
                visible={showEditor}
                setShowEditor={setShowEditor}
                setTileItems={setTileItems}
                tileItems={tileItems}
            />
        </div>
    )
}
